# Ejercicio 03 - controladores limpios

API de un MOBA esports hecha con Node.js y Express. La idea del ejercicio es
que el controlador quede chiquito: solo llama al servicio y arma la
respuesta, nada de validaciones ni try/catch repetido ahi adentro.

## Como queda el controlador

```js
const createTournament = catchAsync(async (req, res) => {
    const tournament = tournamentsService.create(req.body);
    res.status(201).json({ ok: true, data: tournament });
});
```

- `catchAsync` (en `utils/catch-async.js`) envuelve el controlador y manda
  cualquier error directo a `next(error)`. Asi no hay que escribir
  `try/catch` en cada funcion.
- El servicio es el que valida y el que lanza el error (`AppError`, en
  `utils/app-error.js`) cuando algo esta mal o no existe.
- `app.js` tiene un solo middleware de error al final que lee
  `error.statusCode` y `error.errors` y arma la respuesta. Si el error no
  trae `statusCode` responde 500 y lo imprime en consola.

| Carpeta        | Que hay dentro                                     |
| -------------- | -------------------------------------------------- |
| `routes/`      | `index.js` y un archivo por recurso                |
| `controllers/` | Un controlador por recurso, envuelto en catchAsync |
| `services/`    | Validaciones y acceso a los datos                  |
| `data/`        | `db.js` con los tres arreglos en memoria           |
| `utils/`       | `app-error.js` y `catch-async.js`                  |

## Requisitos

Node.js 20 o superior. Sin base de datos.

## Instalacion y ejecucion

```bash
npm install
npm start
```

| Script        | Descripcion                                        |
| ------------- | -------------------------------------------------- |
| `npm start`   | Levanta el servidor en http://localhost:3003       |
| `npm run dev` | Igual pero con recarga automatica (`node --watch`) |

El puerto se puede cambiar con la variable `PORT`.

## Endpoints

| Metodo | Ruta                   | Descripcion                        |
| ------ | ---------------------- | ----------------------------------- |
| GET    | `/health`              | Comprueba que el servidor vive      |
| GET    | `/api`                 | Lista los recursos disponibles      |
| GET    | `/api/heroes`          | Lista los heroes                    |
| GET    | `/api/heroes/:id`      | Busca un heroe por id                |
| GET    | `/api/teams`           | Lista los equipos                   |
| GET    | `/api/teams/:id`       | Busca un equipo por id               |
| GET    | `/api/tournaments`     | Lista los torneos                   |
| GET    | `/api/tournaments/:id` | Busca un torneo por id               |
| POST   | `/api/tournaments`     | Crea un torneo                      |

Heroes y equipos son de solo lectura, el unico recurso que se puede crear
es `tournaments`.

### Campos de un torneo

- `name`: texto obligatorio.
- `region`: una de `LATAM`, `EU`, `NA`, `APAC`.
- `prizePool`: numero mayor o igual a 0.

## Ejemplos

Ver que recursos hay:

```bash
curl.exe http://localhost:3003/api
```

```json
{ "ok": true, "resources": ["/api/heroes", "/api/teams", "/api/tournaments"] }
```

Listar equipos:

```bash
curl.exe http://localhost:3003/api/teams
```

```json
{
  "ok": true,
  "total": 2,
  "data": [{ "id": 1, "name": "Thunder Wolves", "region": "LATAM", "ranking": 3 }]
}
```

Crear un torneo:

```bash
curl.exe -X POST http://localhost:3003/api/tournaments -H "Content-Type: application/json" -d "{\"name\":\"Summer Rift\",\"region\":\"NA\",\"prizePool\":20000}"
```

```json
{
  "ok": true,
  "data": { "id": 2, "name": "Summer Rift", "region": "NA", "prizePool": 20000 }
}
```

## Casos de error

Datos invalidos (400):

```bash
curl.exe -X POST http://localhost:3003/api/tournaments -H "Content-Type: application/json" -d "{\"name\":\"\",\"region\":\"MOON\",\"prizePool\":-5}"
```

```json
{
  "ok": false,
  "message": "Datos invalidos",
  "errors": [
    "name es obligatorio",
    "region debe ser una de: LATAM, EU, NA, APAC",
    "prizePool debe ser un numero mayor o igual a 0"
  ]
}
```

Heroe que no existe (404):

```bash
curl.exe http://localhost:3003/api/heroes/50
```

```json
{ "ok": false, "message": "No existe el heroe con id 50" }
```

Recurso que no existe (404):

```bash
curl.exe http://localhost:3003/api/maps
```

```json
{ "ok": false, "message": "La ruta /api/maps no existe" }
```

## Notas

Los datos viven en memoria, al reiniciar el servidor vuelven a los del
archivo `src/data/db.js`.
