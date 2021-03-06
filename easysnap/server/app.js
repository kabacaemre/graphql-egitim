const http = require("http");
const express = require('express');
const { ApolloServer, PubSub } = require('apollo-server-express');
const jwt = require("jsonwebtoken");

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
const Snap = require('./models/Snap');

//Types
const typeDefs  = require('./graphql/schema');

//Resolvers
const resolvers = require('./graphql/resolvers');

//PubSub
const pubsub = new PubSub();

//ApolloServer
const server = new ApolloServer({
	typeDefs,
	resolvers,
    context: ({ req }) => ({
		User,
		Snap,
		pubsub,
		activeUser: req ? req.activeUser : null
	})
});

// auth middleware
app.use(async (req, res, next) => {
	const token = req.headers["authorization"];

	if (token && token !== null) {
		try {
			const activeUser = await jwt.verify(token, process.env.SECRET_KEY);
			req.activeUser = activeUser;
			console.log(token, activeUser);
		} catch (error) {
			console.error(error);
		}
	}

	next();
});

// applying express app to the apollo server
server.applyMiddleware({
	app,
	cors: { origin: true, credentials: true }
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4001 }, () =>
  console.log(`Server ready at http://localhost:4001${server.graphqlPath}`)
)