## Alternativa para crear imágenes personalizadas

1. Partimos de una imagen base y accedemos a ella.

```bash
docker run -it ubuntu /bin/bash
```

2. Hacemos las configuraciones necesarias, en este caso:
   - Actualizamos los repositorios
   - Instalamos curl
   - Ejecutamos el script de de node.
   - Instalamos node.
   - Comprobamos que tenemos node y npm instalados.

```bash
apt update
apt install curl
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
node --version
npm --version
```

3. Salimos de la máquina y guardamos los cambios generando una nueva image. Con `docker commit` podemos guardar el estado actual de un contenedor **(snapshot)** y darle un nombre, al igual que se hace con `docker build -t`

```bash
docker container commit 69af49731cea node_20_custom
```

4. Si creamos un nuevo contenedor con esta image, podremos comprobar que contiene los cambios realizados.

```bash
docker run -it node_20_custom
```

```bash
node --version
npm --version
```

5. Si en esta máquina queremos instalar más dependencias, en este caso java 17, repetiríamos el mismo paso anterior.
   - Actualizamos los repositorios (Ya no sería necesario, puesto que lo hemos hecho anteriormente)
   - Ejecutamos la instalación de java
   - Comprobamos que tenemos java instalado.

```bash
apt install openjdk-17-jdk openjdk-17-jre
java --version
```

6. Ahora podríamos guardar los cambios en una nueva imagen y comprobar que esta nueva imagen contiene los paquetes instalados.

```bash
docker container commit 69af49731cea node_20_java_17_custom
docker run -it node_20_java_17_custom
```

```bash

java --version
node --version
```

7. Podríamos seguir este proceso para continuar instalando dependencias y librerías necesarias hasta tener nuestra máquina preparada para producción. En este punto podríamos hacer limpieza de ficheros temporales, recursos... para intentar reducir el peso final de la imagen.

[Java Example](https://github.com/bitnami/containers/tree/main/bitnami/java/17/debian-12)

[Node Example](https://github.com/nodejs/docker-node/tree/9d04fec54bd5f51abe840d7af0c70787b6b32de6/20)
