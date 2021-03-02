import React, { useEffect } from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './comp/Landing';
import SignUp from './comp/SignUp';
import Home from './comp/Home';
import Settings from './comp/Settings';
import AllSugg from './comp/AllSugg';
import axios from './axios'
import { useStateValue } from "./comp/StateProvider";
import User from './comp/User';

function App() {

  const [ state , dispatch] = useStateValue();

  useEffect(() => {
    const getUsers = axios.get('/user')
    .then((res) => {
        dispatch({
          type: "SET__USERS",
          users: res.data
        })
    })
    return getUsers
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/profile">
            <User />
          </Route>
          <Route path="/allsugg">
            <AllSugg />
          </Route>
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
