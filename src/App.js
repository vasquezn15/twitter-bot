import './App.css';
import {React} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home';

function App() {

  <Link to='./Components/Home'>
    
  </Link>

  return (
      <Router>
        <Switch>
          <Route exact path='/'>
              <Home />
          </Route>
          <Route path='/auth'>
              
          </Route>
        </Switch>
      </Router>
    );
  }

export default App;
