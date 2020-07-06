import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import MovieList from './components/MovieList';
import NewMovieForm from './components/NewMovieForm';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <NewMovieForm />
      <MovieList />
    </div>
  </ApolloProvider>
);

export default App;