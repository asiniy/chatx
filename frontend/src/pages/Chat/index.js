import React from 'react';
import { isNull } from 'lodash';
import PropTypes from 'prop-types';
import { fetch } from '../../utils';
import { Name, Username, MessageField, MessageList } from '../../components';
import { Button } from 'react-bootstrap';
import styles from './styles.css'
import Loading from '../../components/Loading';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null,
    }

    this.getMessageList = this.getMessageList.bind(this);
  }

  componentDidMount() {
    this.getMessageList();
  }

  getMessageList() {
    fetch('http://localhost:3000/api/messages')
      .then((messages) => {
        this.setState({ messages })
      });
  }

  render() {
    const { onSignOut, user } = this.props;
    const { messages } = this.state;

    //  if messages is null return loadig gif
    if (isNull(messages)) return <Loading />;

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
            <span className="button-signout"><Button onClick={onSignOut}>
              Sign Out
                  </Button>
            </span>
          </div>
          <div className="col-lg-9 main-col col-xs-6">
            <div className="message-field">
              <MessageField
                getMessageList={this.getMessageList}
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
  onSignOut: PropTypes.func,
};
//
Name.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

Username.propTypes = {
  username: PropTypes.string,
};

// обертка над фетч -токен утда
