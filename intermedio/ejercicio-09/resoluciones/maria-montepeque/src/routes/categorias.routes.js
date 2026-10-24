import { Router } from "express";
import { listCategorias, getCategoria } from "../controllers/categorias.controller.js";

const router = Router();

router.get("/", listCategorias);
router.get("/:id", getCategoria);

export default router;
