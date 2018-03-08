import React from 'react';
import { FormGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fetch } from '../../utils';
import styles from './styles.css'

// 1. Сделать отправление на `Ctrl+Enter` - сделать так, чтобы если ты покидаешь страницу, этот eventListener исчезает
// 2. Если messageText не существует/строка из одних пробелов или новых строк, то тогда выключать кнопку `disabled`
// 3. Сохранять в localStorage текущий текст

export default class MessageField extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      messageText: '',
    };
  }

  onChange(e) {
    this.setState({ messageText: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const { getMessageList, addMessage, user, lastMessageId } = this.props;
    const { messageText } = this.state;

    fetch('http://localhost:3000/api/messages', {
      method: 'POST',
      params: JSON.stringify({ message: { body: messageText } }),
    }).then(message => addMessage(message));

  }

  render() {
    return (
      <form>
        <FormGroup controlId="formControlsTextarea">
          <textarea
            className="Message-input form-control"
            type="text"
            message={this.state.messageText}
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
