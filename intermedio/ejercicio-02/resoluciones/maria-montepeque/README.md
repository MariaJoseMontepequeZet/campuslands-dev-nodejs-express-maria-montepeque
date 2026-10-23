# Ejercicio 02 - routers modulares

API de un shooter competitivo hecha con Node.js y Express. Aqui lo que se
practica es dividir las rutas en varios routers: cada recurso tiene su
propio archivo y un router principal los junta.

## Como se montan los routers

```text
app.js            app.use("/api", apiRoutes)
routes/index.js   router.use("/players", ...) + weapons + matches
```

`src/app.js` solo monta un router. El de `routes/index.js` es el que sabe
que recursos existen, asi que para agregar otro recurso no hay que tocar
`app.js`. Cada router apunta a su controlador y cada controlador a su
servicio, igual que en el ejercicio anterior.

| Carpeta        | Que hay dentro                                     |
| -------------- | -------------------------------------------------- |
| `routes/`      | `index.js` y un archivo por recurso                |
| `controllers/` | Un controlador por recurso                         |
| `services/`    | Un servicio por recurso                            |
| `data/`        | `db.js` con los tres arreglos en memoria           |

## Requisitos

Node.js 20 o superior. Sin base de datos.

## Instalacion y ejecucion

```bash
npm install
npm start
```

| Script        | Descripcion                                        |
| ------------- | -------------------------------------------------- |
| `npm start`   | Levanta el servidor en http://localhost:3002       |
| `npm run dev` | Igual pero con recarga automatica (`node --watch`) |

El puerto se puede cambiar con la variable `PORT`.

## Endpoints

| Metodo | Ruta               | Descripcion                        |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/health`          | Comprueba que el servidor vive     |
| GET    | `/api`             | Lista los recursos disponibles     |
| GET    | `/api/players`     | Lista los jugadores                |
| GET    | `/api/players/:id` | Busca un jugador por id            |
| POST   | `/api/players`     | Crea un jugador                    |
| GET    | `/api/weapons`     | Lista las armas                    |
| GET    | `/api/weapons/:id` | Busca un arma por id               |
| GET    | `/api/matches`     | Lista las partidas                 |
| GET    | `/api/matches/:id` | Busca una partida por id           |

Armas y partidas son de solo lectura, el unico recurso que se puede crear
es `players`.

### Campos de un jugador

- `nickname`: texto obligatorio.
- `team`: uno de `Nova`, `Delta`, `Kappa`.
- `kd`: numero mayor o igual a 0.

## Ejemplos

Ver que recursos hay:

```bash
curl.exe http://localhost:3002/api
```

```json
{ "ok": true, "resources": ["/api/players", "/api/weapons", "/api/matches"] }
```

Listar armas:

```bash
curl.exe http://localhost:3002/api/weapons
```

```json
{
  "ok": true,
  "total": 3,
  "data": [{ "id": 1, "name": "Falcon AR", "type": "rifle", "damage": 33 }]
}
```

Crear un jugador:

```bash
curl.exe -X POST http://localhost:3002/api/players -H "Content-Type: application/json" -d "{\"nickname\":\"Raven\",\"team\":\"Kappa\",\"kd\":1.42}"
```

```json
{
  "ok": true,
  "data": { "id": 4, "nickname": "Raven", "team": "Kappa", "kd": 1.42 }
}
```

## Casos de error

Datos invalidos (400):

```bash
curl.exe -X POST http://localhost:3002/api/players -H "Content-Type: application/json" -d "{\"nickname\":\"\",\"team\":\"Omega\",\"kd\":-1}"
```

```json
{
  "ok": false,
  "message": "Datos invalidos",
  "errors": [
    "nickname es obligatorio",
    "team debe ser uno de: Nova, Delta, Kappa",
    "kd debe ser un numero mayor o igual a 0"
  ]
}
```

Partida que no existe (404):

```bash
curl.exe http://localhost:3002/api/matches/50
```

```json
{ "ok": false, "message": "No existe la partida con id 50" }
```

Recurso que no existe (404):

```bash
curl.exe http://localhost:3002/api/maps
```

```json
{ "ok": false, "message": "La ruta /api/maps no existe" }
```

## Notas

Los datos viven en memoria, al reiniciar el servidor vuelven a los del
archivo `src/data/db.js`.
