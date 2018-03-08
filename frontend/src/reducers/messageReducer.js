import { SET_MESSAGES, ADD_MESSAGE } from '../constants/actions'


const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.payload;
    case ADD_MESSAGE: {
      // console.log(action.payload, ...state);
      const newState = [action.payload, ...state];
      return newState.reverse();
    }
    default:
      return state
  }
};
