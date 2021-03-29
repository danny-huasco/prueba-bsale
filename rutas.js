const express = require('express')
const enrutador = express.Router()//manejamos los verbos de rest con un enrutador para facilitar la vista y la escritura del código

//llamada a la conexion de la base de datos
const conexion = require('./bd/db')

/* * * INFORMACION DE INICIO * * */
/*prepara la info que usa la app en su página inicial*/

enrutador.get('/', (req, res)=>{
    res.send('aqui comienza la api rest')//mensaje de prueba
})

/*** ejemplo de funcionamiento al usar un verbo REST ***/

//recupera lista de productos a desplegar en la página
enrutador.get('/productos', (req, res)=>{ //usamos el enrutador para gestionar una petición, definiendo la ruta y llamando a una arrow function
    conexion.getConnection((error, conn)=>{ //utilizamos una conexion desde el pool definido en archivo de conexión de BDD
       conn.query('SELECT * FROM product', (error, productos)=>{//definimos la query/consulta que se envía hacia la base de datos
           if(error){                   //avisamos en caso de error
               throw error 
           }else{
               res.json(productos)      //en caso exitoso retornamos los resultados en formato JSON
               conn.release()           //liberamos la conexión a BDD para no saturar al servidor que la aloja
           }
       })
    })
    
})

//recupera lista de categorias para filtrar
enrutador.get('/categorias', (req, res)=>{
    conexion.getConnection((error, conn)=>{
        conn.query('SELECT * FROM category', (error, categorias)=>{
            if(error){
                throw error
            }else{
                res.json(categorias)
                conn.release()
            }
        })
    })
    
})

/* * * BUSCADOR * * */
//toma la variable de texto que ingresa el usuario y la usa para generar la consulta a la bdd
enrutador.get('/buscador/:texto', (req, res)=>{
    let text = '%'+req.params.texto+'%' //crea un texto en base a la variable reciida para ingresarla como parte de una query
    const consulta = 'SELECT * FROM product WHERE name like ?'//query escogida para la consulta a BDD
    
    conexion.getConnection((error, conn)=>{
        conn.query(consulta, text, (error, results)=>{//ingresamos consulta y variable dentro de la llamada a BDD
            if(error){
                throw error
            }else{
                res.json(results)
                conn.release()
            }
        })
    })
})

module.exports = enrutador;

