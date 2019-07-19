import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { ApolloProvider } from "react-apollo";
import { toIdValue } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import Container from "@material-ui/core/Container";
import AppBar from "./components/AppBar";
import routes from "./routes";

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      pokemon: (_, args) =>
        toIdValue(
          cache.config.dataIdFromObject({ __typename: "Pokemon", id: args.id })
        ),
    }
  }
});

const client = new ApolloClient({
  cache,
  uri: GRAPHQL_ENDPOINT
});

function App() {
  return (
    <React.Fragment>
      <Router>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <div>
              <AppBar />
              <Container>
                {routes.map((route, idx) => (
                  <Route key={idx} {...route} />
                ))}
              </Container>
            </div>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
