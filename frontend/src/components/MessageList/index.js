import React from 'react';

// export default messages => <ul>{messages.map(({ body }) => <li>{body}</li>)}</ul>;
export default (obj) => {
  const { messages } = obj;
  return (<ul>{messages.map(({ id, body }) => <li key={id}>{body}</li>)}</ul>);
}
