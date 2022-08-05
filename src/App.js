import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" component={ Home } />
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
