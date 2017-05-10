# Base backend express

Proyecto base para crear servicios web con Express (Framework de NodeJS).

### Tecnologías Utilizadas:
- Express v4.15

### Requerimientos mínimos:
- Node v6.9.1
- Npm v4.1.2

### Códigos de respuesta:

- `200` **Ok**. La petición se ha completado con éxito.
- `201` **Created**. La petición se ha completado con éxito y como resultado se ha creado un recurso.
- `204` **No Content**. La petición se ha completado con éxito pero su respuesta no tiene ningún contenido.
- `400` **Bad Request**. El servidor no es capaz de entender la petición del navegador porque su sintaxis no es correcta.
- `401` **Unauthorized**. El recurso solicitado por el navegador requiere de autenticación.
- `404` **Not Found**. El servidor no puede encontrar el recurso solicitado por el navegador.
- `500` **Internal Server Error**. Se ha producido un error interno.

### Métodos HTTP aceptados:

| Método   | Descripción                            |
|----------|----------------------------------------|
| `GET`    | Obtiene un recurso o lista de recursos |
| `POST`   | Crea un recurso                        |
| `PUT`    | Actualiza un recurso                   |
| `DELETE` | Elimina un recurso                     |

### Instalación

Para instalar el proyecto ver el archivo
[INSTALL.md](https://github.com/waquispe/base-backend-express/blob/master/INSTALL.md).

### Referencias:
- Express http://expressjs.com/es/
- Express application generator https://expressjs.com/en/starter/generator.html
- sequelize-handlers https://github.com/botter-workshop/sequelize-handlers
- Using Passport With Sequelize and MySQL https://code.tutsplus.com/tutorials/using-passport-with-sequelize-and-mysql--cms-27537
