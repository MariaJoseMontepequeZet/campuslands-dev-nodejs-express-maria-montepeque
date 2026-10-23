import { players } from "../data/db.js";

const TEAMS = ["Nova", "Delta", "Kappa"];

function findAll() {
    return players;
}

function findById(id) {
    return players.find((player) => player.id === id);
}

function validate(body = {}) {
    const errors = [];

    if (typeof body.nickname !== "string" || body.nickname.trim() === "") {
        errors.push("nickname es obligatorio");
    }

    if (!TEAMS.includes(body.team)) {
        errors.push(`team debe ser uno de: ${TEAMS.join(", ")}`);
    }

    if (typeof body.kd !== "number" || body.kd < 0) {
        errors.push("kd debe ser un numero mayor o igual a 0");
    }

    return errors;
}

function create(body) {
    const lastId = players.reduce((max, player) => Math.max(max, player.id), 0);

    const player = {
        id: lastId + 1,
        nickname: body.nickname.trim(),
        team: body.team,
        kd: body.kd
    };

    players.push(player);
    return player;
}

export { findAll, findById, validate, create };
