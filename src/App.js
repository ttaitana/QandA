import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './components/landing'
import Navbar from './components/navbar'
import MainApp from './components/create'
import { Route, Switch } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/event" render={props => <MainApp {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
