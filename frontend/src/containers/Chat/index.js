import React from 'react';
import { isNull } from 'lodash';
import PropTypes from 'prop-types';
import { fetch } from '../../utils';
import { Name, Username, MessageField, MessageList } from '../../components';
import { Button } from 'react-bootstrap';
import Loading from '../../components/Loading';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null,
    }
  }

  componentDidMount() {
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
      <div>
        <Name
          user={user}
        />
        <div>id: {user.id}</div>
        <Username username={user.username} />
        <Button onClick={onSignOut}>
          Sign Out
        </Button>
        <MessageField />
        <MessageList messages={messages} />
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
