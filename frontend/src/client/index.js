import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, hashHistory } from 'react-router';
import { isNil } from 'lodash';

import SignIn from '../pages/SignIn';
import Loading from '../components/Loading'
import Chat from '../pages/Chat';

const NO_INFO_ABOUT_USER = 1;
const USER_IS_GUEST = 3;

class WrappedApp extends React.Component {
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
      // TODO push('/sign_in')
      return
    }

    fetch('http://localhost:3000/api/users/me', { method: 'GET' })
      .then((data) => {
        this.setState({ user: data })
      // TODO .then((user) => {
        // mapDispatchToProps - определять функции
        // redux-thunk попробуй реализовать
        // const { setUser } = this.props
      //  setUser(user)
      })
      .catch((data) => {
        console.log(data);
        this.setState({ user: USER_IS_GUEST });
        // TODO push('/chat') // посылать
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
    // TODO const { user } = this.props
    const { user } = this.state;
    if (user === NO_INFO_ABOUT_USER) {
      return (<Loading />)
    }

    // TODO render children // посмотри как react-router выводит детей

    if (user === USER_IS_GUEST) {
      // TODO push("/sign_in")
      return (<SignIn
        onSignIn={this.onSignIn}
      />);
    }
    // TODO push("/chat")
    return (<Chat
      onSignOut={this.onSignOut}
    />);
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={WrappedApp}>
      <Route path="/sign_in" component={SignIn} />
      <Route path="/chat" component={Chat} />
    </Route>
  </Router>,
  document.getElementById('root'),
);

export default WrappedApp;
