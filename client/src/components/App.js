import React from 'react';
import {Route, Switch} from 'react-router-dom'
import About from './about'
import Login from './registerLogin'
 
function App() {
  return (

    <div className="App">
      <Switch>
        {/* <Route path="/" component={Home} /> */}
        <Route path="/about" component={About} /> 
        <Route path="/login" component={Login} /> 
      </Switch>
    </div>
  );
}

export default App;
