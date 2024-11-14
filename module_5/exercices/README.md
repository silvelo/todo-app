# Ejercicio 1: Crear un Docker Compose para las Aplicaciones Backend y Frontend

## Objetivo

En este ejercicio, deberás crear un archivo `docker-compose.yml` para levantar tanto la aplicación de **Backend** como la de **Frontend**. La aplicación de **Backend** utilizará una base de datos en memoria.

## Paso 1: Crear el fichero `compose.yaml`

1. Configuración básica del compose:

```yaml
version:
services:
networks:
volumes:
```

2. **Backend**:

   - Configurar el servicio.

   ```yaml
   services:
     backend:
   ```

   - Configurar el servicio para que use una base de datos en memoria.

   ```yaml
   services:
     backend:
       container_name:
       hostname:
       image:
       environments:
       ports:
       networks:
   ```

3. **Frontend**:

   - Configurar el servicio.

   ```yaml
   services:
     frontend:
   ```

   - Configurar el servicio para que use una base de datos en memoria.

   ```yaml
   services:
     frontend:
       container_name:
       hostname:
       image:
       environments:
       ports:
       networks:
   ```

4. **Docker Compose**:

   - El archivo `docker-compose.yml` debe orquestar ambos servicios (Backend y Frontend).
   - Asegúrate de que ambos contenedores estén en la misma red de Docker para que puedan comunicarse entre sí.

   ```yaml
   version:

   services:
     frontend:
     container_name:
     hostname:
     image:
     environments:
     ports:
     networks:
   backend:
     container_name:
     hostname:
     image:
     environments:
     ports:
     networks:
     services:
   networks:
   volumes:
   ```

# Ejercicio 2: Usar una base datos

## Objetivo

En este ejercicio, deberás editar el archivo `docker-compose.yml` para levantar tanto la aplicación de **Backend** como la de **Frontend**, la **Base de datos** y una **interfaz** para la Base de datos **(mongo-express)**.

![Compose Infra](/resources/images/compose_schema.png)

## Paso 1: Editar el fichero `compose.yaml`

1. **Mongo**:

   - Configurar la base de datos para que use un volumen nombrado.

   ```yaml
   services:
   database:
     container_name:
     hostname:
     image:
     environments:
     ports:
     networks:
   ```

2. **Mongo Express**:

   - Añadir un nuevo servicio que nos permita consultar la Base de Datos desde una interfaz web.

   ```yaml
   services:
   web-database:
     container_name:
     hostname:
     image:
     environments:
     ports:
     networks:
   ```

# Ejercicio 3: ¿Y la seguridad?

## Objetivo

En este ejercicio, deberás editar el archivo `docker-compose.yml` para securizar la base de datos y las conexiones.

1. **Mongo**

   - Añadir usuario y contraseña a la base de datos para evitar entrar sin una autenticación.

   ```bash
    MONGO_INITDB_ROOT_USERNAME
    MONGO_INITDB_ROOT_PASSWORD
   ```

2. **Backend**

   - Configurar el backend para acceder pero con autenticación. Formato de la url de mongo es: `mongodb://<user>:<password>@<host>:<port>/<db>?authSource=admin`

3. **Mongo Express**
   - Configurar la interfaz de mongo para acceder pero con autenticación. Formato de la url de mongo es: `mongodb://<user>:<password>@<host>:<port>`

# Ejercicio 4: Más seguridad

## Objetivo

En este ejercicio, deberás editar el archivo `docker-compose.yml` para permitir solo conexiones a la interfaz mongo desde el host:

1. **Mongo Express**

- Acceso restringido al host:

```yaml
ports:
  - 127.0.0.1:8081:8081
```

- Acceso restringido a la red local:

```yaml
ports:
  - <ip_host>:8081:8081
```

- Sin restricción:

```yaml
ports:
  - 8081:8081
```
