# Documentar API
- [x] Configurar Swagger
- [] Documentar Módulo de producto
- [] Documentar Módulo de carrito



# Pendientes
- [x] Reestructura Arquitectura de Capas
- [] Controllers
    - [x] Business
    - [x] Carts
    - [x] Orders
    - [] Products
    - [] Users
    - [] Opcional
        - [] Messages/chat

- [] Modelos
    - [x] Business
    - [x] Carts
    - [x] Orders
    - [x] Products
    - [x] Users
    - [] Opcional
        - [] Messages/chat

- [] Routes
    - [] Business
    - [] Carts
    - [] Orders
    - [] Products
    - [] Users
    - [] Opcional
        - [] Messages/chat


- [] Pensar cómo cambiar funciones y responsabilidades de los componentes.
- [] Resumir funciones y métodos en cartController. Ver si no hace falta crear una carpeta que se llame dao.
- [] Ver si la lógica aplicada en routes no se puede trasladar a un controller.
- [] Crear middleware para session y auth (Login, register, Admin, User)
- [] Pasar todas las carpetas del back a src.




# Segunda Práctica Integradora
- [] Integrar el endpoint que crea carts con la creación del usuario y con la actualización de  
- [x] Integrar botones de productos con carrito
- [x] Crear la interacción entre el cart y el navbar
- [] El path global tanto para registrarse normal como con github debiera ser el mismo
- [] Agregar al router /api/sessions/ la ruta /current, la cual utilizará el modelo de sesión que estés utilizando, para poder devolver en una respuesta el usuario actual.
- [] Para otras entregas, pensar cómo usar el ruteo avanzado. Clase 18/07

- [x] Que redirija al login cuando uno ingresa a la url, osea si pongo localhost:8080/ o  /products etc. que redirija siempre que uno no está logueado, podría incluir un endpoin "*" para redirigir al home si no encuentra alguna página o incluir un código 404.
- [x] Al registrarse también debería redirigir al login
- [x] No hay logout 


- [x] Modelo User con: 
    - first_name:String,
    - last_name:String,
    - email:String (único)
    - age:Number,
    - password:String(Hash)
    - cart:Id con referencia a Carts
    - role:String(default:’user’)

- [x] Modificar formulario de registro.
- [x] Agregar Cart al Navbar
- [x] Estrategia Passport para este modelo de usuario.
- [x] Definir si el sistema de login trabaja con Session o con JWT
    - [x] Si es JWT: desarrollar una estrategia “current” para extraer la cookie que contiene el token para obtener el usuario asociado a dicho token, en caso de tener el token, devolver al usuario asociado al token, caso contrario devolver un error de passport, utilizar un extractor de cookie.



## Pendiente Desafios y Entregas

### Ecommerce

#### Views
- [x] Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:
- [] Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
- [] Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.
- [] Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 


#### Endpoint Products
##### /GET
Medificar el método /GET para recibir por query params:
- [x] Limit de 10 productos
- [x] Page para devolver la página que queremos buscar 
- [x] Sort asc/desc por precio o no recibir nada
- [x] Query: búsqueda específica, filtro a aplicar
- [] Poder buscar productos por categoría o disponibilidad.
Métodod /GET debe devolver un objeto con el siguiente formato:
{
	status:success/error
    payload: Resultado de los productos solicitados
    totalPages: Total de páginas
    prevPage: Página anterior
    nextPage: Página siguiente
    page: Página actual
    hasPrevPage: Indicador para saber si la página previa existe
    hasNextPage: Indicador para saber si la página siguiente existe.
    prevLink: Link directo a la página previa (null si hasPrevPage=false)
    nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}



#### Endpoints Carts

- [] Vista de Cart en handlebars

##### /GET
- [] Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.

##### /PUT
- [] PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
- [] PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body

##### /DELETE
- [] DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
- [] DELETE api/carts/:cid deberá eliminar todos los productos del carrito.
