const express = require('express')
const app = express()
const cors = require('cors')
const port = 3030
app.use(cors({
    //quando vai pra prode
    // origin: "a rota vai aqui "
}))
app.use(express.json())
app.use(require('./routes'))

app.listen(port, () => console.log(`server rodando na porta: ${port}  ....`))