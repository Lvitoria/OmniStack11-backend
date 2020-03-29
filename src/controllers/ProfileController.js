const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        try {

            const ong_id = req.headers.authorization
            const incident = await connection('incidents').where("ong_id", ong_id).select('*')

            return res.json({ statusCode: 200, result: incident, count: incident.length })

        } catch (error) {
            console.log("error-->", error)
            return res.json({ statusCode: 200, error: error })
        }
    },
 
}