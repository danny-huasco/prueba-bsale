//https://bsale-test-app.herokuapp.com/

fetch('https://bsale-test-app.herokuapp.com/categorias', {mode: 'no-cors'})
  .then(res => res.json())
  .then(data => console.log(data))

  
