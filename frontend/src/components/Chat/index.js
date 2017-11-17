import React from 'react';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: 'LOL' }
  }

  render() {
    return (<div>
      <h1>Hello {this.props.user}</h1>
      <button onClick={this.props.onSignOut}>
        Sign Out
      </button>
    </div>
    );
  }
}
