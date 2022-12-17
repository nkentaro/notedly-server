// index.js
// This is the main entry point of our application

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

// local module imports
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// run our server
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    // Add the db models to the context
    return { models };
  }
});

// Apply the Apollow GraphQL middlewware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

// app.get('/', (req, res) => res.send('Hello, Web Server!!!'));

app.listen(port, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
