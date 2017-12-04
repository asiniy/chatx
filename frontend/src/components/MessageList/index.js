import React from 'react';

export default (msgs) => {
  console.log(msgs);
  if (msgs === null)
    return;

  render() {
    return (
      <ul>
        {msgs.map(({ body }) => <li>{body}</li>)}
      </ul>
    )
  }

}
