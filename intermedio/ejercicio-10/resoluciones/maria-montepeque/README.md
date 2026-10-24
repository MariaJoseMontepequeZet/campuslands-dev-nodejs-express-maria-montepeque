# Ejercicio 10 - ordenamiento de resultados

API de pingpong hecha con Node.js y Express. `jugadores` es el recurso
que se puede ordenar por query string, con una sintaxis parecida a la
de APIs reales (JSON:API usa algo asi).

## Como funciona

`src/utils/sort-by.js` recibe el arreglo, el texto de `sort` y la lista
de campos permitidos:

```js
function sortBy(records, sortParam, allowedFields) {
    // "-wins,name" => wins descendente, de empate name ascendente
}
```

- Sin `-` adelante es ascendente, con `-` es descendente.
- Se pueden encadenar varios campos separados por coma, el primero
  manda y los siguientes solo desempatan.
- Si mandas un campo que no esta en la lista permitida, responde 400.

`jugadores.service.js` solo declara que campos se pueden usar:

```js
const SORTABLE_FIELDS = ["name", "ranking", "wins"];
```

| Carpeta        | Que hay dentro                                     |
| -------------- | --------------------------------------------------- |
| `utils/`       | `sort-by.js`, `app-error.js`, `catch-async.js`        |
| `routes/`      | `index.js` y un archivo por recurso                   |
| `controllers/` | Un controlador por recurso, envuelto en catchAsync    |
| `services/`    | Ordenamiento y acceso a los datos                     |
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
| `npm start`   | Levanta el servidor en http://localhost:3010       |
| `npm run dev` | Igual pero con recarga automatica (`node --watch`) |

El puerto se puede cambiar con la variable `PORT`.

## Endpoints

| Metodo | Ruta               | Descripcion                                |
| ------ | ------------------ | -------------------------------------------- |
| GET    | `/health`          | Comprueba que el servidor vive                |
| GET    | `/api`             | Lista los recursos disponibles                |
| GET    | `/api/clubes`      | Lista los clubes                              |
| GET    | `/api/clubes/:id`  | Busca un club por id                            |
| GET    | `/api/torneos`     | Lista los torneos                             |
| GET    | `/api/torneos/:id` | Busca un torneo por id                          |
| GET    | `/api/jugadores`   | Lista jugadores, acepta `sort`                |
| GET    | `/api/jugadores/:id` | Busca un jugador por id                       |

### Query param de `/api/jugadores`

- `sort`: uno o varios campos entre `name`, `ranking`, `wins`, separados
  por coma. Un `-` adelante invierte el orden.

## Ejemplos

Por victorias, de mas a menos:

```bash
curl.exe "http://localhost:3010/api/jugadores?sort=-wins"
```

```json
{
  "ok": true,
  "total": 4,
  "data": [
    { "id": 2, "name": "Lucia Mex", "clubId": 2, "ranking": 1, "wins": 30 },
    { "id": 4, "name": "Renata Us", "clubId": 2, "ranking": 2, "wins": 28 },
    { "id": 1, "name": "Diego Ajpop", "clubId": 1, "ranking": 3, "wins": 22 },
    { "id": 3, "name": "Pablo Say", "clubId": 1, "ranking": 5, "wins": 15 }
  ]
}
```

Por ranking, de menor a mayor (el mejor primero):

```bash
curl.exe "http://localhost:3010/api/jugadores?sort=ranking"
```

Por nombre alfabetico:

```bash
curl.exe "http://localhost:3010/api/jugadores?sort=name"
```

## Casos de error

Campo de orden no permitido (400):

```bash
curl.exe "http://localhost:3010/api/jugadores?sort=secretRating"
```

```json
{ "ok": false, "message": "No se puede ordenar por \"secretRating\", usa uno de: name, ranking, wins" }
```

Jugador que no existe (404):

```bash
curl.exe http://localhost:3010/api/jugadores/99
```

```json
{ "ok": false, "message": "No existe el jugador con id 99" }
```

## Notas

Los datos viven en memoria, al reiniciar el servidor vuelven a los del
archivo `src/data/db.js`.
