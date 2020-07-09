const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { loadFile } = require('graphql-import-files');

//Express
const app = express();

// Environment Variables
const dotenv = require('dotenv');
dotenv.config({path: "./config/env/config.env"});

// MongoDB Connection
const connectDatabase = require('./helpers/db.js');
connectDatabase();

//Resolvers
const resolvers = require('./graphql/resolvers');

//ApolloServer
const server = new ApolloServer({
	typeDefs: loadFile('./graphql/types/schema.graphql'),
	resolvers
});
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
  console.log(`Server ready at http://localhost:4001${server.graphqlPath}`)
)