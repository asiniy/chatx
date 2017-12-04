// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import PropTypes from 'prop-types';

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'vasiliy',
      password: 'secret',
      errors: [],
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const { onSignIn } = this.props;
    const { username, password } = this.state;
    e.preventDefault();
    fetch('http://localhost:3000/api/session', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    }).then((resp) => {
      if (resp.status === 422) {
        resp.json().then((data) => {
          this.setState({ errors: data.errors })
        });
        return
      }

      if (resp.status === 201) {
        resp.json().then(data => onSignIn(data));
      }
    });
  }

  renderErrors() {
    const { errors } = this.state

    if (errors.length === 0) { return }

/* eslint-disable */
    return (
      <div>
        <h2>Vasiliy has errors on sign in</h2>
        <ul>
          {this.state.errors.map((error, i) => (<li key={i}>{error}</li>))}
        </ul>
      </div>
    )
  }
  /* eslint-enable */

  render() {
    return (
      <form className="container" onSubmit={this.onSubmit}>
        <h1>Sign In</h1>
        {this.renderErrors()}
        <label htmlFor="SignInForm">
          <input name="username" type="text" value={this.state.username} onChange={this.onChange} />
          <input name="password" type="password" value={this.state.password} onChange={this.onChange} />
        </label>
        <input type="submit" value="Sign In" />
      </form>
    );
  }
}

SignInForm.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};
