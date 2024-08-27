# Descreipción

## Correr en dev

1. Clonar el repositiorio
2. Crear una copia de .env.example y renombrarla a ````.env```` y cambiar las variables de entorno
3. Instalar dependencias ```npm install```
4. Levantar la base de datos con docker ```docker-compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
7. Limpiar el localStorage del navegador
8. Correr el proyecto ```npm run dev```


## Correr en prod
