define({ "api": [
  {
    "type": "put",
    "url": "/api/alumno/:id",
    "title": "Actualizar un alumno",
    "name": "Actualiza_un_alumno",
    "group": "Alumno",
    "permission": [
      {
        "name": "admin",
        "title": "Rol: ADMIN",
        "description": "<p>Solo los usuarios ADMIN pueden acceder a este recurso.</p>"
      },
      {
        "name": "user",
        "title": "Rol: USER",
        "description": "<p>Solo los usuarios USER pueden acceder a este recurso.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID del alumno.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del alumno.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del alumno.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "telefono",
            "description": "<p>Telefono del alumno.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la petición.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n{\n  \"success\": \"Ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"success\": \"Fail\",\n  \"data\": \"Algunos datos no son válidos\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": \"Fail\",\n  \"data\": \"El recurso no existe\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/api/alumnos.js",
    "groupTitle": "Alumno"
  },
  {
    "type": "post",
    "url": "/api/alumno",
    "title": "Crear un alumno",
    "name": "Crear_un_alumno",
    "group": "Alumno",
    "permission": [
      {
        "name": "admin",
        "title": "Rol: ADMIN",
        "description": "<p>Solo los usuarios ADMIN pueden acceder a este recurso.</p>"
      },
      {
        "name": "user",
        "title": "Rol: USER",
        "description": "<p>Solo los usuarios USER pueden acceder a este recurso.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombre",
            "description": "<p>Nombre del alumno.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del alumno.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "telefono",
            "description": "<p>Telefono del alumno.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la petición.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Objeto que contiene los datos del alumno.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response: 201 Created",
          "content": "HTTP/1.1 201 Created\n{\n  \"success\": \"Ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: 400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"success\": \"Fail\",\n  \"data\": \"Algunos datos no son válidos\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/api/alumnos.js",
    "groupTitle": "Alumno"
  },
  {
    "type": "delete",
    "url": "/api/alumno/:id",
    "title": "Eliminar un alumno",
    "name": "Elimina_un_alumno",
    "group": "Alumno",
    "permission": [
      {
        "name": "admin",
        "title": "Rol: ADMIN",
        "description": "<p>Solo los usuarios ADMIN pueden acceder a este recurso.</p>"
      },
      {
        "name": "user",
        "title": "Rol: USER",
        "description": "<p>Solo los usuarios USER pueden acceder a este recurso.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID del alumno.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la petición.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n{\n  \"success\": \"Ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"success\": \"Fail\",\n  \"data\": \"Algunos datos no son válidos\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": \"Fail\",\n  \"data\": \"El recurso no existe\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/api/alumnos.js",
    "groupTitle": "Alumno"
  },
  {
    "type": "get",
    "url": "/api/alumno",
    "title": "Obtener Alumnos",
    "name": "Otener_alumnos",
    "group": "Alumno",
    "permission": [
      {
        "name": "admin",
        "title": "Rol: ADMIN",
        "description": "<p>Solo los usuarios ADMIN pueden acceder a este recurso.</p>"
      },
      {
        "name": "user",
        "title": "Rol: USER",
        "description": "<p>Solo los usuarios USER pueden acceder a este recurso.</p>"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la petición.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>Objeto que contiene una lista de alumnos.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n{\n  \"success\": \"Ok\",\n  \"data\": [\n    {\n      \"id_alumno\": 1,\n      \"nombre\": \"Juan\",\n      \"email\": \"juan@gmail.com\",\n      \"telefono\": 22654665,\n      \"id_usuario\": 1,\n      \"_fecha_creacion\": \"2017-05-12T14:07:00.000Z\",\n      \"_fecha_modificacion\": \"2017-05-12T14:07:00.000Z\"\n    },\n    {\n      \"id_alumno\": 2,\n      \"nombre\": \"rosa\",\n      \"email\": \"rosa@gmail.com\",\n      \"telefono\": 22984756,\n      \"id_usuario\": 2,\n      \"_fecha_creacion\": \"2017-05-12T14:07:00.000Z\",\n      \"_fecha_modificacion\": \"2017-05-12T14:07:00.000Z\"\n    },\n    {\n      \"id_alumno\": 3,\n      \"nombre\": \"ana\",\n      \"email\": \"ana@gmail.com\",\n      \"telefono\": 78657775,\n      \"id_usuario\": 3,\n      \"_fecha_creacion\": \"2017-05-12T14:07:00.000Z\",\n      \"_fecha_modificacion\": \"2017-05-12T14:07:00.000Z\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/api/alumnos.js",
    "groupTitle": "Alumno"
  },
  {
    "type": "get",
    "url": "/api/alumno/:id",
    "title": "Obtener un alumno",
    "name": "Otener_un_alumno",
    "group": "Alumno",
    "permission": [
      {
        "name": "admin",
        "title": "Rol: ADMIN",
        "description": "<p>Solo los usuarios ADMIN pueden acceder a este recurso.</p>"
      },
      {
        "name": "user",
        "title": "Rol: USER",
        "description": "<p>Solo los usuarios USER pueden acceder a este recurso.</p>"
      }
    ],
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID del alumno.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la petición.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Objeto que contiene los datos del alumno.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n{\n  \"success\": \"Ok\",\n  \"data\": {\n     \"id_alumno\": 1,\n     \"nombre\": \"Juan\",\n     \"email\": \"juan@gmail.com\",\n     \"telefono\": 22654665,\n     \"id_usuario\": 1,\n     \"_fecha_creacion\": \"2017-05-12T14:07:00.000Z\",\n     \"_fecha_modificacion\": \"2017-05-12T14:07:00.000Z\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response: 400 Bad Request",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"success\": \"Fail\",\n  \"data\": \"Error en la petición\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response: 404  Not Found",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": \"Fail\",\n  \"data\": \"El recurso no existe\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/api/alumnos.js",
    "groupTitle": "Alumno"
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login",
    "name": "Login",
    "group": "Auth",
    "version": "1.0.0",
    "sampleRequest": [
      {
        "url": "http://localhost:8000/auth/login"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "usuario",
            "description": "<p>Nombre del usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contrasena",
            "description": "<p>Contraseña del usuario.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Resultado de la petición.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Objeto que contiene el token y datos del usuario.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": \"Ok\",\n  \"data\": {\n    \"token\": \"eyJ0eXAiOiJKV1QiLCJhb...\",\n    \"usuario\": {\n      \"id_usuario\": 1,\n      \"id_rol\": 1\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": \"Fail\",\n  \"data\": \"Usuario y/o contraseña incorrecta\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/auth/login.js",
    "groupTitle": "Auth"
  }
] });