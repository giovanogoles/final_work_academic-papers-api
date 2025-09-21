import Paper from '../models/paper.model';

export const createPaper = async (paperData) => {
  const paper = new Paper(paperData);
  return await paper.save();
};

export const getAllPapers = async () => {
  return await Paper.find();
};

export const getPaperById = async (id) => {
  return await Paper.findById(id);
};

export const updatePaper = async (id, paperData) => {
  return await Paper.findByIdAndUpdate(id, paperData, { new: true });
};

export const deletePaper = async (id) => {
  return await Paper.findByIdAndDelete(id);
};