# Ejercicio: Jugando con Contenedores - Módulo 1

## Objetivo de la práctica

El objetivo de esta práctica es aprender a gestionar contenedores Docker mediante la creación, modificación y manipulación de un contenedor NGINX.

## Pasos a seguir

Sigue los siguientes pasos para completar el ejercicio:

1. **Limpiar cualquier recurso previo**
   El primer paso es limpiar los recursos previos (contenedores, imágenes, volúmenes y redes) que puedan estar ocupando espacio en tu sistema. Para ello, utiliza los siguientes comandos:
    <details>
    <summary>Ver comandos para limpiar recursos</summary>
    
    ```bash
        docker container prune
        docker image prune
        docker volume prune
        docker network prune
    ```
    
    </details>
2. **Crear un contenedor NGINX**
   Crea un contenedor NGINX que sirva contenido web en un puerto aleatorio. Usa el siguiente comando para hacerlo:
    <details>
    <summary>Ver comando para crear el contenedor</summary>
    
    ```bash
        docker run -d --name nginx-practica -P nginx
    ```
    
    </details>
3. **Acceder al contenedor y modificar el archivo `index.html`**
   Una vez que el contenedor esté en ejecución, accede al contenedor y edita el archivo `index.html` para modificar el contenido, como los elementos `<h1>` o `<p>`. Puedes hacerlo con los siguientes comandos:

    <details>
    <summary>Ver comandos para acceder y modificar el archivo</summary>
    
    ```bash
        docker exec -it nginx-practica /bin/bash
        cd /usr/share/nginx/html
        nano index.html
    ```

    </details>

   > [!NOTE]
   > Si `nano` no está instalado, puedes usar el siguiente comando para instalarlo:

   ```bash
   apt update
   apt install nano
   ```

4. **Copiar el contenido de la carpeta HTML al sistema host**
   Una vez que hayas realizado los cambios, copia el contenido del directorio HTML del contenedor a tu máquina host con el siguiente comando:

    <details>
    <summary>Ver comando para copiar el contenido</summary>

   ```bash
   docker cp nginx-practica:/usr/share/nginx/html .
   ```

    </details>

5. **Crear un nuevo contenedor NGINX utilizando la carpeta copiada**
   Finalmente, crea un nuevo contenedor NGINX, pero esta vez monta la carpeta copiada anteriormente como su contenido web:

    <details>
     <summary>Ver comando para crear el contenedor con la carpeta copiada</summary>

   ```bash
   docker run --name nginx-practica -v $(pwd):/usr/share/nginx/html -P nginx
   ```

    </details>

   > [!IMPORTANT]  
   > Si estás utilizando PowerShell en Windows, el comando `pwd` no funcionará como en sistemas basados en Unix. En PowerShell, debes usar `${PWD}` para obtener la ruta del directorio actual.

   > [!TIP]  
   >  También puedes usar una ruta relativa o absoluta en lugar de pwd para especificar la ubicación de la carpeta que deseas montar en el contenedor. Por ejemplo:

   ```bash
   docker run --name nginx-practica -v /ruta/a/mi/carpeta:/usr/share/nginx/html -P nginx
   ```

   ó

   ```bash
   cd /ruta/a/mi/carpeta
   docker run --name nginx-practica -v .:/usr/share/nginx/html -P nginx
   ```

   Si editas los archivos de la carpeta en tu máquina local (donde se montó el volumen), los cambios se reflejarán automáticamente dentro del contenedor. Esto es porque el volumen que se montó entre el contenedor y tu máquina local está sincronizado. Puedes editar los archivos como lo harías normalmente en tu máquina, y al recargar el navegador, verás los cambios reflejados dentro del contenedor NGINX.

   ```bash
   cd /ruta/a/mi/carpeta
   notepad index.html
   ```

## Recursos adicionales

Si tienes alguna pregunta o necesitas más información sobre cómo trabajar con contenedores en Docker, consulta la [documentación oficial de Docker](https://docs.docker.com/get-started/).
