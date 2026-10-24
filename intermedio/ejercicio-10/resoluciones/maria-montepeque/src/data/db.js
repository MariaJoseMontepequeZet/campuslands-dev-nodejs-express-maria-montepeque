// datos en memoria de los tres recursos
const clubes = [
    { id: 1, name: "Spin Masters", city: "Guatemala" },
    { id: 2, name: "Topspin Club", city: "Xela" }
];

const torneos = [
    { id: 1, name: "Copa Primavera", year: 2025 },
    { id: 2, name: "Abierto Nacional", year: 2026 }
];

const jugadores = [
    { id: 1, name: "Diego Ajpop", clubId: 1, ranking: 3, wins: 22 },
    { id: 2, name: "Lucia Mex", clubId: 2, ranking: 1, wins: 30 },
    { id: 3, name: "Pablo Say", clubId: 1, ranking: 5, wins: 15 },
    { id: 4, name: "Renata Us", clubId: 2, ranking: 2, wins: 28 }
];

export { clubes, torneos, jugadores };
