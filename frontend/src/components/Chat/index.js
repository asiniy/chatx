import React from 'react';

export default class Chat extends React.Component {

  render() {
    const { onSignOut } = this.props;
    return (<div>
      <h1>Hello {this.props.user.username}</h1> // stateless component
      <button onClick={onSignOut}>
        Sign Out
      </button>
    </div>
    );
  }
}
