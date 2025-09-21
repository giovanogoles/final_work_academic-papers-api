import Paper from '../models/paper.model';
import User from '../models/user.model';

// Create a new paper submission
export const createPaper = async (req, res) => {
  try {
    const { title, abstract, authors, keywords } = req.body;
    const paper = new Paper({ title, abstract, authors, keywords, submittedBy: req.user.id });
    await paper.save();
    res.status(201).json({ message: 'Paper submitted successfully', paper });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while submitting the paper' });
  }
};

// Retrieve all paper submissions
export const getAllPapers = async (req, res) => {
  try {
    const papers = await Paper.find().populate('submittedBy', 'username');
    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving papers' });
  }
};

// Retrieve a specific paper submission by ID
export const getPaperById = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id).populate('submittedBy', 'username');
    if (!paper) {
      return res.status(404).json({ error: 'Paper not found' });
    }
    res.status(200).json(paper);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the paper' });
  }
};

// Delete a paper submission
export const deletePaper = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ error: 'Paper not found' });
    }
    await paper.remove();
    res.status(200).json({ message: 'Paper deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the paper' });
  }
};