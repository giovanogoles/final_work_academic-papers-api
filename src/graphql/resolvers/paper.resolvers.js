import { Paper } from '../models/paper.model';
import { User } from '../models/user.model';

const paperResolvers = {
  Query: {
    papers: async () => {
      return await Paper.find();
    },
    paper: async (_, { id }) => {
      return await Paper.findById(id);
    },
  },
  Mutation: {
    submitPaper: async (_, { input }, { user }) => {
      if (!user) throw new Error('Unauthorized');

      const newPaper = new Paper({
        title: input.title,
        abstract: input.abstract,
        authors: [user.username],
        keywords: input.keywords,
      });

      await newPaper.save();
      return { message: 'Paper submitted successfully', paper: newPaper };
    },
    deletePaper: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');

      const paper = await Paper.findById(id);
      if (!paper) throw new Error('Paper not found');

      if (paper.authors.includes(user.username) || user.role === 'evaluator') {
        await Paper.findByIdAndDelete(id);
        return { message: 'Paper deleted successfully' };
      } else {
        throw new Error('Not authorized to delete this paper');
      }
    },
  },
};

export default paperResolvers;