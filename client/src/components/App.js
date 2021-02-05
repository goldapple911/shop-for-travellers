import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import AboutPage from './about'
import LandingPage from './LandingPage/LandingPage'
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage'
import Auth from '../hoc/auth'

 
function App() {
  return (
    <Router>
        <div className="App">

            <Switch>
              {/* <Route path="/" component={Home} /> */}
              <Route exact path="/" component={Auth(LandingPage, null )} />
              <Route exact path="/about" component={Auth(AboutPage, null )} /> 
              <Route exact path="/login" component={Auth(LoginPage, false )} /> 
              <Route export path ="/register" component={Auth(RegisterPage, false )} />
            </Switch>
        
        </div>
      </Router>
  );
}

export default App;
