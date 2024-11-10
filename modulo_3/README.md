# Ejercicio: Conectar aplicaciones utilizando una red en Docker

## Parte 1

### Enunciado:

Tienes dos imágenes Docker disponibles en Docker Hub:

- `silvelo/todo-backend`
- `silvelo/todo-client`

El objetivo de este ejercicio es desplegar ambos contenedores y configurarlos para que se comuniquen entre sí utilizando una red personalizada en Docker.

### Pasos:

1.  Crea una red personalizada llamada `todo-network` que permita la comunicación entre los contenedores.
    <details>
    <summary>Ver comandos</summary>

    ```bash
        docker network create todo-network
    ```

    </details>

2.  Inicia un contenedor basado en la imagen `silvelo/todo-backend` y añádelo a la red `todo-network`(Asegúrate de exponer el puerto `3000` para el backend)
    <details>
    <summary>Ver comandos</summary>

    ```bash
        # Cualquiera de los siguiente comandos
        docker run -d -p 3000:3000 --network todo-network silvelo/todo-backend
        docker run -d -p 3000:3000 --network todo-network --hostname backend_host --name todo-backend  silvelo/todo-backend
        # Exponer el puerto , añadirla al todo-network, ponerle nombre al host y nombre al contenedor
    ```

    </details>

    <details>
    <summary>Ver comandos</summary>

    ```bash
        # Alternativa
        docker run -d -p 3000:3000 --hostname backend_host --name todo-backend  silvelo/todo-backend
        # Exponer el puerto , añadirla al todo-network, ponerle nombre al host y nombre al contenedor
        # Gestionamos la redes para añadir la creada y eliminar la defecto
        docker network connect todo-network todo-backend
        docker network disconnect bridge todo-backend
    ```

    </details>

    <details>

    <summary>Ver comandos</summary>

    ```bash
        # Ver la ip asignada y los nombres
        docker inspect todo-backend
    ```

    ```
    ...
     "Networks": {
        "todo-network": {
            ....
            "Gateway": "172.18.0.1",
            "IPAddress": "172.18.0.2",
            "DNSNames": [
                "todo-backend",
                "652cd92cd632",
                "backend_host"
            ]
        }
    }
    ```

    </details>

3.  Inicia un contenedor basado en la imagen `silvelo/todo-client` y conéctalo también a la red `todo-network`.

    <details>
    <summary>Ver comandos</summary>

    ```bash
        # Descargar y editar el fichero de nginx: backend_host, todo-backend, 172.18.0.2 ó 652cd92cd632
        location /api/ {
            proxy_pass http://backend_host:3000;  # URL de tu servidor backend
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

    ```

    </details>

    <details>
    <summary>Ver comandos</summary>

    ```bash
        # Alternativa
        docker run -d -p 8080:80 -v .\nginx\nginx.conf:/etc/nginx/nginx.conf --hostname client_host  --name todo-client --network todo-network silvelo/todo-client
        # Exponer el puerto , añadirla al todo-network, ponerle nombre al host y nombre al contenedor.
        # Comando -v monta el el fichero .\nginx\nginx.conf en el contenedor, en la ruta /etc/nginx/nginx.conf. Es necesario asegurarse que el fichero  .\nginx\nginx.conf existe y la ruta es correcta (Usar rutas relativas o absolutas)
    ```

    </details>

4.  Asegúrate de que la aplicación frontend pueda acceder al backend a través del nombre del servicio (`todo-backend`) en lugar de una dirección IP.

- Acceder [URL SERVER - https//:localhost:3000/api](https//:localhost:3000/api)

![Backend Swagger](/img/backend.png)

- Acceder [URL CLIENT - https//:localhost:8080](https//:localhost:8080)

![Frontend](/img/frontend.png)

- Crear una nueva nota

![Create Note](/img/create_note.png)

- Ver las notas creadas

![Note List](/img/note_list.png)

## Parte 2

### Extensión del ejercicio:

Vamos a añadir una base de datos MongoDB y configurar la red para que solo sea accesible por el backend.

![Infraestructura final](/img/esquema_modulo_3.png)

### Pasos:

1.  Crear un nueva red backend.

<details>
<summary>Ver comandos</summary>

```bash
docker network create todo-backend
```

</details>

2.  Añade un contenedor basado en la imagen oficial de `mongo`.

<details>
<summary>Ver comandos</summary>

```bash
    docker run -it -d -p 27017:27017 --network todo-backend --name mongo --hostname mongo_host mongo
    #Exponer el puerto

```

</details>

3.  El backend debe poder conectarse tanto al cliente como a MongoDB.

<details>
<summary>Ver comandos</summary>

```bash
    # Paramos y borramos el actual para configurar el nuevo
    docker rm -f todo-backend
    # Configuramos el nuevo con la variable de entorno
    docker run -d -p 3000:3000 --hostname backend_host -e USE_MEMORY_DB=false --name todo-backend  --network todo-backend silvelo/todo-backend
    # El contenedor después de un tiempo fallará porque no encuentra mongo en la default URL
    docker rm -f todo-backend
    docker run -d -p 3000:3000 --hostname backend_host -e USE_MEMORY_DB=false -e DATABASE_URI=mongodb://mongo_host:27017/notes --name todo-backend  --network todo-backend silvelo/todo-backend
    # Añadimos la otra red (todo-network) al container (todo-backend)
    docker network connect todo-network todo-backend
    # Comprobamos que están la redes asignadas
    docker inspect todo-backend
```

```
"Networks": {
                "todo-backend": {
                    ....
                    "IPAddress": "172.19.0.3",
                    "DNSNames": [
                        "todo-backend",
                        "eed95a645151",
                        "backend_host"
                    ]
                },
                "todo-network": {
                    ...
                    "IPAddress": "172.18.0.2",
                    "DNSNames": [
                        "todo-backend",
                        "eed95a645151",
                        "backend_host"
                    ]
                }
            }
```

</details>

### Comprobar

1. Descargar mongo [Compass](https://www.mongodb.com/try/download/compass)

2. Conectarse a mongo (configuración por defecto)
   ![Infraestructura final](/img/mongo_compass.png)

3. Añadir notas desde el [cliente](http://localhost:8080)
4. Comprobamos la base de datos que existe ``notes` y su contenido
   ![Infraestructura final](/img/database_add.png)


# Ejercicio 1: Persistencia de Datos con Volúmenes

Partiendo del ejercicio de redes donde se conectan las aplicaciones `todo-backend` y `todo-client`, realiza lo siguiente:

1. Crea un volumen nombrado para almacenar la base de datos de MongoDB y añade dicho volume al contenedor.

2. Inserta algunas entradas de ejemplo en la base de datos de MongoDB a través del backend.
3. Elimina el contenedor de MongoDB.

4. Crea un nuevo contenedor de MongoDB usando el mismo volumen nombrado.

5. Verifica que los datos insertados anteriormente siguen estando presentes en la base de datos.

# Ejercicio 2: Persistencia de Datos con Volúmenes

Partiendo del ejercicio anterior:

1. Haz una copia del volumen en un directorio local.

2. Creamos una nueva máquina de mongo con un volume de tipo bind.

3. Verificamos que ambas base de datos tengas los mismo datos.

# Ejercicio 3: Persistencia de Datos con Volúmenes

1. Crea una nueva instancia de mongo con un volume anónimo e inspecciona la información de los volumenes.

2. Inserta algunas entradas de ejemplo en la base de datos de MongoDB.

3. Detén y borra el contenedor.

4. Recupera los datos del volume e intenta montarlos en otro contenedor.
