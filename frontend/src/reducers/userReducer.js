const initialState = {
  id: '',
  username: '',
  password: '',
  errors: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return action.payload
    default:
      return state
  }
};

// export default () => ({
//   id: '',
//   username: 'vasiliy',
//   password: 'secret',
//   errors: [],
// });
