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
  }

  onSignOut() {
    this.setState({ user: null });
  }

  onSignIn() {
    this.setState({ user: null });
  }

  render() {
    const { user } = this.state;

    if (user) {
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
