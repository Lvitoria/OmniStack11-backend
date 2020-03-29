const router = require('express').Router()
const ongsController = require('./controllers/OngsController')
const incidentController = require('./controllers/IncidentController')
const profileController = require('./controllers/ProfileController')
const sessionContoller = require('./controllers/SessionContoller')

//teste
router.get('/', (req, res) => {
    console.log("hello wordl")
})

//login
router.post('/session', sessionContoller.login)

//ongs
router.get('/ongs', ongsController.index)
router.post('/ongs', ongsController.create)

//incident
router.get('/incident', incidentController.index)
router.post('/incident', incidentController.create)
router.delete('/incident/:id', incidentController.delete)

//bustar todas os incident de cada ong
router.get('/profile', profileController.index)

module.exports = router