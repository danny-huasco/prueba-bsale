
const express = require('express')
const cors = require('cors')
const app = express()//iniciamos express como framework para servidor
const port = process.env.PORT || '9000'//definimos el puerto de funcionamiento

app.use(cors())//permite que las consultas provengan desde cualquier lugar, es como saltarse una regla de seguridad 
app.use('/', require('./rutas'))//usamos el archivo de rutas para el funcionamiento general de los verbos REST

//aviso de servidor corriendo
app.listen(port, ()=>{
    console.log('server running on port', port)
})
