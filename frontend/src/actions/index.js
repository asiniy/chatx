export const userSignedIn = (user) => {
  console.log('User logged in');

  return {
    type: 'USER_SIGNED_IN',
    payload: user,
  }
}

export const setMessages = (messages) => {
  console.log('Messages setted');

  return {
    type: 'SET_MESSAGES',
    payload: messages,
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
