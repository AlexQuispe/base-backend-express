# API REST Académico

### Base de datos:

- Alumno
  * id_alumno **PK**
  * nombre
  * email
  * telefono


- Materia
  * id_materia **PK**
  * nombre
  * sigla


- Inscripcion
  * id_inscripcion **PK**
  * fecha_inscripcion
  * id_estudiante **_FK_**
  * id_materia **_FK_**

### Códigos de respuesta:

  - `200` **Ok**. La petición del navegador se ha completado con éxito.
  - `204` **No Content**. La petición se ha completado con éxito pero su respuesta no tiene ningún contenido.
  - `206` **Partial Content**. La respuesta se ha completado con éxito y ha devuelto parte del contenido.
  - `400` **Bad Request**. El servidor no es capaz de entender la petición del navegador porque su sintaxis no es correcta.
  - `401` **Unauthorized**. El recurso solicitado por el navegador requiere de autenticación.
  - `404` **Not Found**. El servidor no puede encontrar el recurso solicitado por el navegador.
  - `405` **Method Not Allowed**. El navegador ha utilizado un método (GET, POST, etc.) no permitido por el servidor para obtener ese recurso.
  - `412` **Precondition Failed**. El servidor no es capaz de cumplir con algunas de las condiciones impuestas por el navegador en su petición.
  - `422` **Unprocessable Entity**. La petición del navegador tiene el formato correcto, pero sus contenidos tienen algún error semántico que impide al servidor responder.
  - `500` **Internal Server Error**. Se ha producido un error interno.

### Métodos HTTP aceptados:

| Método   | Descripción                            |
|----------|----------------------------------------|
| `GET`    | Obtiene un recurso o lista de recursos |
| `POST`   | Crea un recurso                        |
| `PUT`    | Actualiza un recurso                   |
| `DELETE` | Elimina un recurso                     |

### Ejemplo endpoints Alumno
- `/alumnos [GET, POST]`
- `/alumnos/:id [GET, PUT, DELETE]`

### Obtener TODOS Alumno [GET]
  SOLICITUD [GET] /alumnos

  RESPUESTA code: 200 status: Ok
  ```json
  [
    {
      "id_alumno": 4,
      "nombre": "Juan",
      "email": "juan@gmail.com",
      "telefono": 11111111,
      "_fecha_creacion": "2017-05-06T06:44:51.000Z",
      "_fecha_modificacion": "2017-05-06T06:44:51.000Z"
    },
    {
      "id_alumno": 5,
      "nombre": "rosa",
      "email": "rosa@gmail.com",
      "telefono": 22222222,
      "_fecha_creacion": "2017-05-06T06:44:51.000Z",
      "_fecha_modificacion": "2017-05-06T06:44:51.000Z"
    },
    {
      "id_alumno": 6,
      "nombre": "ana",
      "email": "ana@gmail.com",
      "telefono": 33333333,
      "_fecha_creacion": "2017-05-06T06:44:51.000Z",
      "_fecha_modificacion": "2017-05-06T06:44:51.000Z"
    }
  ]
  ```

  ### Obtener Alumno [GET]
  SOLICITUD [GET] /alumnos/1

  RESPUESTA code: 200 status: Ok
  ```json
  {
    "id_alumno": 5,
    "nombre": "rosa",
    "email": "rosa@gmail.com",
    "telefono": 22222222,
    "_fecha_creacion": "2017-05-06T06:44:51.000Z",
    "_fecha_modificacion": "2017-05-06T06:44:51.000Z"
  }
  ```

### Crear Alumno [POST]
SOLICITUD [POST] /alumnos
```json
{
  "nombre": "lucy",
  "email": "lucy@gmail.com",
  "telefono": 77777777
}
```

RESPUESTA code: 201 status: Created
```json
{
  "id_alumno": 7,
  "nombre": "lucy",
  "email": "lucy@gmail.com",
  "telefono": 77777777,
  "_fecha_modificacion": "2017-05-06T06:36:22.000Z",
  "_fecha_creacion": "2017-05-06T06:36:22.000Z"
}
```

### Actualizar Alumno [PUT]
Solicitud [PUT] /alumnos/6
```json
{
  "nombre": "Ana María",
  "email": "anita@gmail.com"
}
```

RESPUESTA code: 200 status: Ok
```json
{
  "id_alumno": 6,
  "nombre": "Ana María",
  "email": "anita@gmail.com",
  "telefono": 33333333,
  "_fecha_creacion": "2017-05-06T06:44:51.000Z",
  "_fecha_modificacion": "2017-05-06T06:38:41.000Z"
}
```

### Eliminar Alumno [DELETE]
SOLICITUD [DELETE] /alumnos/5

RESPUESTA code: 204 status: No Content

### Mensajes de error

RESPUESTA code: 404 status: Not Found

RESPUESTA code: 500 status: Internal Server Error
