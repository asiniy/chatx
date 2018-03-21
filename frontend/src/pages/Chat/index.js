import React from 'react';
import { isNull } from 'lodash';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { fetch } from '../../utils';
import styles from './styles.css'
import Loading from '../../components/Loading'
import { Name, Username, MessageField, MessageList } from '../../components';

// import { userLoggedIn } from '../../actions';

import * as Actions from '../../actions'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.getMessageList = this.getMessageList.bind(this);
  }

  componentDidMount() {
    const { userSignedIn } = this.props;

    userSignedIn({
      id: '1',
      username: 'vasiliy',
      first_name: 'Vasiliy',
      last_name: 'Gladishev',
    })

    this.getMessageList();
  }
  // replace with async/await
  // TODO insert redux-thunk
  getMessageList() {
    fetch('http://localhost:3000/api/messages')
      .then((messages) => {
        this.props.setMessages(messages);// TODO to redux set messages, add message (websocket)
      });
  }


  render() {
    let lastMessageId = 0;
    const {
      onSignOut,
      user,
      messagesState: { loading, messages },
      addMessage,
      handleSubmit,
      form,
    } = this.props;
    //  if messages is null return loadig gif

    if (loading) {
      return <Loading />
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 user-col bg-dark text-white col-xs-6">
            <h2 className="username"><Name
              user={user}
            />
            </h2>
            <h5><Username
              username={user.username}
            /><span className="text-secondary"> #{user.id}</span>
            </h5>
            <span className="button-signout">
              <Button onClick={onSignOut}>
                Sign Out
              </Button>
            </span>
          </div>
          <div className="col-lg-9 main-col col-xs-6">
            <div className="message-field">
              <MessageField
                getMessageList={this.getMessageList}
                addMessage={addMessage}
                user={user}
                form={form}
                lastMessageId={lastMessageId}
              />
            </div>
            <MessageList messages={messages} />
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  user: PropTypes.object.isRequired,
  messagesState: PropTypes.object.isRequired,
  onSignOut: PropTypes.func,
  setMessages: PropTypes.func,
  userSignedIn: PropTypes.func,
};

Name.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

Username.propTypes = {
  username: PropTypes.string,
};


const mapStateToProps = ({ user, messages, form }) => ({ user, messagesState: messages, form });

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withProps = connect(mapStateToProps, mapDispatchToProps)(Chat);
export default reduxForm({ form: 'messageData', initialValues: { message:localStorage.getItem('message') } })(withProps);
