import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from '../pages/login'
import Register from '../pages/register'
import Home from '../pages/home'
import NotFound from '../pages/notFound'

import './App.css';
import editData from '../pages/editForm';
import changePassword from '../pages/changePassword';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/home/:username' component={Home} />
            <Route path='/editData/:username' component={editData} />
            <Route path='/changePassword' component={changePassword} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
