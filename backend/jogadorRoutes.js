import express from "express";
import {
  buscarCards,
  buscarCardId,
  adicionarCard,
  atualizarCard,
  deletarCard,
} from "./jogadorController.js";

const router = express.Router();

router.get("/", buscarCards);

router.get("/:id", buscarCardId);

router.post("/", adicionarCard);

router.put("/:id", atualizarCard);

router.delete("/:id", deletarCard);

export default router;
