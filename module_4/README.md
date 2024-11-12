# Ejercicio 1: Crear una Imagen Docker para el Entorno de Desarrollo de una Aplicación NestJS

Crear una imagen Docker para la aplicación NestJS con el entorno de desarrollo configurado.

## Paso 1: Crear el archivo `Dockerfile`

1. Crear un archivo `Dockerfile` en la raíz de tu proyecto.

2. Usar `node:20` como imagen base.

3. Establecer un directorio de trabajo (`/usr/local/app`).

4. Copiar fichero de dependencias (`package.json`).

5. Definir variables (USE_MEMORY_DB, DATABASE_URI, PORT) y configurar puerto (3000).

6. Instalar las dependencias (`npm install --legacy-peer-deps`).

7. Copiar el contenido.

8. Ejecutar el comando (`npm run start:dev`).

---

## Paso 2: Generar la Imagen

1. Genera la imagen con un nombre.

2. Inicia un contenedor con la imagen creada. (Comprobar que funciona y es accesible).

3. Inicia otro contenedor con un bind mount del `src`. (Comprobar que las modificaciones realizadas actualizan el backend, `main.ts` modificar textos del config).
