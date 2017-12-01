import React from 'react';
import ReactDOM from 'react-dom';
import { isNil } from 'lodash'; // {is Nil}
import SignIn from './components/SignIn';
import Chat from './components/Chat';
import { fetch } from './components/utils'
import styles from './styles.css'
// TODO find enum lib for js

const NO_INFO_ABOUT_USER = 1;
// const USER_SIGNED_IN = 2;
const USER_IS_GUEST = 3;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: NO_INFO_ABOUT_USER,
    }

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    const token = localStorage.getItem('token');

    if (isNil(token)) {
      this.setState({ user: USER_IS_GUEST });

      return
    }

    fetch('http://localhost:3000/api/users/me', { method: 'GET', params: {} }).then((data) => {
      if (!data) {
        return;
      }
      this.setState({ user: data })
    });
  }

  onSignOut() {
    this.setState({ user: USER_IS_GUEST });
    localStorage.removeItem('token');
  }

  onSignIn(data) {
    this.setState({ user: data }, () => {
      localStorage.setItem('token', this.state.user.token);
      console.log('onSignIn...'); // eslint-disable-line
      console.log(this.state.user); // eslint-disable-line
    });
  }


  render() {
    const { user } = this.state;
    if (user === NO_INFO_ABOUT_USER) {
      return (<img className="loading-img" src="./img/loading.gif" alt="loading" />)
    } // TODO circles

    if (user === USER_IS_GUEST) {
      return (<SignIn
        onSignIn={this.onSignIn}
      />);
    }

    return (<Chat
      user={user}
      onSignOut={this.onSignOut}
    />);
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
