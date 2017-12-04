import React from 'react';
import PropTypes from 'prop-types';
import { fetch } from '../../utils';
import { Name, Username, MessageList } from '../../components';

// почитать camelCase
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null,
    }
  }


  componentDidMount() {
    fetch('http://localhost:3000/api/users/me', { method: 'GET' })
      .then((msg) => {
        this.setState({ messages: msg })
      });
  }

render() {
    const { onSignOut } = this.props;
    const { user } = this.props;

    return (
      <div>
        <Name
          firstName={user.first_name}
          lastName={user.last_name}
        />
        <div>id: {user.id}</div>
        <Username username={user.username} />
        <button onClick={onSignOut}>
          Sign Out
        </button>
        <MessageList msgs={this.state.messages} />
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
