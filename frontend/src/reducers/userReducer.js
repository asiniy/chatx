import { USER_SIGNED_IN } from '../constants/actions'

const initialState = {
  id: '',
  username: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNED_IN:
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
