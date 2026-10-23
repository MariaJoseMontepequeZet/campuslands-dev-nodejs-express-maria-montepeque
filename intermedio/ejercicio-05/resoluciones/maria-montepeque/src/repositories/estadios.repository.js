const estadios = [
    { id: 1, name: "Estadio Central", capacity: 18000 },
    { id: 2, name: "Cancha Techada", capacity: 4000 }
];

function findAll() {
    return estadios;
}

function findById(id) {
    return estadios.find((estadio) => estadio.id === id);
}

export { findAll, findById };
