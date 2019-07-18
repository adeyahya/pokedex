import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import queryString from 'query-string';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ApolloProvider } from "react-apollo";
import Container from '@material-ui/core/Container';
import AppBar from './components/AppBar';
import routes from './routes';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
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
                  <Route {...route} />
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
