const express = require('express');
const { ApolloServer } = require('apollo-server-express');

//Express
const app = express();

// Environment Variables
const dotenv = require('dotenv');
dotenv.config({path: "./config/env/config.env"});

// MongoDB Connection
const connectDatabase = require('./helpers/db.js');
connectDatabase();

// models
const User = require('./models/User');

//Types
const typeDefs  = require('./graphql/schema');

//Resolvers
const resolvers = require('./graphql/resolvers');

//ApolloServer
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		User
	}
});
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
  console.log(`Server ready at http://localhost:4001${server.graphqlPath}`)
)