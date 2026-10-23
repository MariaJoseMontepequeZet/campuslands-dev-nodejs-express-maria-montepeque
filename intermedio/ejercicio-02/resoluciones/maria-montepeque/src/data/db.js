// datos en memoria de los tres recursos
const players = [
    { id: 1, nickname: "Vortex", team: "Nova", kd: 1.84 },
    { id: 2, nickname: "Lyra", team: "Nova", kd: 1.21 },
    { id: 3, nickname: "Tanque", team: "Delta", kd: 0.97 }
];

const weapons = [
    { id: 1, name: "Falcon AR", type: "rifle", damage: 33 },
    { id: 2, name: "Viper SMG", type: "smg", damage: 24 },
    { id: 3, name: "Longshot", type: "sniper", damage: 95 }
];

const matches = [
    { id: 1, map: "Puerto", mode: "search", score: "13-9", winner: "Nova" },
    { id: 2, map: "Refineria", mode: "domination", score: "200-187", winner: "Delta" }
];

export { players, weapons, matches };
