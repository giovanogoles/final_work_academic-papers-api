import express from 'express';
import {
  createPaper,
  getPapers,
  getPaperById,
  updatePaper,
  deletePaper,
} from '../controllers/paper.controller.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Criar artigo (apenas usuários autenticados)
router.post('/', authenticate, createPaper);

// Listar todos os artigos
router.get('/', getPapers);

// Buscar artigo por ID
router.get('/:id', getPaperById);

// Atualizar artigo (apenas autenticado)
router.put('/:id', authenticate, updatePaper);

// Deletar artigo (apenas autenticado e com role "teacher" ou "evaluator")
router.delete('/:id', authenticate, authorizeRoles('teacher', 'evaluator'), deletePaper);

export default router;