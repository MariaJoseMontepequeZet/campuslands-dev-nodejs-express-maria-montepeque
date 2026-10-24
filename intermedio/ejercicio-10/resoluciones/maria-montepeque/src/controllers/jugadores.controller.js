import catchAsync from "../utils/catch-async.js";
import * as jugadoresService from "../services/jugadores.service.js";

const listJugadores = catchAsync(async (req, res) => {
    const data = jugadoresService.findAll(req.query);
    res.json({ ok: true, total: data.length, data });
});

const getJugador = catchAsync(async (req, res) => {
    const jugador = jugadoresService.findById(Number(req.params.id));
    res.json({ ok: true, data: jugador });
});

export { listJugadores, getJugador };
