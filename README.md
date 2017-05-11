# Base backend express

Proyecto base para crear servicios web con Express (Framework de NodeJS).

### Tecnologías Utilizadas:
- Express v4.15

### Requerimientos mínimos:
- Node v6.9.1
- Npm v4.1.2

### Códigos de respuesta:

- `200` **Ok**. La petición se ha completado con éxito.
- `201` **Created**. La petición se ha completado con éxito y como resultado ha creado un recurso.
- `204` **No Content**. La petición se ha completado con éxito pero su respuesta no tiene ningún contenido.
- `400` **Bad Request**. El servidor no es capaz de entender la petición porque su sintaxis no es correcta.
- `401` **Unauthorized**. El recurso solicitado requiere de autenticación.
- `403` **Forbidden**. El servidor no puede responder con el recurso solicitado porque se ha denegado el acceso.
- `404` **Not Found**. El servidor no puede encontrar el recurso solicitado.
- `500` **Internal Server Error**. Se ha producido un error interno.

### Métodos HTTP aceptados:

| Método   | Descripción                            |
|----------|----------------------------------------|
| `GET`    | Obtiene un recurso o lista de recursos |
| `POST`   | Crea un recurso                        |
| `PUT`    | Actualiza un recurso                   |
| `DELETE` | Elimina un recurso                     |

### Opciones de consulta válidas (Solo para el método GET):

| Opción    | Descripción                                     | Valor por defecto |
|-----------|-------------------------------------------------|-------------------|
| `fields`  | Nombres de los atributos devueltos.             | `<todos>`         |
| `offset`  | Posición inicial.                               | `0`               |
| `limit`   | Nro. Máximo de recursos devueltos.              | `50`              |
| `sort`    | Ordena el resultado (`field+asc`, `field+desc`) | `<ninguno>`       |
| `<field>` | Consulta simple (field=valor)                   | `<ninguno>`       |


# Base de datos:

- `Alumno`
  * `id_alumno` **PK**
  * `nombre`
  * `email`
  * `telefono`
  * `_fecha_creacion`
  * `_fecha_modificacion`


- `Materia`
  * `id_materia` **PK**
  * `nombre`
  * `sigla`
  * `_fecha_creacion`
  * `_fecha_modificacion`


- `Inscripcion`
  * `id_inscripcion` **PK**
  * `fecha_inscripcion`
  * `id_estudiante` **_FK_**
  * `id_materia` **_FK_**
  * `_fecha_creacion`
  * `_fecha_modificacion`


# Ejemplos de consultas:

#### Devuelve una lista de todos los alumnos.
GET `/alumnos`

#### Devuelve al alumno con id = 4
GET `/alumnos/4`

#### Devuelve el nombre del alumno con id = 4
GET `/alumnos/4?fields=nombre`

#### Devuelve una lista de todos los alumnos (nombre y email).
GET `/alumnos/4?fields=nombre,email`

#### Devuelve una lista de todos los alumnos (Desde la posición 4 de la lista, máximo 5 alumnos)
GET `/alumnos?offset=4&limit=5`

#### Devuelve una lista de todos los alumnos ordenados por nombre de forma descendente.
GET `/alumnos?sort=nombre+desc`

#### Devuelve una lista de todos los alumnos cuyo nombre sea lucy.
GET `/alumnos?nombre=lucy`

# Instalación

Para instalar el proyecto ver el archivo
[INSTALL.md](https://github.com/waquispe/base-backend-express/blob/master/INSTALL.md).

# Referencias:

- Los códigos de estado de HTTP http://librosweb.es/tutorial/los-codigos-de-estado-de-http/
- Express http://expressjs.com/es/
- Express application generator https://expressjs.com/en/starter/generator.html
- Using Passport With Sequelize and MySQL https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537
