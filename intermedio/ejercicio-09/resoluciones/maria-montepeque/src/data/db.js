// datos en memoria de los tres recursos
const categorias = [
    { id: 1, name: "ligero" },
    { id: 2, name: "medio" },
    { id: 3, name: "pesado" }
];

const gimnasios = [
    { id: 1, name: "Dragon Fight Club", city: "Guatemala" },
    { id: 2, name: "Iron Kick Gym", city: "Antigua" }
];

const luchadores = [
    { id: 1, name: "Marco Tum", categoryId: 1, gymId: 1, wins: 12 },
    { id: 2, name: "Sofia Reyes", categoryId: 2, gymId: 1, wins: 9 },
    { id: 3, name: "Hugo Pana", categoryId: 3, gymId: 2, wins: 15 },
    { id: 4, name: "Carla Ixim", categoryId: 1, gymId: 2, wins: 7 },
    { id: 5, name: "Edwin Coy", categoryId: 2, gymId: 2, wins: 11 }
];

export { categorias, gimnasios, luchadores };
