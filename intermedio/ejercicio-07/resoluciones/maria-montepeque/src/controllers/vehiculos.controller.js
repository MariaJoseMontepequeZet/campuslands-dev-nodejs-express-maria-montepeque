import catchAsync from "../utils/catch-async.js";
import * as vehiculosService from "../services/vehiculos.service.js";

const listVehiculos = catchAsync(async (req, res) => {
    const data = vehiculosService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getVehiculo = catchAsync(async (req, res) => {
    const vehiculo = vehiculosService.findById(Number(req.params.id));
    res.json({ ok: true, data: vehiculo });
});

export { listVehiculos, getVehiculo };
