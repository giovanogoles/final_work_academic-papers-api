import { gql } from 'apollo-server-express';

const paperSchema = gql`
  type Paper {
    id: ID!
    title: String!
    abstract: String!
    authors: [String!]!
    keywords: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getPapers: [Paper!]!
    getPaper(id: ID!): Paper
  }

  type Mutation {
    createPaper(title: String!, abstract: String!, authors: [String!]!, keywords: [String!]!): Paper!
    deletePaper(id: ID!): String!
  }
`;

export default paperSchema;