import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fetch } from '../../utils';
import styles from './styles.css'

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
    const { getMessageList } = this.props;
    const { message } = this.state;
    fetch('http://localhost:3000/api/messages', {
      method: 'POST',
      params: JSON.stringify({ message: { body: message } }),
    }).then(() => { getMessageList() });
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formControlsTextarea">
          <textarea
            className="Message-input form-control"
            type="text"
            message={this.state.message}
            placeholder="Enter text message"
            onChange={this.onChange}
            rows="4"
          />
        </FormGroup>
        <div className="row">
          <div className="col-lg-12">
            <Button className="submit-button" type="submit" onClick={this.onSubmit}>Submit</Button>
          </div>
        </div>
      </form>
    )
  }
}

MessageField.propTypes = {
  getMessageList: PropTypes.func,
};
