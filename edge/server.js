const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');
const pokemonService = require('./services/pokemon');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: () => ({
    service: {
      pokemon: pokemonService,
    },
  }),
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)