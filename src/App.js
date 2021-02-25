import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './comp/Landing';
import SignUp from './comp/SignUp';
import Home from './comp/Home';
import Settings from './comp/Settings';


function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/sett" >
            <Settings />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
