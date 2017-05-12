# Instalación

### 1. Clonamos el proyecto
$ `git clone https://github.com/waquispe/base-backend-express`

### 2. Ingresamos al directorio
$ `cd base-express`

### 3. Instalamos las dependencias
$ `npm install`

### 4. Ejecutamos las pruebas unitarias
Antes, debemos crear la base de datos y configurar los archivos:
-  `config.json`
-  `config.js`

Ahora si, ejecutamos las pruebas.

$ `npm test`

### 5. Crea valores por defecto en la base de datos development.
$ `npm run setup`

### 6. Crea el apidoc.
$ `npm run apidoc`

### 7. Ejecutamos el servidor
$ `npm start`

Eso es todo, el servidor estará corriendo en: http://localhost:8000/

# Comandos Básicos de Sequelize-cli

### Inicia el modulo sequelize-cli
$ `sequelize init`

### Crea un modelo alumno con un atributo nombre
$ `sequelize model:create --name alumno --attributes nombre:string`

### Crea un seeder alumno
$ `sequelize seed:create --name alumno`

### Crea todas las tablas
$ `sequelize db:migrate`

### Elimina todas las tablas
$ `sequelize db:migrate:undo:all`

### Crea todos los recursos
$ `sequelize db:seed:all`

### Elimina todos los recursos
$ `sequelize db:seed:undo:all`
