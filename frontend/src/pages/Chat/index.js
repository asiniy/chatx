import React from 'react';
import { isNull } from 'lodash';
import PropTypes from 'prop-types';
import { fetch } from '../../utils';
import { Name, Username, MessageField, MessageList } from '../../components';
import { Button } from 'react-bootstrap';
import styles from './styles.css'
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { userLoggedIn } from '../../actions';

import * as Actions from '../../actions'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.getMessageList = this.getMessageList.bind(this);
  }

  componentDidMount() {
    const { userSignedIn } = this.props;
    userSignedIn({
      id: '1',
      username: 'vasiliy',
      first_name: 'Vasiliy',
      last_name: 'Gladishev',
    });
    this.getMessageList();
  }
  // replace with async/await
  getMessageList() {
    fetch('http://localhost:3000/api/messages')
      .then((messages) => {
        this.props.setMessages(messages);// TODO to redux set messages, add message (websocket)
      });
  }


  render() {
    const { onSignOut, user, messages } = this.props;
    //  if messages is null return loadig gif
    if (isNull(messages)) return <Loading />;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 user-col bg-dark text-white col-xs-6">
            <h2 className="username"><Name
              user={user}
            />
            </h2>
            <h5><Username
              username={user.username}
            /><span className="text-secondary"> #{user.id}</span>
            </h5>
            <span className="button-signout">
              <Button onClick={onSignOut}>
              Sign Out
              </Button>
            </span>
          </div>
          <div className="col-lg-9 main-col col-xs-6">
            <div className="message-field">
              <MessageField
                getMessageList={this.getMessageList}
              />
            </div>
            <MessageList messages={messages} />
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({ user: state.user });
//
// export default connect(mapStateToProps)(Chat);

Chat.propTypes = {
  user: PropTypes.object.isRequired,
  messages: PropTypes.array,
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


const mapStateToProps = ({ user, messages }) => ({ user, messages });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     userLoggedIn: (user) => {
//       dispatch(userLoggedIn(user))
//     }
//   }
// }
//
// const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
