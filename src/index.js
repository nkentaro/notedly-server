// index.js
// This is the main entry point of our application

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const db = require('./db');
const models = require('./models');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  },
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  },
  type Mutation {
    newNote(content: String!): Note!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
    notes: async () => {
      return await models.note.find();
    },
    note: async (parent, args) => {
      return await models.note.findById(args.id);
    }
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.note.create({
        content: args.content,
        author: 'Kentaro Nakamaye'
      });
    }
  }
};

const app = express();

// connect to the database
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollow GraphQL middlewware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

// app.get('/', (req, res) => res.send('Hello, Web Server!!!'));

app.listen(port, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
