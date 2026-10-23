# Ejercicio 06 - validacion centralizada

API de motos y mecanica hecha con Node.js y Express. La idea es que la
validacion no viva dentro de cada servicio, sino en un solo middleware
que cualquier ruta puede reutilizar pasandole su propio schema.

## Como funciona

`src/middlewares/validate.js` exporta `validate(schema)`. El schema es un
objeto simple que describe cada campo:

```js
// schemas/moto.schema.js
const motoSchema = {
    brand: { type: "string", required: true },
    model: { type: "string", required: true },
    cc: { type: "number", required: true, min: 50 },
    year: { type: "number", required: true, min: 1980 }
};
```

Y en la ruta se usa asi:

```js
router.post("/", validate(motoSchema), createMoto);
```

Si algo esta mal, `validate` llama a `next(new AppError(400, ...))` y el
middleware de errores de `app.js` arma la respuesta. El controlador nunca
ve datos invalidos: si `createMoto` se ejecuta es porque ya paso la
validacion.

`repuestos` usa el mismo middleware con su propio `repuesto.schema.js`,
asi se ve que no es codigo pegado a un solo recurso.

| Carpeta        | Que hay dentro                                          |
| -------------- | -------------------------------------------------------- |
| `middlewares/` | `validate.js`, el validador centralizado                  |
| `schemas/`     | Un archivo por recurso con las reglas de sus campos        |
| `routes/`      | `index.js` y un archivo por recurso                        |
| `controllers/` | Un controlador por recurso, envuelto en catchAsync         |
| `services/`    | Acceso a los datos en memoria                              |
| `data/`        | `db.js` con los tres arreglos                              |

## Requisitos

Node.js 20 o superior. Sin base de datos.

## Instalacion y ejecucion

```bash
npm install
npm start
```

| Script        | Descripcion                                        |
| ------------- | -------------------------------------------------- |
| `npm start`   | Levanta el servidor en http://localhost:3006       |
| `npm run dev` | Igual pero con recarga automatica (`node --watch`) |

El puerto se puede cambiar con la variable `PORT`.

## Endpoints

| Metodo | Ruta               | Descripcion                        |
| ------ | ------------------ | ----------------------------------- |
| GET    | `/health`          | Comprueba que el servidor vive      |
| GET    | `/api`             | Lista los recursos disponibles      |
| GET    | `/api/talleres`    | Lista los talleres                  |
| GET    | `/api/talleres/:id` | Busca un taller por id               |
| GET    | `/api/motos`       | Lista las motos                     |
| GET    | `/api/motos/:id`   | Busca una moto por id                 |
| POST   | `/api/motos`       | Crea una moto (pasa por `validate`) |
| GET    | `/api/repuestos`   | Lista los repuestos                 |
| GET    | `/api/repuestos/:id` | Busca un repuesto por id            |
| POST   | `/api/repuestos`   | Crea un repuesto (pasa por `validate`) |

Talleres es de solo lectura. `motos` y `repuestos` se pueden crear y las
dos rutas usan el mismo middleware de validacion.

### Campos de una moto

- `brand`: texto obligatorio.
- `model`: texto obligatorio.
- `cc`: numero mayor o igual a 50.
- `year`: numero mayor o igual a 1980.

### Campos de un repuesto

- `name`: texto obligatorio.
- `category`: una de `frenos`, `motor`, `suspension`, `electrico`.
- `price`: numero mayor o igual a 0.

## Ejemplos

Crear una moto:

```bash
curl.exe -X POST http://localhost:3006/api/motos -H "Content-Type: application/json" -d "{\"brand\":\"Honda\",\"model\":\"CB190\",\"cc\":190,\"year\":2022}"
```

```json
{
  "ok": true,
  "data": { "id": 2, "brand": "Honda", "model": "CB190", "cc": 190, "year": 2022 }
}
```

Crear un repuesto:

```bash
curl.exe -X POST http://localhost:3006/api/repuestos -H "Content-Type: application/json" -d "{\"name\":\"Bujia NGK\",\"category\":\"motor\",\"price\":25}"
```

```json
{
  "ok": true,
  "data": { "id": 2, "name": "Bujia NGK", "category": "motor", "price": 25 }
}
```

## Casos de error

Moto invalida (400), el mismo `validate` que usa repuestos:

```bash
curl.exe -X POST http://localhost:3006/api/motos -H "Content-Type: application/json" -d "{\"brand\":\"\",\"cc\":10,\"year\":1950}"
```

```json
{
  "ok": false,
  "message": "Datos invalidos",
  "errors": [
    "brand debe ser texto y no puede ir vacio",
    "model es obligatorio",
    "cc debe ser mayor o igual a 50",
    "year debe ser mayor o igual a 1980"
  ]
}
```

Repuesto con categoria invalida (400):

```bash
curl.exe -X POST http://localhost:3006/api/repuestos -H "Content-Type: application/json" -d "{\"name\":\"Filtro\",\"category\":\"carroceria\",\"price\":-5}"
```

```json
{
  "ok": false,
  "message": "Datos invalidos",
  "errors": [
    "category debe ser uno de: frenos, motor, suspension, electrico",
    "price debe ser mayor o igual a 0"
  ]
}
```

Taller que no existe (404):

```bash
curl.exe http://localhost:3006/api/talleres/50
```

```json
{ "ok": false, "message": "No existe el taller con id 50" }
```

## Notas

Los datos viven en memoria, al reiniciar el servidor vuelven a los del
archivo `src/data/db.js`.
