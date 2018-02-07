import React from 'react';
import { fetch } from '../../utils';
import { Form, FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';

export default class MessageField extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      message: '',
    };
  }

  handleChange(e) {
    this.setState({ message: e.target.message })
  }
  onSubmit(e) {
    const { message } = this.state;
    //fetch('http://localhost:3000/api/messages'), { method: 'POST' }).then
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formControlsTextarea">
          <FormControl
            type="text"
            message={this.state.message}
            placeholder="Enter text message"
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button type="submit" onClick={this.onSendMessage} >Submit</Button>
      </form>
    )
  }
}
