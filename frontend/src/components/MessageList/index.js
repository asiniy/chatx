import React from 'react';
import styles from './styles.css'

// export default messages => <ul>{messages.map(({ body }) => <li>{body}</li>)}</ul>;
export default (obj) => {
  const { messages } = obj;
  return (<ul className="message-list">{messages.map(({ id, body, user }) => <li key={id}><span className="user-first-name">{user.first_name}</span><p>{body}</p></li>)}</ul>);
}
