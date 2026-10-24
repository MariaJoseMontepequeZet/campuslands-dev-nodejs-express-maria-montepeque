# Ejercicio 07 - middleware de errores

API de renta de autos de lujo hecha con Node.js y Express. El foco es
sacar el manejo de errores de `app.js` y darle su propia estructura:
clases de error por tipo y dos middlewares dedicados.

## Como esta armado

```text
errors/
├── app-error.js         clase base (status, message, errors)
├── not-found-error.js    404
├── validation-error.js   400
└── conflict-error.js     409

middlewares/
├── not-found.js       se monta al final de las rutas, convierte en 404
└── error-handler.js   unico lugar que arma la respuesta final
```

Los servicios lanzan el error que corresponde segun el caso:

```js
// reservas.service.js
if (!vehiculo) {
    throw new NotFoundError(`No existe el vehiculo con id ${body.vehicleId}`);
}

if (yaReservado) {
    throw new ConflictError(`El vehiculo con id ${body.vehicleId} ya tiene una reserva activa`);
}
```

Como los controladores estan envueltos en `catchAsync`, cualquier error
que se lance (sin importar el tipo) termina en `next(error)` y de ahi en
`error-handler.js`, que solo mira `error.statusCode` para responder. Si
el error no tiene `statusCode` (uno que no se esperaba) responde 500 y
imprime el stack.

| Carpeta        | Que hay dentro                                     |
| -------------- | --------------------------------------------------- |
| `errors/`      | AppError y sus tres subclases                       |
| `middlewares/` | `not-found.js` y `error-handler.js`                   |
| `routes/`      | `index.js` y un archivo por recurso                   |
| `controllers/` | Un controlador por recurso, envuelto en catchAsync    |
| `services/`    | Logica y validaciones, lanzan el error que toca       |
| `data/`        | `db.js` con los tres arreglos en memoria              |

## Requisitos

Node.js 20 o superior. Sin base de datos.

## Instalacion y ejecucion

```bash
npm install
npm start
```

| Script        | Descripcion                                        |
| ------------- | -------------------------------------------------- |
| `npm start`   | Levanta el servidor en http://localhost:3007       |
| `npm run dev` | Igual pero con recarga automatica (`node --watch`) |

El puerto se puede cambiar con la variable `PORT`.

## Endpoints

| Metodo | Ruta               | Descripcion                        |
| ------ | ------------------ | ----------------------------------- |
| GET    | `/health`          | Comprueba que el servidor vive      |
| GET    | `/api`             | Lista los recursos disponibles      |
| GET    | `/api/marcas`      | Lista las marcas                    |
| GET    | `/api/marcas/:id`  | Busca una marca por id                |
| GET    | `/api/vehiculos`   | Lista los vehiculos                 |
| GET    | `/api/vehiculos/:id` | Busca un vehiculo por id            |
| GET    | `/api/reservas`    | Lista las reservas                  |
| POST   | `/api/reservas`    | Crea una reserva                    |

Marcas y vehiculos son de solo lectura, el unico recurso que se puede
crear es `reservas`.

### Campos de una reserva

- `vehicleId`: numero obligatorio, debe existir en `vehiculos`.
- `customerName`: texto obligatorio.
- `days`: numero mayor o igual a 1.

## Ejemplos

Crear una reserva:

```bash
curl.exe -X POST http://localhost:3007/api/reservas -H "Content-Type: application/json" -d "{\"vehicleId\":1,\"customerName\":\"Carlos Pu\",\"days\":3}"
```

```json
{
  "ok": true,
  "data": { "id": 1, "vehicleId": 1, "customerName": "Carlos Pu", "days": 3, "total": 1350 }
}
```

## Casos de error

Datos invalidos (400):

```bash
curl.exe -X POST http://localhost:3007/api/reservas -H "Content-Type: application/json" -d "{\"customerName\":\"\",\"days\":0}"
```

```json
{
  "ok": false,
  "message": "Datos invalidos",
  "errors": [
    "vehicleId es obligatorio y debe ser un numero",
    "customerName es obligatorio",
    "days debe ser un numero mayor o igual a 1"
  ]
}
```

Vehiculo que no existe (404):

```bash
curl.exe -X POST http://localhost:3007/api/reservas -H "Content-Type: application/json" -d "{\"vehicleId\":99,\"customerName\":\"Ana Lux\",\"days\":2}"
```

```json
{ "ok": false, "message": "No existe el vehiculo con id 99" }
```

Vehiculo ya reservado (409):

```bash
curl.exe -X POST http://localhost:3007/api/reservas -H "Content-Type: application/json" -d "{\"vehicleId\":1,\"customerName\":\"Otro Cliente\",\"days\":1}"
```

```json
{ "ok": false, "message": "El vehiculo con id 1 ya tiene una reserva activa" }
```

Recurso que no existe (404), lo responde `middlewares/not-found.js`:

```bash
curl.exe http://localhost:3007/api/maps
```

```json
{ "ok": false, "message": "La ruta /api/maps no existe" }
```

## Notas

Los datos viven en memoria, al reiniciar el servidor vuelven a los del
archivo `src/data/db.js` (sin reservas).
