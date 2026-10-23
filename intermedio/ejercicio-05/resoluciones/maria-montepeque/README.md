# Ejercicio 05 - repositorios en memoria

API de futbol y futbol sala hecha con Node.js y Express. Aqui el foco es
el repositorio: una capa que guarda los datos en un arreglo privado y
solo los expone a traves de funciones (`findAll`, `findById`, `create`,
`update`, `remove`), nadie de afuera toca el arreglo directo.

## Como queda separado

```text
repositories/   Guarda los datos y sabe hacer CRUD sobre el arreglo
services/       Valida y decide que pasa (404, 400), llama al repositorio
controllers/    Solo arma la respuesta HTTP
```

`ligas` y `estadios` son de solo lectura, su repositorio solo tiene
`findAll` y `findById`. `clubes` es el unico que se puede crear, editar
y borrar, por eso su repositorio tiene las cinco funciones:

```js
// clubes.repository.js
function update(id, changes) {
    const club = findById(id);
    if (!club) return null;
    Object.assign(club, changes);
    return club;
}
```

El servicio de `clubes` es el que decide si el id existe (lanza 404 si
no) y valida los campos antes de llamar al repositorio.

## Requisitos

Node.js 20 o superior. Sin base de datos.

## Instalacion y ejecucion

```bash
npm install
npm start
```

| Script        | Descripcion                                        |
| ------------- | -------------------------------------------------- |
| `npm start`   | Levanta el servidor en http://localhost:3005       |
| `npm run dev` | Igual pero con recarga automatica (`node --watch`) |

El puerto se puede cambiar con la variable `PORT`.

## Endpoints

| Metodo | Ruta              | Descripcion                        |
| ------ | ----------------- | ----------------------------------- |
| GET    | `/health`         | Comprueba que el servidor vive      |
| GET    | `/api`            | Lista los recursos disponibles      |
| GET    | `/api/ligas`      | Lista las ligas                     |
| GET    | `/api/ligas/:id`  | Busca una liga por id                 |
| GET    | `/api/estadios`   | Lista los estadios                  |
| GET    | `/api/estadios/:id` | Busca un estadio por id              |
| GET    | `/api/clubes`     | Lista los clubes                    |
| GET    | `/api/clubes/:id` | Busca un club por id                  |
| POST   | `/api/clubes`     | Crea un club                        |
| PATCH  | `/api/clubes/:id` | Edita un club (parcial)             |
| DELETE | `/api/clubes/:id` | Borra un club                       |

Ligas y estadios son de solo lectura, el unico recurso con CRUD completo
es `clubes`.

### Campos de un club

- `name`: texto obligatorio.
- `city`: texto obligatorio.
- `founded`: numero (anio) mayor o igual a 1900.

En `PATCH` cualquiera de los tres campos es opcional, pero si viene se
valida igual que en la creacion.

## Ejemplos

Ver que recursos hay:

```bash
curl.exe http://localhost:3005/api
```

```json
{ "ok": true, "resources": ["/api/ligas", "/api/estadios", "/api/clubes"] }
```

Crear un club:

```bash
curl.exe -X POST http://localhost:3005/api/clubes -H "Content-Type: application/json" -d "{\"name\":\"Union Deportiva\",\"city\":\"Antigua\",\"founded\":2012}"
```

```json
{
  "ok": true,
  "data": { "id": 3, "name": "Union Deportiva", "city": "Antigua", "founded": 2012 }
}
```

Editar un club:

```bash
curl.exe -X PATCH http://localhost:3005/api/clubes/3 -H "Content-Type: application/json" -d "{\"city\":\"Ciudad de Guatemala\"}"
```

```json
{
  "ok": true,
  "data": { "id": 3, "name": "Union Deportiva", "city": "Ciudad de Guatemala", "founded": 2012 }
}
```

Borrar un club:

```bash
curl.exe -X DELETE http://localhost:3005/api/clubes/3
```

Responde `204` sin cuerpo.

## Casos de error

Datos invalidos (400):

```bash
curl.exe -X POST http://localhost:3005/api/clubes -H "Content-Type: application/json" -d "{\"name\":\"\",\"city\":\"\",\"founded\":1800}"
```

```json
{
  "ok": false,
  "message": "Datos invalidos",
  "errors": [
    "name es obligatorio",
    "city es obligatorio",
    "founded debe ser un numero mayor o igual a 1900"
  ]
}
```

Club que no existe (404):

```bash
curl.exe -X DELETE http://localhost:3005/api/clubes/50
```

```json
{ "ok": false, "message": "No existe el club con id 50" }
```

Recurso que no existe (404):

```bash
curl.exe http://localhost:3005/api/maps
```

```json
{ "ok": false, "message": "La ruta /api/maps no existe" }
```

## Notas

Los datos viven en memoria, al reiniciar el servidor vuelven a los del
repositorio inicial.
