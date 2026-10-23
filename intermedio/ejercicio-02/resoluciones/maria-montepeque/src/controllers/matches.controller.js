import * as matchesService from "../services/matches.service.js";

function listMatches(req, res) {
    const data = matchesService.findAll();
    res.json({ ok: true, total: data.length, data });
}

function getMatch(req, res) {
    const match = matchesService.findById(Number(req.params.id));

    if (!match) {
        return res.status(404).json({ ok: false, message: `No existe la partida con id ${req.params.id}` });
    }

    res.json({ ok: true, data: match });
}

export { listMatches, getMatch };
