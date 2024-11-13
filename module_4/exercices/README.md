# Ejercicio 1: Crear una Imagen Docker para el Entorno de Desarrollo de una Aplicación NestJS

Crear una imagen Docker para la aplicación NestJS con el entorno de desarrollo configurado.

## Paso 1: Crear el archivo `Dockerfile`

1. Crear un archivo `Dockerfile` en la raíz de tu proyecto.

2. Usar `node:20` como imagen base.
   <details>
   <summary>Ver comandos</summary>

   ```yaml
   FROM node:20
   ```

   </details>

3. Establecer un directorio de trabajo (`/usr/local/app`).
   <details>
   <summary>Ver comandos</summary>

   ```yaml
   WORKDIR /usr/local/app
   ```

   </details>

4. Copiar fichero de dependencias (`package.json`).
   <details>
   <summary>Ver comandos</summary>

   ```yaml
   COPY package*.json .
   ```

   </details>

5. Definir variables (USE_MEMORY_DB, DATABASE_URI, PORT) y configurar puerto (3000).
   <details>
   <summary>Ver comandos</summary>

   ```yaml
   ENV USE_MEMORY_DB=true \
   DATABASE_URI=mongodb://localhost:27017/notes \
   PORT=3000

   EXPOSE 3000
   ```

   </details>

6. Instalar las dependencias (`npm install --legacy-peer-deps`).
   <details>
   <summary>Ver comandos</summary>

   ```yaml
   RUN npm install --legacy-peer-deps
   ```

   </details>

7. Copiar el contenido.
   <details>
   <summary>Ver comandos</summary>

   ```yaml
   COPY . .
   ```

   </details>

8. Ejecutar el comando (`npm run start:dev`).
   <details>
   <summary>Ver comandos</summary>

   ```yaml
   CMD [ "npm", "run", "start:dev" ]
   ```

   </details>

---

## Paso 2: Generar la Imagen

1. Genera la imagen con un nombre.
   <details>
   <summary>Ver comandos</summary>

   ```yaml
   FROM node:20 as base
   WORKDIR /usr/local/app
   COPY package*.json .
   ENV USE_MEMORY_DB=true \
   DATABASE_URI=mongodb://localhost:27017/notes \
   PORT=3000

   EXPOSE 3000
   RUN npm install --legacy-peer-deps
   COPY . .
   CMD [ "npm", "run", "start:dev" ]
   ```

   ```bash
   docker build -t backend_ex -f Dockerfile_ex .
   ```

   </details>

2. Inicia un contenedor con la imagen creada. (Comprobar que funciona y es accesible).
   <details>
   <summary>Ver comandos</summary>
   ```bash
   docker run -it -p 4000:3000 -d backend_ex   
   ```

   </details>

3. Inicia otro contenedor con un bind mount del `src`. (Comprobar que las modificaciones realizadas actualizan el backend, `main.ts` modificar textos del config).

   <details>
   <summary>Ver comandos</summary>

   ```bash
    docker run -it -p 5000:3000 -v .\src:/usr/local/app/src  backend_ex
   ```

   </details>

# Ejercicio 2: Crear un imagen de producción.

Crear una imagen Docker para la aplicación NestJS.

## Paso 1: Crear el archivo `Dockerfile`

1. Crear un archivo `Dockerfile` en la raíz de tu proyecto.

2. Usar `node:20` como imagen base.

3. Establecer un directorio de trabajo (`/usr/local/app`).

4. Copiar fichero de dependencias (`package.json`).

5. Definir variables (USE_MEMORY_DB, DATABASE_URI, PORT) y configurar puerto (3000).

6. Instalar las dependencias (`npm install --legacy-peer-deps`).

7. Copiar el contenido.

8. Compilar la aplicación (`npm run build`).

9. Ejecutar el comando (`node dist/main.js`).

10. Genera la imagen con un nombre.

```yaml
FROM node:20
WORKDIR /usr/local/app
COPY package*.json .
ENV USE_MEMORY_DB=true \
DATABASE_URI=mongodb://localhost:27017/notes \
PORT=3000

EXPOSE 3000
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]
```

```bash
docker build -t backend_ex_2 -f Dockerfile_ex .
```

   </details>

11. Comprobar que funciona.

## Paso 2: Optimizar la imagen

Partiendo del fichero anterior eliminar los recursos que no sean necesarios, para generar una segunda imagen.

1. Copiar los archivos necesarios, código compilado (`dist`) y dependencias (`node_modules`)

<details>
<summary>Ver comandos</summary>

```yaml
FROM node:20 as base
WORKDIR /usr/local/app
COPY package*.json .

RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:20-alpine
ENV USE_MEMORY_DB=true \
DATABASE_URI=mongodb://localhost:27017/notes \
PORT=3000
EXPOSE 3000

COPY --from=base /usr/local/app/dist ./dist
COPY --from=base /usr/local/app/node_modules ./node_modules

CMD ["node", "dist/main.js"]
```

```bash
docker build -t backend_ex_3 -f Dockerfile_ex .
```

   </details>

2. Genera la imagen con un nombre.

3. Comprobar que funciona.

4. Verificar las dos imágenes.
   ![Image Size](/img/create_image_weight.png)
