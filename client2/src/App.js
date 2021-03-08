import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import React from 'react';

const App = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
      <Router>
        <Switch >
          <Route path='/' exact component={Home}/>
          </Switch>
          </Router>
          </div>
          </div>          
  )
}
export default App;