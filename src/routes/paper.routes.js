import express from 'express';
import * as paperController from '../controllers/paper.controller.js';

const router = express.Router();

// Criar novo paper
router.post('/', paperController.createPaper);

// Listar todos os papers
router.get('/', paperController.getPapers);

// Buscar paper por ID
router.get('/:id', paperController.getPaperById);

// Atualizar paper por ID
router.put('/:id', paperController.updatePaper);

// Deletar paper por ID
router.delete('/:id', paperController.deletePaper);

export default router;