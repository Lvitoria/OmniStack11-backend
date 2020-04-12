const express = require('express')
const expressListEndpoints = require('express-list-endpoints')
const routes = require('./routes')
const cors = require('cors')
const app = express()
app.use(cors({}))
const port = 3030
// app.use(cors({
//     //quando vai pra prode
//     // origin: "a rota vai aqui "
// }))
app.use(express.json())
app.use(routes)
console.log(expressListEndpoints(app))
app.listen(port, () => console.log(`server rodando na porta: ${port}  ....`))