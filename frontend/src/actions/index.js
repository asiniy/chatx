export const userLoggedIn = (user) => {
  console.log('User logged in');

  return {
    type: 'USER_LOGGED_IN',
    payload: user,
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
