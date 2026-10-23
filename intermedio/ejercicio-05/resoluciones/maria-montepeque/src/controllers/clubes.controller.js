import catchAsync from "../utils/catch-async.js";
import * as clubesService from "../services/clubes.service.js";

const listClubes = catchAsync(async (req, res) => {
    const data = clubesService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getClub = catchAsync(async (req, res) => {
    const club = clubesService.findById(Number(req.params.id));
    res.json({ ok: true, data: club });
});

const createClub = catchAsync(async (req, res) => {
    const club = clubesService.create(req.body);
    res.status(201).json({ ok: true, data: club });
});

const updateClub = catchAsync(async (req, res) => {
    const club = clubesService.update(Number(req.params.id), req.body);
    res.json({ ok: true, data: club });
});

const deleteClub = catchAsync(async (req, res) => {
    clubesService.remove(Number(req.params.id));
    res.status(204).send();
});

export { listClubes, getClub, createClub, updateClub, deleteClub };
