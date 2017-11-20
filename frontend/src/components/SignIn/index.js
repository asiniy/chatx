import React from 'react';

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'vasiliy',
      password: 'secret',
      errorMsg: '',
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
        return resp.text();
      }
      return resp.json();
    }).then((data) => {
      if (data.id === undefined) {
        this.setState({ errorMsg: data });
      } else {
        onSignIn(data);
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Sign In</h1>
        <label htmlFor="SignInForm">
          <input name="username" type="text" value={this.state.username} onChange={this.onChange} />
          <input name="password" type="password" value={this.state.password} onChange={this.onChange} />
        </label>
        <input type="submit" value="Sign In" />
        <p>{this.state.errorMsg}</p>
      </form>
    );
  }
}
