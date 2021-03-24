# prueba-bsale
ejercicio de prueba para optar a puesto de desarrollador en Bsale Chile.

el ejercicio consta de una app emulando una tienda de licores y derivados dada una base de datos(bdd) con información sobre sus productos y categorías.

*servidor desarrollado con node js y su framework express js
*app cliente desarrollada con html y vanilla javascript, se utilizó bootstrap v4.5 para estilos y orden básicos en la visual de la aplicación
*el codigo cuenta con comentarios respectivos al uso de cada función, metodo, etc
*deploy fue realizado por separado, para el entorno de producción de la api rest fue utilizado heroku y como hosting de la web se utilizó firebase


*** WEBAPP LADO CLIENTE ***
Ésta cuenta basicamente con la vista de productos obtenidos desde la api rest, una barra de navegación que contiene un button group con las categorías para refinar 
la búsqueda y un formulario correspondiente al buscador solicitado, el cual está implementado a nivel de servidor y retorna solo los productos que contengan en alguna 
sección de su nombre el texto ingresado 


** la app cliente puede ser vista de manera publica en el siguiente enlace  https://appclientebsaletest.web.app



*** API REST ***
La api cuenta con tres endpoints principales para la entrega de la informacion obtenida desde la bdd entregada por bsale.

- https://bsale-test-app.herokuapp.com/productos   => Éste endpoint retorna un archivo JSON con la informacion completa de todos los productos disponibles en la bdd 

- https://bsale-test-app.herokuapp.com/categorias  => Éste endpoint retorna un archijo JSON que corresponde a las categorías por las cuales se ordenan los productos disponibles

- https://bsale-test-app.herokuapp.com/buscador/:texto  => Éste endpoint responde a la barra de búsqueda implementada, recibe un dato desde la app cliente y lo incluye como 
parámetro en la query utilizada para obtener una cantidad de productos acotada desde la bdd. Ej: ../buscador/pisco retorna sólo los productos que contienen la palabra "pisco"
en su nombre.

** el funcionamiento de la api rest puede ser revisada de manera pública en cualquiera de las url's antes mencionadas.
