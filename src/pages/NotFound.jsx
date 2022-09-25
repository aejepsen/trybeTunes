import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <Router>
        <div data-testid="page-not-found"> </div>
      </Router>
    );
  }
}

export default NotFound;
