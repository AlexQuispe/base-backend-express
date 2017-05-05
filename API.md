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
| `PATCH`  | Actualiza una parte de un recurso      |
| `DELETE` | Elimina un recurso                     |

### Ejemplo endpoints Alumno
- `/alumnos [GET, POST]`
- `/alumnos/:id [GET, PUT, PATCH, DELETE]`

### Obtener TODOS Alumno [GET]
  Solicitud [GET] /alumnos

  Respuesta
  ```json
  {
    "status": "OK",
    "code": 200,
    "data": [
      {
        "id_alumno": 1,
        "nombre": "Juan",
        "email": "juan@gmail.com",
        "telefono": 123456
      }
    ]
  }
  ```

  ### Obtener Alumno [GET]
  Solicitud [GET] /alumnos/1

  Respuesta
  ```json
  {
    "status": "OK",
    "code": 200,
    "data": {
      "id_alumno": 1,
      "nombre": "Juan",
      "email": "juan@gmail.com",
      "telefono": 123456
    }
  }
  ```

### Crear Alumno [POST]
Solicitud [POST] /alumnos
```json
{
  "nombre": "Juan",
  "email": "juan@gmail.com",
  "telefono": 123456
}
```

Respuesta
```json
{
  "status": "OK",
  "code": 200,
  "data": {
    "id_alumno": 1
  }
}
```

### Actualizar TODO Alumno [PUT]
Solicitud [PUT] /alumnos/1
```json
{
  "nombre": "Juan Carlos",
  "email": "juan@gmail.com",
  "telefono": 123456
}
```

Respuesta
```json
{
  "status": "OK",
  "code": 200,
  "data": {
   "success": "Perfecto."
  }
}
```

### Actualizar Alumno [PATCH]
Solicitud [PATCH] /alumnos/1
```json
{
  "email": "juancarlos@gmail.com",
}
```

Respuesta
```json
{
  "status": "OK",
  "code": 200,
  "data": {
   "success": "Perfecto."
  }
}
```

### Eliminar Alumno [DELETE]
Solicitud [DELETE] /alumnos/1

Respuesta
```json
{
  "status": "OK",
  "code": 200,
  "data": {
   "success": "Perfecto."
  }
}
```

### Mensajes de error

```json
{
  "status": "Unprocessable Entity",
  "code": 422,
  "data": {
   "error": "Ya existe un registro con esos datos"
  }
}
```
