// datos en memoria de los tres recursos
const zones = [
    { id: 1, name: "Zona Norte", radius: 450 },
    { id: 2, name: "Zona Centro", radius: 300 },
    { id: 3, name: "Zona Sur", radius: 180 }
];

const squads = [
    { id: 1, name: "Lobos Nocturnos", members: 3 },
    { id: 2, name: "Aguilas de Hierro", members: 4 }
];

const drops = [
    { id: 1, item: "Escudo nivel 2", rarity: "raro", zoneId: 1 }
];

export { zones, squads, drops };
