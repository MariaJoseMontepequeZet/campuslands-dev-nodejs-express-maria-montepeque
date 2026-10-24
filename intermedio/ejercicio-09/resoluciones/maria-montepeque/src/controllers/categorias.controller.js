import catchAsync from "../utils/catch-async.js";
import * as categoriasService from "../services/categorias.service.js";

const listCategorias = catchAsync(async (req, res) => {
    const data = categoriasService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getCategoria = catchAsync(async (req, res) => {
    const categoria = categoriasService.findById(Number(req.params.id));
    res.json({ ok: true, data: categoria });
});

export { listCategorias, getCategoria };
