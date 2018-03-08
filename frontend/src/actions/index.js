import { USER_SIGNED_IN, SET_MESSAGES, ADD_MESSAGE } from '../constants/actions'

export const userSignedIn = (user) => {
  console.log('User logged in');

  return {
    type: USER_SIGNED_IN,
    payload: user,
  }
}

export const setMessages = (messages) => {
  console.log('Messages setted');
  // console.log(messages[messages.length - 1].id + 1);
  return {
    type: SET_MESSAGES,
    payload: messages,
  }
}

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    payload: message,
  }
}


// const cliskBtn = () => {
//   console.log('button is clicked');
//
//   return {
//     type: 'BUTTON_CLICKED',
//     payload: '',
//   }
// }
//
// export default cliskBtn;
