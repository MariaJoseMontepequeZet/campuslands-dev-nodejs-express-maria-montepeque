# Ejercicio 09 - paginacion y filtros

API de kickboxing hecha con Node.js y Express. El recurso `luchadores`
es el que tiene lista larga, asi que su `GET /` soporta pagina y
filtros por query string.

## Como funciona

`src/utils/paginate.js` recorta el arreglo ya filtrado y arma los
metadatos:

```js
function paginate(records, { page, limit }) {
    const total = records.length;
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const start = (page - 1) * limit;
    const data = records.slice(start, start + limit);
    return { data, meta: { page, limit, total, totalPages } };
}
```

`luchadores.service.js` primero filtra (`categoryId`, `gymId`), despues
pagina lo que quedo. Si no mandas `page`/`limit` usa `page=1` y
`limit=10`. Si pides un `limit` mayor a 50 responde 400, para no dejar
que alguien pida el arreglo completo de una.

| Carpeta        | Que hay dentro                                     |
| -------------- | --------------------------------------------------- |
| `utils/`       | `paginate.js`, `app-error.js`, `catch-async.js`       |
| `routes/`      | `index.js` y un archivo por recurso                   |
| `controllers/` | Un controlador por recurso, envuelto en catchAsync    |
| `services/`    | Filtros, paginacion y acceso a los datos              |
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
| `npm start`   | Levanta el servidor en http://localhost:3009       |
| `npm run dev` | Igual pero con recarga automatica (`node --watch`) |

El puerto se puede cambiar con la variable `PORT`.

## Endpoints

| Metodo | Ruta                | Descripcion                                      |
| ------ | ------------------- | -------------------------------------------------- |
| GET    | `/health`           | Comprueba que el servidor vive                     |
| GET    | `/api`              | Lista los recursos disponibles                     |
| GET    | `/api/categorias`   | Lista las categorias de peso                       |
| GET    | `/api/categorias/:id` | Busca una categoria por id                        |
| GET    | `/api/gimnasios`    | Lista los gimnasios                                |
| GET    | `/api/gimnasios/:id` | Busca un gimnasio por id                          |
| GET    | `/api/luchadores`   | Lista luchadores, acepta `page`, `limit`, `categoryId`, `gymId` |
| GET    | `/api/luchadores/:id` | Busca un luchador por id                          |

### Query params de `/api/luchadores`

- `page`: numero de pagina, por defecto `1`.
- `limit`: resultados por pagina, por defecto `10`, maximo `50`.
- `categoryId`: filtra por categoria de peso.
- `gymId`: filtra por gimnasio.

## Ejemplos

Primera pagina con 2 resultados:

```bash
curl.exe "http://localhost:3009/api/luchadores?page=1&limit=2"
```

```json
{
  "ok": true,
  "meta": { "page": 1, "limit": 2, "total": 5, "totalPages": 3 },
  "data": [
    { "id": 1, "name": "Marco Tum", "categoryId": 1, "gymId": 1, "wins": 12 },
    { "id": 2, "name": "Sofia Reyes", "categoryId": 2, "gymId": 1, "wins": 9 }
  ]
}
```

Filtrar por gimnasio:

```bash
curl.exe "http://localhost:3009/api/luchadores?gymId=2"
```

```json
{
  "ok": true,
  "meta": { "page": 1, "limit": 10, "total": 3, "totalPages": 1 },
  "data": [
    { "id": 3, "name": "Hugo Pana", "categoryId": 3, "gymId": 2, "wins": 15 },
    { "id": 4, "name": "Carla Ixim", "categoryId": 1, "gymId": 2, "wins": 7 },
    { "id": 5, "name": "Edwin Coy", "categoryId": 2, "gymId": 2, "wins": 11 }
  ]
}
```

Filtrar por categoria y gimnasio juntos:

```bash
curl.exe "http://localhost:3009/api/luchadores?categoryId=1&gymId=2"
```

```json
{
  "ok": true,
  "meta": { "page": 1, "limit": 10, "total": 1, "totalPages": 1 },
  "data": [{ "id": 4, "name": "Carla Ixim", "categoryId": 1, "gymId": 2, "wins": 7 }]
}
```

## Casos de error

`limit` fuera de rango (400):

```bash
curl.exe "http://localhost:3009/api/luchadores?limit=500"
```

```json
{ "ok": false, "message": "limit no puede ser mayor a 50" }
```

Luchador que no existe (404):

```bash
curl.exe http://localhost:3009/api/luchadores/99
```

```json
{ "ok": false, "message": "No existe el luchador con id 99" }
```

## Notas

Los datos viven en memoria, al reiniciar el servidor vuelven a los del
archivo `src/data/db.js`.
