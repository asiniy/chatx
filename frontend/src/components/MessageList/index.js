import React from 'react';
import styles from './styles.css'

// TODO разобраться с подключением стилей

export default (props) => {
  const { messages } = props

  return (
    <ul className="message-list">
      {messages.reverse().map(({ id, body, user }) => (
        <li key={id}>
          <span className="user-first-name">{user.first_name}
          </span>
          <p>
            {body}
          </p>
        </li>
      ))}
    </ul>);
}
