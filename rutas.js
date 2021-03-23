const express = require('express')
const enrutador = express.Router()

//llamada a la conexion de la base de datos
const conexion = require('./bd/db')

/* * * INFORMACION DE INICIO * * */
/*prepara la info que usa la app en su página inicial*/

enrutador.get('/', (req, res)=>{
    res.send('aqui comienza la api rest')
})

//recupera lista de productos a desplegar
enrutador.get('/productos', (req, res)=>{
    conexion.getConnection((error, conn)=>{
       conn.query('SELECT * FROM product', (error, productos)=>{
           if(error){
               throw error 
           }else{
               res.json(productos)
               conn.release()
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
    let text = '%'+req.params.texto+'%' 
    const consulta = 'SELECT * FROM product WHERE product.name like ?'
    
    conexion.getConnection((error, conn)=>{
        conn.query(consulta, text, (error, results)=>{
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

