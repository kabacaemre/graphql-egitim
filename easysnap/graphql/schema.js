const { loadFile, loadFiles } = require('graphql-import-files');

// load many files
//const typeDefs = loadFiles('./graphql/types/*.{graphql,gql}');

// load single file
const typeDefs = loadFile('./graphql/types/user.graphql');

module.exports = typeDefs;