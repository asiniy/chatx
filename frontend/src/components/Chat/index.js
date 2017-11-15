import React from 'react';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = { username: 'LOL' }
  }

  render() {
    return (
      <h1>Chat {this.state.username}</h1>
    );
  }
}
