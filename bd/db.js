/*** creacion de la conexion a base de datos, especificamente con mysql ***/
const mysql = require('mysql')
//se crea una conexion del tipo pool, con limite de 10 conexiones a la vez
const pool = mysql.createPool({
    connectionLimit: 10,
    host:'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user:'bsale_test',
    password:'bsale_test',
    database:'bsale_test'
})
//comprobación de que la conexion fue exitosa, de lo contrario se manifiesta el error en la consola
pool.getConnection((error, conn)=>{
    if(error){
        throw error
        console.log('error en bd  ', error)
    }else{
        console.log('bdd conectada!!')
        conn.release()
    }
})
//exportamos el pool de conexiones para ser utilizado en archivo de rutas
module.exports = pool