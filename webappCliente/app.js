//https://bsale-test-app.herokuapp.com/
/*** LLAMADAS A API PARA DATOS A DESPLEGAR ***/
const productosCall = () => fetch('https://bsale-test-app.herokuapp.com/productos').then(res => {
  if (res.ok) {
    return res.json()
  }
  throw new Error(res)
})
.catch(console.err)

const categoriasCall = () => fetch('https://bsale-test-app.herokuapp.com/categorias').then(res => {
  if (res.ok) {
    return res.json()
  }
  throw new Error(res)
})
.catch(console.err)


/* * * toma valores de categorias y las posiciona como menu en un button group * * */
const catg = document.querySelector('#listacategorias')

let categorias = categoriasCall()

categorias.then(data => {
    catg.innerHTML = '<div class="btn-group" role="group">' + data.map((e)=>{
        return '<button type="button" class="btn btn-secondary" id="'+e.name+'" onclick="buscarCatg('+e.id+')">'+ e.name + '</button>'
    }).join('') + '</div>'
})
.catch((error)=>{
    console.log(error)
})

/* * * toma valores de productos y los depliega como productos añadibles al carrito de compra * * */
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
         let filtrados = data.filter((e)=> e.category == idCat) 
         contprod.innerHTML = '<div class="container"><div class="row">'+filtrados.map((e)=>{
            return  '<div class="card col-3" style="width: 18rem;"><img src="'+ e.url_image +'" class="card-img-top"><div class="card-body"><h5 class="card-title">'+e.name+'</h5><p class="card-text"> $'+(e.price - ((e.price/100)*e.discount))+'</p><a onclick="addCarrito()" class="btn btn-primary">Añadir al Carrito</a></div></div>'
        }).join('')+'</div></div>'
     })
}

/* * * buscador implementado a nivel de servidor * * */
function buscador(){

    if(document.querySelector('#barrabuscador').value == ''){
        alert('ingresa algo que buscar')
    }else{
        let urlBuscador = 'https://bsale-test-app.herokuapp.com/buscador/'+document.querySelector('#barrabuscador').value
        console.log(urlBuscador)
        fetch(urlBuscador)
        .then(res => res.json())
        .then(data => {
            contprod.innerHTML = '<div class="container"><div class="row">'+data.map((e)=>{
                return  '<div class="card col-3" style="width: 18rem;"><img src="'+ e.url_image +'" class="card-img-top"><div class="card-body"><h5 class="card-title">'+e.name+'</h5><p class="card-text"> $'+(e.price - ((e.price/100)*e.discount))+'</p><a onclick="addCarrito()" class="btn btn-primary">Añadir al Carrito</a></div></div>'
            }).join('')+'</div></div>'
        })
       
    }


}




  
