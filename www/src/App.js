import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from '@material-ui/core/Container';
import AppBar from './components/AppBar';
import routes from './routes';

function App() {
  return (
    <div>
      <Router>
        <div>
          <AppBar />
          <Container>
            {routes.map((route, idx) => (
              <Route {...route} />
            ))}
          </Container>
        </div>
      </Router>
    </div>
  );
}

export default App;
