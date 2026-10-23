import { Router } from "express";
import { listTalleres, getTaller } from "../controllers/talleres.controller.js";

const router = Router();

router.get("/", listTalleres);
router.get("/:id", getTaller);

export default router;
