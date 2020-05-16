import React from 'react';

import { Route, Switch, Link } from "react-router-dom";

import {routes_addmall as routes} from '../routes'




class Dashboard extends React.Component {

  constructor() {
    super()

    let isLoggedIn = false;
    let token = localStorage.getItem('token')
    if (token){
      isLoggedIn = true
    }
    this.state = {
      isLoggedIn
    }

  }


  render() {
    if(!this.state.isLoggedIn){
      this.props.history.push('/')
    }
 
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/guidesk">OCR GUI</Link>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
           
            </div>
          </div>
        </nav>

        <Switch>
          {
            routes.map((route, index) => {
              return <Route key={index} path={route.path} component={route.component} exact />
            })
          }
        </Switch>
      </div>
    )
  }
}

export default Dashboard