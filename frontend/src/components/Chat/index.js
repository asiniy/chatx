import React from 'react';
import PropTypes from 'prop-types';
import { fetch } from '../utils';

const Name = props => <div>{props.firstName} {props.lastName}</div>;

const Username = props => <div>@{props.username}</div>;

const Messages = fetch('http://localhost:3000/api/users/me', { method: 'GET', params: {} });
const Chat = (props) => {
  Messages.then((data) => { console.log(data) });
  const { onSignOut } = props;
  const { user } = props;
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
    </div>
  );
}

export default Chat

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
