//https://bsale-test-app.herokuapp.com/
/*** LLAMADAS A API PARA DATOS A DESPLEGAR ***/
//aquí encapsulamos a la API fetch de JS en una función que podemos llamar cuando la necesitemos más adelante
const productosCall = () => fetch('https://bsale-test-app.herokuapp.com/productos').then(res => {//llamammos a la API fetch
  if (res.ok) {         //evaluamos que el resultado sea exitoso y retornamos la respuesta en formato JSON
    return res.json()
  }
  throw new Error(res)// en caso contrario despliega el error que causa el fallo
})
.catch(console.err)//capturamos el error para que la aplicación no deje de funcionar sino que solo avise que ocurrió un error

const categoriasCall = () => fetch('https://bsale-test-app.herokuapp.com/categorias').then(res => {
  if (res.ok) {
    return res.json()
  }
  throw new Error(res)
})
.catch(console.err)


/* * * toma valores de categorias y las posiciona como menu en un button group * * */
const catg = document.querySelector('#listacategorias')//seleccionamos el espacio en la hoja html

let categorias = categoriasCall()//solicitamos los nombres de categorías mediante llamada con fetch

//al recibir como respuesta una promesa, con datos en formato JSON, trabajamos sobre el array obtenido para desplegar las categorías en un button group
categorias.then(data => {
    catg.innerHTML = '<div class="btn-group" role="group">' + data.map((e)=>{//el uso de array.map nos permite generar un button con cada elemento del array obtenido
        return '<button type="button" class="btn btn-secondary" id="'+e.name+'" onclick="buscarCatg('+e.id+')">'+ e.name + '</button>'
    }).join('') + '</div>'//el uso de join nos ayuda para juntar todos los elementos que nos devuelve map en una sola respuesta separada por ''
})
.catch((error)=>{//capturamos un posible error y los mostramos por consola
    console.log(error)
})

/* * * toma valores de productos y los depliega como productos añadibles al carrito de compra * * */
//al igual que  en la función anterior, pero con los productos contenidos en la BDD

const contprod = document.querySelector('#contprod')

const productos = productosCall()

productos.then(data =>{
    contprod.innerHTML = '<div class="container"><div class="row">'+data.map((e)=>{
        return  '<div class="card col-3" style="width: 18rem;"><img src="'+ e.url_image +'" class="card-img-top"><div class="card-body"><h5 class="card-title">'+e.name+'</h5><p class="card-text"> $'+(e.price - ((e.price/100)*e.discount))+'</p><a onclick="addCarrito()" class="btn btn-primary">Añadir al Carrito</a></div></div>'
    }).join('')+'</div></div>'
})
.catch((error)=>{
    console.log(error)
})


/* * * metodo para filtrar por categoria * * */

function buscarCatg(idCat){
     productos.then(data =>{
         //usamos la propiedad array.filter para obtener solo los elementos que buscamos mostrar en pantalla, basasdos en su id de categoría
         let filtrados = data.filter((e)=> e.category == idCat) 
         contprod.innerHTML = '<div class="container"><div class="row">'+filtrados.map((e)=>{
            return  '<div class="card col-3" style="width: 18rem;"><img src="'+ e.url_image +'" class="card-img-top"><div class="card-body"><h5 class="card-title">'+e.name+'</h5><p class="card-text"> $'+(e.price - ((e.price/100)*e.discount))+'</p><a onclick="addCarrito()" class="btn btn-primary">Añadir al Carrito</a></div></div>'
        }).join('')+'</div></div>'
     })
}

/* * * buscador implementado a nivel de servidor * * */
function buscador(){

    if(document.querySelector('#barrabuscador').value == ''){//evitamos una llamada vacía en su texto
        alert('ingresa algo que buscar')
    }else{
        //preparamos la url para usar fetch y obtener sólo los resultados esperados(quienes tienen en su nombre la variable ingresada en la barra de búsqueda)
        let urlBuscador = 'https://bsale-test-app.herokuapp.com/buscador/'+document.querySelector('#barrabuscador').value
        console.log(urlBuscador)//solo para asegurarse que la url va bien escrita
        fetch(urlBuscador)//uso regular de fetch con la url ya preparada y con promesas como respuesta
        .then(res => res.json())
        .then(data => {
            contprod.innerHTML = '<div class="container"><div class="row">'+data.map((e)=>{
                return  '<div class="card col-3" style="width: 18rem;"><img src="'+ e.url_image +'" class="card-img-top"><div class="card-body"><h5 class="card-title">'+e.name+'</h5><p class="card-text"> $'+(e.price - ((e.price/100)*e.discount))+'</p><a onclick="addCarrito()" class="btn btn-primary">Añadir al Carrito</a></div></div>'
            }).join('')+'</div></div>'
        })
       
    }


}




  
