// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, Button, ControlLabel } from 'react-bootstrap';
import styles from './styles.css'

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

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
    e.preventDefault() // TODO изучить e.preventDefault()
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
  // const { handleSubmit } = this.props

    return (
      <div className="row">
        <div className="col-lg-4" />
        <div className="col-lg-4">
          <div className="container sign-in-form">
            <Form horizontal>
              <h1>Sign In</h1>
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type="text"
                name="username"
                onChange={this.onChange}
              />
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                name="password"
                onChange={this.onChange}
              />
            </Form>
            <Button onClick={this.onSubmit}>Sign In</Button>
            <a className="forgot" href="/">Forgot password?</a>
          </div>
        </div>
        <div className="col-lg-4" />
      </div>
    );
  }
}

SignInForm.propTypes = {
  onSignIn: PropTypes.func,
};

// export default reduxForm({ form: 'signIn' })(SignInForm);
export default SignInForm;

/*
<form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="firstName">First Name</label>
    <Field name="firstName" component="input" type="text" />
  </div>
  <button type="submit">Submit</button>
</form>
*/
