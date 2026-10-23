import catchAsync from "../utils/catch-async.js";
import * as zonesService from "../services/zones.service.js";

const listZones = catchAsync(async (req, res) => {
    const data = zonesService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getZone = catchAsync(async (req, res) => {
    const zone = zonesService.findById(Number(req.params.id));
    res.json({ ok: true, data: zone });
});

export { listZones, getZone };
