import React from 'react';
import { FormGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import { Field } from 'redux-form'
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
    this.ctrlPlusEnter = this.ctrlPlusEnter.bind(this);

    const messageInLocalStorage = localStorage.getItem('message');
    if (isNil(messageInLocalStorage)) {
      this.state = {
        messageText: '',
      };
    } else {
      console.log('local storage not empty');
      this.state = {
        messageText: messageInLocalStorage,
      };
    }
  }

  componentDidMount() {
    console.log('mount');
    document.addEventListener('keydown', this.ctrlPlusEnter);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.ctrlPlusEnter);
  }

  ctrlPlusEnter(e) {
    if (e.keyCode === 13 && e.ctrlKey) {
      console.log('ctrl+Enter');
      this.onSubmit(e);
    }
  }

  onChange(e) {
    this.setState({ messageText: e.target.value })
    localStorage.setItem('message', e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();

    const { addMessage } = this.props;

    const { messageText } = this.state;

    fetch('http://localhost:3000/api/messages', {
      method: 'POST',
      params: JSON.stringify({ message: { body: messageText } }),
    }).then(message => addMessage(message));

    this.setState({ messageText: '' }); // todo to  then
    localStorage.removeItem('message');
  }

  render() {
    //if (this.props.form.messageData.values === undefined) {
      //console.log(this.props.form.messageData.values);
    //  console.log('lol');
    // }
    const { handleSubmit, form } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="formControlsTextarea">
            <Field
              name="message"
              component="input"
              type="text"
              className="Message-input form-control"
              placeholder="Enter text message"
              onChange={this.onChange}
              value={this.state.messageText}
              rows="4"
            />
            <div className="row">
              <div className="col-lg-12">
                <Button
                  className="submit-button"
                  type="submit"
                  onClick={this.onSubmit}
                  disabled={!this.state.messageText.trim()}>
                  Submit
                </Button>
              </div>
            </div>
          </FormGroup>
        </form>
      </div>
    )
  }
}

MessageField.propTypes = {
  getMessageList: PropTypes.func,
};
