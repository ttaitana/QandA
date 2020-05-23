import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './components/landing'
import Navbar from './components/navbar'
import MainApp from './components/create'
import { Route, Switch } from 'react-router-dom'
import firebase from "firebase";


class App extends React.Component {
  constructor(props){
    super(props)
    const firebaseConfig = {
      apiKey: "AIzaSyBrha5KfHr4mo1vzOUWVkyd_M0oxY_FmvI",
      authDomain: "qanda-83e31.firebaseapp.com",
      databaseURL: "https://qanda-83e31.firebaseio.com",
      projectId: "qanda-83e31",
      storageBucket: "qanda-83e31.appspot.com",
      messagingSenderId: "1017222434",
      appId: "1:1017222434:web:0a6d237663eb465caf417b",
      measurementId: "G-KF4K906LZJ"
    };
    firebase.initializeApp(firebaseConfig);
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/event" render={props => <MainApp {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
