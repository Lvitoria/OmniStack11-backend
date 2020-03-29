const connection = require('../database/connection')
const crypto = require('crypto')
module.exports = {
    async create(req, res) {
        try {
    
            const { name, email, whatsapp, city, uf } = req.body
            const id = crypto.randomBytes(4).toString('HEX')
    
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            })
    
            return res.json({ statusCode: 201, result: "criado com sucesso", "seu id": id })
    
        } catch (error) {
            console.log("error-->", error)
            return res.json({ statusCode: 500, falha: "falha ao inserir" })
        }
    },
    async index(req, res){
        try {
    
            const ongs = await connection('ongs').select('*')
            return res.json({ statusCode: 200, mensagem: ongs, count: ongs.length })
    
        } catch (error) {
            console.log("error-->", error)
            return res.json({ statusCode: 200, error: error })
        }
    }
}