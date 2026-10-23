# Ejercicio 04 - servicios reutilizables

API de un battle royale hecha con Node.js y Express. El punto del
ejercicio es no repetir `findAll`/`findById` en cada servicio: hay un
servicio generico que cualquier recurso puede usar.

## El servicio reutilizable

`src/services/repository.js` exporta `createRepository(records)`, que
recibe un arreglo y devuelve `findAll`, `findById`, `nextId` e `insert`.
Cada servicio de recurso solo llama a esa funcion con sus propios datos:

```js
// zones.service.js
const repository = createRepository(zones);

function findById(id) {
    const zone = repository.findById(id);
    if (!zone) throw new AppError(404, `No existe la zona con id ${id}`);
    return zone;
}
```

`zones` y `squads` usan el repositorio tal cual (son de solo lectura).
`drops` ademas le agrega su propia validacion y usa `repository.insert`
para crear.

| Carpeta        | Que hay dentro                                          |
| -------------- | -------------------------------------------------------- |
| `routes/`      | `index.js` y un archivo por recurso                       |
| `controllers/` | Un controlador por recurso, envuelto en catchAsync        |
| `services/`    | `repository.js` (reutilizable) + un servicio por recurso  |
| `data/`        | `db.js` con los tres arreglos en memoria                  |
| `utils/`       | `app-error.js` y `catch-async.js`                          |

## Requisitos

Node.js 20 o superior. Sin base de datos.

## Instalacion y ejecucion

```bash
npm install
npm start
```

| Script        | Descripcion                                        |
| ------------- | -------------------------------------------------- |
| `npm start`   | Levanta el servidor en http://localhost:3004       |
| `npm run dev` | Igual pero con recarga automatica (`node --watch`) |

El puerto se puede cambiar con la variable `PORT`.

## Endpoints

| Metodo | Ruta              | Descripcion                        |
| ------ | ----------------- | ----------------------------------- |
| GET    | `/health`         | Comprueba que el servidor vive      |
| GET    | `/api`            | Lista los recursos disponibles      |
| GET    | `/api/zones`      | Lista las zonas                     |
| GET    | `/api/zones/:id`  | Busca una zona por id                |
| GET    | `/api/squads`     | Lista los escuadrones               |
| GET    | `/api/squads/:id` | Busca un escuadron por id             |
| GET    | `/api/drops`      | Lista los drops                     |
| GET    | `/api/drops/:id`  | Busca un drop por id                  |
| POST   | `/api/drops`      | Crea un drop                        |

Zonas y escuadrones son de solo lectura, el unico recurso que se puede
crear es `drops`.

### Campos de un drop

- `item`: texto obligatorio.
- `rarity`: una de `comun`, `raro`, `epico`, `legendario`.
- `zoneId`: numero obligatorio (id de la zona donde cae).

## Ejemplos

Ver que recursos hay:

```bash
curl.exe http://localhost:3004/api
```

```json
{ "ok": true, "resources": ["/api/zones", "/api/squads", "/api/drops"] }
```

Listar zonas:

```bash
curl.exe http://localhost:3004/api/zones
```

```json
{
  "ok": true,
  "total": 3,
  "data": [{ "id": 1, "name": "Zona Norte", "radius": 450 }]
}
```

Crear un drop:

```bash
curl.exe -X POST http://localhost:3004/api/drops -H "Content-Type: application/json" -d "{\"item\":\"Rifle de asalto\",\"rarity\":\"epico\",\"zoneId\":2}"
```

```json
{
  "ok": true,
  "data": { "id": 2, "item": "Rifle de asalto", "rarity": "epico", "zoneId": 2 }
}
```

## Casos de error

Datos invalidos (400):

```bash
curl.exe -X POST http://localhost:3004/api/drops -H "Content-Type: application/json" -d "{\"item\":\"\",\"rarity\":\"mitico\",\"zoneId\":\"dos\"}"
```

```json
{
  "ok": false,
  "message": "Datos invalidos",
  "errors": [
    "item es obligatorio",
    "rarity debe ser una de: comun, raro, epico, legendario",
    "zoneId es obligatorio y debe ser un numero"
  ]
}
```

Escuadron que no existe (404):

```bash
curl.exe http://localhost:3004/api/squads/50
```

```json
{ "ok": false, "message": "No existe el escuadron con id 50" }
```

Recurso que no existe (404):

```bash
curl.exe http://localhost:3004/api/maps
```

```json
{ "ok": false, "message": "La ruta /api/maps no existe" }
```

## Notas

Los datos viven en memoria, al reiniciar el servidor vuelven a los del
archivo `src/data/db.js`.
