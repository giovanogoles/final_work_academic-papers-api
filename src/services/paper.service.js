import Paper from '../models/paper.model.js';

// Criar novo paper
const createPaper = async (data) => {
  const paper = new Paper(data);
  return await paper.save();
};

// Listar todos os papers
const getAllPapers = async () => {
  return await Paper.find();
};

// Buscar por ID
const getPaperById = async (id) => {
  return await Paper.findById(id);
};

// Atualizar por ID
const updatePaper = async (id, data) => {
  return await Paper.findByIdAndUpdate(id, data, { new: true });
};

// Deletar por ID
const deletePaper = async (id) => {
  return await Paper.findByIdAndDelete(id);
};

export default {
  createPaper,
  getAllPapers,
  getPaperById,
  updatePaper,
  deletePaper
};