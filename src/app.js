import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import config from '../config';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  componentWillMount() { // Before component is create
    firebase.initializeApp(config);
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        <LoginForm />
      </View>
    );
  }
}

export default App;
