
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || '9000'

app.use(cors())
app.use('/', require('./rutas'))

//aviso de servidor corriendo
app.listen(port, ()=>{
    console.log('server running on port', port)
})
