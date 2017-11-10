import React from 'react';
import ReactDOM from 'react-dom';

class SignInForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3000/api/session', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.username,
      }),
    }).then(() => { alert('Succesful') }) // eslint-disable-line no-alert
      .catch(() => { alert('Error') }); // eslint-disable-line no-alert
    // alert(this.state.username +" " + this.state.password);
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
        {/* <p>{this.state.username}</p>
        <p>{this.state.password}</p> */}

      </form>
    );
  }
}

const root = document.getElementById('root');

ReactDOM.render(<SignInForm />, root);
