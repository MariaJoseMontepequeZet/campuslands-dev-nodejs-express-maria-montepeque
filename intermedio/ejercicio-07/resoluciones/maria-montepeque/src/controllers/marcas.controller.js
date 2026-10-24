import catchAsync from "../utils/catch-async.js";
import * as marcasService from "../services/marcas.service.js";

const listMarcas = catchAsync(async (req, res) => {
    const data = marcasService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getMarca = catchAsync(async (req, res) => {
    const marca = marcasService.findById(Number(req.params.id));
    res.json({ ok: true, data: marca });
});

export { listMarcas, getMarca };
