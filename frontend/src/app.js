import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { isNil } from 'lodash'; // {is Nil}
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import pages from './reducers/pages'
import { fetch } from './utils';
import SignIn from './containers/SignIn';
import Chat from './containers/Chat';
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
      this.setState({ user: USER_IS_GUEST });
      return
    }

    fetch('http://localhost:3000/api/users/me', { method: 'GET' })
      .then((data) => {
        this.setState({ user: data })
      })
      .catch((data) => {
        console.log(data);
        this.setState({ user: USER_IS_GUEST });
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
    const { user } = this.state;
    if (user === NO_INFO_ABOUT_USER) {
      return (<Loading />)
    }

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


//const store = createStore(pages);
// <indexRoute component={SignIn} />

ReactDOM.render(
//  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="signin"component={SignIn} />
        <Route path="/chat" component={Chat} />
      </Route>
    </Router>,
//  </Provider>,
  document.getElementById('root'),
);
