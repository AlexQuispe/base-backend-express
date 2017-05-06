# Instalación

### 1. Clonamos el proyecto
$ `git clone https://github.com/waquispe/base-backend-express`

### 2. Entramos en el directorio del proyecto
$ `cd base-express`

### 3. Instalamos las dependencias
$ `npm install`

### 4. Desplegamos la aplicación
$ `npm start`

Ahora podemos ver la aplicación ejecutándose sobre http://localhost:8000/

# Comandos Sequelize

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


# Ejemplos de consultas con Sequelize-handlers

### Ejemplo de una peticion GET
- `GET /alumnos`
- `GET /alumnos/1`
- `GET /alumnos?offset=5&limit=25`
- `GET /alumnos?fields=id_alumno,nombre`
- `GET /alumnos?type=new,existing`
- `GET /alumnos?sort=id_alumno,-nombre`

### Referencias:
- sequelize-handlers  https://github.com/botter-workshop/sequelize-handlers
