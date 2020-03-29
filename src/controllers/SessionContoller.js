const connection = require('../database/connection')

module.exports = {
    async login(req, res) {
        try {

            const { id } = req.body
            const ong = await connection('ongs')
                                    .where("id", id)
                                    .select('name')
                                    .first()
            if(!ong) return res.status(400).json({ statusCode: 400, result: "ong não cadastrada" })
            return res.json({ statusCode: 200, result: ong })

        } catch (error) {
            console.log("error-->", error)
            return res.json({ statusCode: 200, error: error })
        }
    },
 
}