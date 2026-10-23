import catchAsync from "../utils/catch-async.js";
import * as dropsService from "../services/drops.service.js";

const listDrops = catchAsync(async (req, res) => {
    const data = dropsService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getDrop = catchAsync(async (req, res) => {
    const drop = dropsService.findById(Number(req.params.id));
    res.json({ ok: true, data: drop });
});

const createDrop = catchAsync(async (req, res) => {
    const drop = dropsService.create(req.body);
    res.status(201).json({ ok: true, data: drop });
});

export { listDrops, getDrop, createDrop };
