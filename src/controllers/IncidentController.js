const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        try {
            const { page = 1 } = req.query
            const [count] = await connection('incidents').count()

            const incidents = await connection('incidents')
                                    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                                    .limit(5)
                                    .offset((page - 1) * 5)
                                    .select([
                                        'incidents.*', 
                                        'ongs.name as name', 
                                        'ongs.email', 
                                        'ongs.whatsapp', 
                                        'ongs.city', 
                                        'ongs.uf'
                                    ])

            res.header('X-Total-Count', count['count(*)'])
            return res.json({ statusCode: 200, mensagem: incidents })

        } catch (error) {
            console.log("error-->", error)
            return res.json({ statusCode: 200, error: error })
        }
    },
    async create(req, res) {
        try {
            const { title, description, value } = req.body
            const ong_id = req.headers.authorization

            const [id] = await connection('incidents').insert({
                title,
                description,
                value,
                ong_id
            })
            return res.json({ statusCode: 201, result: "criado com sucesso", id })

        } catch (error) {
            console.log("error-->", error)
            return res.json({ statusCode: 500, falha: "falha ao inserir" })
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params
            const ong_id = req.headers.authorization
            const incident = await connection('incidents').where("id", id).select('ong_id').first()

            if (incident == undefined) return res.status(401).json({ statusCode: 400, error: `não possui esse id--> ${id}` })

            if (incident.ong_id != ong_id) {
                return res.status(401).json({ statusCode: 401, error: "id da ong diferente" })
            } else {
                await connection('incidents').where("id", id).delete()
                return res.status(204).json({ statusCode: 204 })
            }

        } catch (error) {
            console.log("error-->", error)
            return res.json({ statusCode: 500, error: error })
        }
    }
}