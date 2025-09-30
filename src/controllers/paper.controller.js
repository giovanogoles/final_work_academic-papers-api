import paperService from '../services/paper.service.js';

// Criar novo paper
export const createPaper = async (req, res) => {
  try {
    const paper = await paperService.createPaper(req.body);
    return res.status(201).json({
      message: 'Paper created successfully',
      paper
    });
  } catch (error) {
    console.error('Error creating paper:', error);
    return res.status(500).send('Internal Server Error');
  }
};

// Listar todos os papers
export const getPapers = async (req, res) => {
  try {
    const papers = await paperService.getAllPapers();
    return res.status(200).json(papers);
  } catch (error) {
    console.error('Error retrieving papers:', error);
    return res.status(500).send('Internal Server Error');
  }
};

// Buscar paper por ID
export const getPaperById = async (req, res) => {
  try {
    const paper = await paperService.getPaperById(req.params.id);
    if (!paper) {
      return res.status(404).send('Paper not found');
    }
    return res.status(200).json(paper);
  } catch (error) {
    console.error('Error retrieving paper:', error);
    return res.status(500).send('Internal Server Error');
  }
};

// Atualizar paper por ID
export const updatePaper = async (req, res) => {
  try {
    const paper = await paperService.updatePaper(req.params.id, req.body);
    if (!paper) {
      return res.status(404).send('Paper not found');
    }
    return res.status(200).json({ message: 'Paper updated successfully', paper });
  } catch (error) {
    console.error('Error updating paper:', error);
    return res.status(500).send('Internal Server Error');
  }
};

// Deletar paper por ID
export const deletePaper = async (req, res) => {
  try {
    const paper = await paperService.deletePaper(req.params.id);
    if (!paper) {
      return res.status(404).send('Paper not found');
    }
    return res.status(200).json({ message: 'Paper deleted successfully' });
  } catch (error) {
    console.error('Error deleting paper:', error);
    return res.status(500).send('Internal Server Error');
  }
};