import * as playersService from "../services/players.service.js";

function listPlayers(req, res) {
    const data = playersService.findAll();
    res.json({ ok: true, total: data.length, data });
}

function getPlayer(req, res) {
    const player = playersService.findById(Number(req.params.id));

    if (!player) {
        return res.status(404).json({ ok: false, message: `No existe el jugador con id ${req.params.id}` });
    }

    res.json({ ok: true, data: player });
}

function createPlayer(req, res) {
    const errors = playersService.validate(req.body);

    if (errors.length > 0) {
        return res.status(400).json({ ok: false, message: "Datos invalidos", errors });
    }

    const player = playersService.create(req.body);
    res.status(201).json({ ok: true, data: player });
}

export { listPlayers, getPlayer, createPlayer };
