import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { isNil } from 'lodash'; // {is Nil}
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { push } from 'react-router-redux'

import { fetch } from './utils';
// import SignIn from './containers/SignIn';
// import Chat from './containers/Chat';
import Loading from './components/Loading';

// TODO find enum lib for js

const NO_INFO_ABOUT_USER = 1;
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
      push('/sign_in')
      return
    }

    fetch('http://localhost:3000/api/users/me', { method: 'GET' })
      .then((user) => {
        // mapDispatchToProps - определять функции
        // redux-thunk попробуй реализовать
        // const { setUser } = this.props
        setUser(user)

      })
      .catch((data) => {
        this.setState({ user: USER_IS_GUEST });
        push('/chat') // посылать
      })
  }

  onSignOut() {
    this.setState({ user: USER_IS_GUEST });
    localStorage.removeItem('token');
  }

  onSignIn(user) {
    localStorage.setItem('token', user.token);
    this.setState({ user });
  }


  render() {
    // mapDispatchToProps = (state, dispatch) => ({ push: dispatch(push) })
    // mapStateToProps => (state) => ({ user: state.user })
    const { user } = this.props
    // const { user } = this.state;
    if (user === NO_INFO_ABOUT_USER) {
      return (<Loading />)
    }

    render children // посмотри как react-router выводит детей

    if (user === USER_IS_GUEST) {
      push("/sign_in")
    }

    push("/chat")
    // return (<Chat
    //   user={user}
    //   onSignOut={this.onSignOut}
    // />);
  }
}

export default connect(App)(mapStateToProps, mapDispatchToProps)
