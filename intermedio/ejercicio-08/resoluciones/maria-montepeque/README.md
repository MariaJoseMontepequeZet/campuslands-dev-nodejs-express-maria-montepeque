# Ejercicio 08 - middleware de request id

API de hiperdeportivos hecha con Node.js y Express. Cada request que
entra recibe un id unico, pensado para poder rastrear una peticion desde
el cliente hasta los logs del servidor.

## Como funciona

`src/middlewares/request-id.js` va primero en la cadena:

```js
function requestId(req, res, next) {
    req.id = req.get("X-Request-Id") || randomUUID();
    res.set("X-Request-Id", req.id);
    next();
}
```

Si el cliente ya mando un `X-Request-Id` (por ejemplo para encadenar
varios servicios) lo respeta, si no genera uno con `crypto.randomUUID()`.
El id queda en `req.id`, disponible para el resto de middlewares y
controladores.

Dos lugares lo usan:

- `request-logger.js`: imprime una linea por cada respuesta con el id
  adelante, asi se puede buscar en el log todo lo que paso en un request.
- Todas las respuestas JSON (exito y error) incluyen `requestId` en el
  cuerpo ademas del header, para que si algo falla el usuario pueda
  reportar ese id exacto.

```text
[3f2c1a4e-...] GET /api/pilotos 200 3ms
```

| Carpeta        | Que hay dentro                                     |
| -------------- | --------------------------------------------------- |
| `middlewares/` | `request-id.js` y `request-logger.js`                |
| `routes/`      | `index.js` y un archivo por recurso                   |
| `controllers/` | Un controlador por recurso, envuelto en catchAsync    |
| `services/`    | Validaciones y acceso a los datos                     |
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
| `npm start`   | Levanta el servidor en http://localhost:3008       |
| `npm run dev` | Igual pero con recarga automatica (`node --watch`) |

El puerto se puede cambiar con la variable `PORT`.

## Endpoints

| Metodo | Ruta                | Descripcion                        |
| ------ | ------------------- | ----------------------------------- |
| GET    | `/health`           | Comprueba que el servidor vive      |
| GET    | `/api`              | Lista los recursos disponibles      |
| GET    | `/api/escuderias`   | Lista las escuderias                |
| GET    | `/api/escuderias/:id` | Busca una escuderia por id          |
| GET    | `/api/pilotos`      | Lista los pilotos                   |
| GET    | `/api/pilotos/:id`  | Busca un piloto por id                |
| GET    | `/api/vueltas`      | Lista las vueltas registradas       |
| POST   | `/api/vueltas`      | Registra una vuelta                 |

Escuderias y pilotos son de solo lectura, el unico recurso que se puede
crear es `vueltas`.

### Campos de una vuelta

- `pilotoId`: numero obligatorio, debe existir en `pilotos`.
- `circuit`: texto obligatorio.
- `timeSeconds`: numero mayor a 0.

## Ejemplos

Ver el header y el cuerpo con el id:

```bash
curl.exe -i http://localhost:3008/health
```

```text
HTTP/1.1 200 OK
X-Request-Id: 3f2c1a4e-8b2a-4c3d-9e1f-7a6b5c4d3e2f

{"ok":true,"requestId":"3f2c1a4e-8b2a-4c3d-9e1f-7a6b5c4d3e2f","message":"Ejercicio ejecutado correctamente","topic":"middleware de request id"}
```

Mandar tu propio id (por ejemplo si viene de otro servicio):

```bash
curl.exe -i http://localhost:3008/health -H "X-Request-Id: pedido-123"
```

El header y el `requestId` del cuerpo responden `pedido-123`.

Registrar una vuelta:

```bash
curl.exe -X POST http://localhost:3008/api/vueltas -H "Content-Type: application/json" -d "{\"pilotoId\":1,\"circuit\":\"Monza\",\"timeSeconds\":78.4}"
```

```json
{
  "ok": true,
  "requestId": "3f2c1a4e-8b2a-4c3d-9e1f-7a6b5c4d3e2f",
  "data": { "id": 1, "pilotoId": 1, "circuit": "Monza", "timeSeconds": 78.4 }
}
```

## Casos de error

Datos invalidos (400):

```bash
curl.exe -X POST http://localhost:3008/api/vueltas -H "Content-Type: application/json" -d "{\"circuit\":\"\",\"timeSeconds\":0}"
```

```json
{
  "ok": false,
  "requestId": "3f2c1a4e-8b2a-4c3d-9e1f-7a6b5c4d3e2f",
  "message": "Datos invalidos",
  "errors": [
    "pilotoId es obligatorio y debe ser un numero",
    "circuit es obligatorio",
    "timeSeconds debe ser un numero mayor a 0"
  ]
}
```

Piloto que no existe (404):

```bash
curl.exe http://localhost:3008/api/pilotos/99
```

```json
{ "ok": false, "requestId": "3f2c1a4e-8b2a-4c3d-9e1f-7a6b5c4d3e2f", "message": "No existe el piloto con id 99" }
```

## Notas

Los datos viven en memoria, al reiniciar el servidor vuelven a los del
archivo `src/data/db.js` (sin vueltas).
