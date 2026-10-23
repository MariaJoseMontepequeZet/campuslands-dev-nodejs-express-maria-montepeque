import { Router } from "express";
import { listHeroes, getHero } from "../controllers/heroes.controller.js";

const router = Router();

router.get("/", listHeroes);
router.get("/:id", getHero);

export default router;
