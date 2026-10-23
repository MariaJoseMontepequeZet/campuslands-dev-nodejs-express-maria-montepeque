import catchAsync from "../utils/catch-async.js";
import * as tournamentsService from "../services/tournaments.service.js";

const listTournaments = catchAsync(async (req, res) => {
    const data = tournamentsService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getTournament = catchAsync(async (req, res) => {
    const tournament = tournamentsService.findById(Number(req.params.id));
    res.json({ ok: true, data: tournament });
});

const createTournament = catchAsync(async (req, res) => {
    const tournament = tournamentsService.create(req.body);
    res.status(201).json({ ok: true, data: tournament });
});

export { listTournaments, getTournament, createTournament };
