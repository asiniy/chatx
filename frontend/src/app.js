import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './components/SignIn';
import Chat from './components/Chat';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    }

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }

  onSignOut() {
    this.setState({ user: null });
  }

  showError(error) {
    console.log(error);
  }

  onSignIn(data) {
    if (data.id === undefined) {
      showError(data);
    } else {
      this.setState({ user: data }, () => {
        localStorage.setItem('token', this.state.user.token);
      });
    }
  }

  render() {
    const { user } = this.state;
    if (user) { // if isNil return signIn lodash
      return (<Chat
        user={user}
        onSignOut={this.onSignOut}
      />);
    }
    return (<SignIn
      onSignIn={this.onSignIn}
    />);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
