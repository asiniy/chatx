import { SET_MESSAGES } from '../constants/actions'


const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.payload
    default:
      return state
  }
};
