// el arreglo vive solo aqui, nadie de afuera lo toca directo
const ligas = [
    { id: 1, name: "Liga Nacional", country: "Guatemala" },
    { id: 2, name: "Primera Division", country: "Costa Rica" }
];

function findAll() {
    return ligas;
}

function findById(id) {
    return ligas.find((liga) => liga.id === id);
}

export { findAll, findById };
