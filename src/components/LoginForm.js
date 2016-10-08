import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
    message: {
      error: false,
      text: ''
    }
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ message: { error: false, text: '' }, loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.onLoginSuccess())
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => this.onAccountCreation())
          .catch(() => this.onLoginFailed());
      });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      message: { text: 'Authentication Success.' }
    });
  }

  onAccountCreation() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      message: { text: 'Account Created for you ;)' }
    });
  }

  onLoginFailed() {
    this.setState({
      password: '',
      loading: false,
      message: {
        error: true,
        text: 'Authentication Failed.'
      }
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Input
            label="Email"
            placeholder="example@example.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Password"
            secureTextEntry
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text
          style={
            this.state.message.error ?
            styles.errorTextStyle :
            styles.successTextStyle
          }
        >
          {this.state.message.text}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  successTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'green'
  }
};

export default LoginForm;
