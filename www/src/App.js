import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import routes from './routes';

function App() {
  return (
    <div>
      <Router>
        {routes.map((route, idx) => (
          <Route {...route} />
        ))}
      </Router>
    </div>
  );
}

export default App;
