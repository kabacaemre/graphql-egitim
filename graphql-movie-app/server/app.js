const express = require ('express');
const cors = require('cors');
const expressGraphQL = require('express-graphql');

const schema = require('./schema/schema');

const app = express();
app.use(cors());

// Environment Variables
const dotenv = require('dotenv');
dotenv.config({path: "./config/env/config.env"});

const PORT = process.env.PORT;

// MongoDB Connection
const connectDatabase = require('./helpers/db.js');
connectDatabase();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.listen(PORT, () => console.log(`Server is running... http://localhost:${PORT}`));