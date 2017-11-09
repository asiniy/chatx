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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    fetch('http://localhost:3000/api/session', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.username,
      })
    })
    
    // alert(this.state.username +" " + this.state.password);

    event.preventDefault();
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
