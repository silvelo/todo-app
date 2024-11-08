# Ejercicio: Conectar aplicaciones utilizando una red en Docker

## Parte 1

### Enunciado:

Tienes dos imágenes Docker disponibles en Docker Hub:

- `silvelo/todo-backend`
- `silvelo/todo-client`

El objetivo de este ejercicio es desplegar ambos contenedores y configurarlos para que se comuniquen entre sí utilizando una red personalizada en Docker.

### Pasos:

1. Crea una red personalizada llamada `todo-network` que permita la comunicación entre los contenedores.
2. Inicia un contenedor basado en la imagen `silvelo/todo-backend` y conéctalo a la red `todo-network`.
3. Asegúrate de exponer el puerto `3000` para el backend.

## Parte 2

### Pasos:

4. Inicia un contenedor basado en la imagen `silvelo/todo-client` y conéctalo también a la red `todo-network`.
5. Asegúrate de que la aplicación frontend pueda acceder al backend a través del nombre del servicio (`todo-backend`) en lugar de una dirección IP.

### Resultado esperado:

- El backend (`silvelo/todo-backend`) debería estar accesible en la red bajo el nombre `todo-backend`.
- El frontend (`silvelo/todo-client`) debería poder comunicarse con el backend usando la URL `http://todo-backend:3000`.

## Parte 3

### Extensión del ejercicio:

Vamos a añadir una base de datos MongoDB y configurar la red para que los servicios tengan permisos específicos.

### Pasos:

1. Añade un contenedor basado en la imagen oficial de `mongo`.
2. El backend debe poder conectarse tanto al cliente como a MongoDB.
3. El cliente solo puede conectarse al backend, pero no directamente a MongoDB.
4. MongoDB solo debe ser accesible desde el backend.
