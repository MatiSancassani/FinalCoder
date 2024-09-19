# Final Project
![Logo - Copy](https://github.com/user-attachments/assets/c04e81db-75f3-46c7-aa90-bd3965562674)

**Descripción:**
Este proyecto es una aplicación web ecommerse

**Contenido:**
* Modelo por capas MVC
* Manejo de handlePolices, verifyAutentications, dto, ValidateJWT
* Diccionario de errores
* Variables de entorno en archivo .env
* Carpeta utils, con multer, validaciones y verificaciones para productos
* Login y registro de usuarios
* Opcion para entrar con cuenta de GitHub
* Manejo de JWT y cookies a la hora de loguear
* Recuperacion de contraseña por via email
* CRUD compeleto logica y vistas PRODUCTS leer, editar, eliminar
* CRUD compeleto logica y vistas CART leer, editar, eliminar
* Al ingresar se verian los productos cargados por diferentes usuarios
* Posibilidad de agregar al carrito si el producto no me pertenece
* Si me pertenece eliminamos el boton ADD TO CART y agregamos un modal de Edit y Delete
* Si un producto es eliminado y pertence a un user Premium es notificado por via email la eliminacion
* El edit puede cambiar el nombre, description, price, stock, category
* Cada usuario dispone de su carrito por ID, si agregamos un producto este se agrega al carrito y 
cambia el numero de carrito.
* En el carrito nos mostrara los productos agregados y se puede agregar o disminuir la cantidad con los simbolos +/-
* Cambia el precio al aumentar o bajar la cantidad, tanto el el producto como en el precio total de carrito.
* Se puede eliminar el producto a traves de un boton delete, tambien podemos vaciar el carrito y finalizar compra.
* Al finalizar la compra este emite un ticket que sera guardado en nuestra DB
* En el menu contacto se maneja Socket.io con chat en tiempo real.
* En profile, tenemos un dropdown que contiene:
Add product, este agregar un producto y carga su imagen dentro de public/uploads/products
Users: Muestra todos los usuarios registrados y su rol, que solo el admin puede cambiar el mismo y tambien eliminar usuario
Setting: Muestra el profile del usuario logueado, name, lastName, email, rol y permite la carga de documentos, 
si la carga es > 3, su usuario pasara a ser premium y podra empezar a cargar productos en nuestra web
La imagenes se guardaran en public/uploads/documents
* Los usuarios que pasen inactivos > 30minutos son eliminados y notificados via email
* El boton salir, destruye la session borra el token, cookies y datos del localStorage

***TEST:**
* Test unitario sobre hasheo de passwords
* Test de integracion para registro, logueo y no registrar usuarios con mismo email
* Winston, creacion personalizada de informes
* Swagger, documentacion sobre endpoint Carts, Products y Users
