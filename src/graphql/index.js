import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import paperSchema from './schemas/paper.schema';
import paperResolvers from './resolvers/paper.resolvers';
import authMiddleware from '../middlewares/auth.middleware';

const app = express();

const schema = makeExecutableSchema({
  typeDefs: paperSchema,
  resolvers: paperResolvers,
});

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = authMiddleware.verifyToken(token);
    return { user };
  },
});

server.applyMiddleware({ app });

export default app;