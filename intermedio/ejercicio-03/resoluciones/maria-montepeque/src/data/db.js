// datos en memoria de los tres recursos
const heroes = [
    { id: 1, name: "Ignis", role: "mage", winRate: 52.3 },
    { id: 2, name: "Boulder", role: "tank", winRate: 48.9 },
    { id: 3, name: "Shade", role: "assassin", winRate: 55.1 }
];

const teams = [
    { id: 1, name: "Thunder Wolves", region: "LATAM", ranking: 3 },
    { id: 2, name: "Iron Phoenix", region: "EU", ranking: 1 }
];

const tournaments = [
    { id: 1, name: "Spring Clash", region: "LATAM", prizePool: 15000 }
];

export { heroes, teams, tournaments };
