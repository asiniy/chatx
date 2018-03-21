import React from 'react';
import { isNil } from 'lodash';
import PropTypes from 'prop-types';

import { wrap } from '../utils';
import Loading from '../components/Loading'

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
    // console.log(this.props.actions.push);
    const { actions: { push } } = this.props

    const token = localStorage.getItem('token');

    if (isNil(token)) {
      this.setState({ user: USER_IS_GUEST });
      push('/sign_in')
      return
    }

    fetch('http://localhost:3000/api/users/me', { method: 'GET' })
      .then((data) => {
        this.setState({ user: data })
        push('/chat');
      // TODO .then((user) => {
        // mapDispatchToProps - определять функции
        // redux-thunk попробуй реализовать
        // const { setUser } = this.props
      //  setUser(user)
      })
      .catch((data) => {
        console.log(data);
        // this.setState({ user: USER_IS_GUEST });
        push('/sign_in');
        // hashHistory.push('/chat');
      })
  }

  onSignOut() {
    const { actions: { push } } = this.props;
    localStorage.removeItem('token');
    push('/sign_in');
  }

  onSignIn(user) {
    const { actions: { push } } = this.props;
    localStorage.setItem('token', user.token);
    this.setState({ user });
    push('/chat');
  }

  render() {
    const { user } = this.state;

    const childWithProp = React.Children.map(
      this.props.children,
      child => React.cloneElement(child, { onSignIn: this.onSignIn, onSignOut: this.onSignOut }),
    );

    if (user === NO_INFO_ABOUT_USER) {
      return (<Loading />)
    }

    return childWithProp[0];
  }
}

export default wrap()(WrappedApp);

WrappedApp.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};
