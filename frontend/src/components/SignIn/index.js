import React from 'react';
import ReactDOM from 'react-dom';

class SignInForm extends React.Component {
  constructor() {
  super();
  this.state = {
    username: '',
    password: ''
  }

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.prDefault();
    fetch('http://localhost:3000/api/session', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.username,
      })
    }).then(() => {alert("Succesful")})
    .catch(() => {alert("Error")});
    // alert(this.state.username +" " + this.state.password);
  }


  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign In</h1>
        <label>
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
      </label>
        <input type="submit" value="Sign In"/>
        {/* <p>{this.state.username}</p>
        <p>{this.state.password}</p> */}

      </form>
    );
  }
}

const root = document.getElementById('root');

ReactDOM.render(<SignInForm/>, root);
