import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { fetch } from '../../utils';

export default class MessageField extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      message: '',
    };
  }

  onChange(e) {
    this.setState({ message: e.target.value })
  }
  onSubmit() {
    const { message } = this.state;
    fetch('http://localhost:3000/api/messages', {
      method: 'POST',
      params: JSON.stringify({ message: { body: message } }),
    });
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formControlsTextarea">
          <FormControl
            type="text"
            message={this.state.message}
            placeholder="Enter text message"
            onChange={this.onChange}
          />
        </FormGroup>
        <Button type="submit" onClick={this.onSubmit} >Submit</Button>
      </form>
    )
  }
}
