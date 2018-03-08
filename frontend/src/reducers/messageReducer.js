import { uniqBy, sortBy } from 'lodash'
import { SET_MESSAGES, ADD_MESSAGE } from '../constants/actions'

const initialState = {
  messages: null,
  loading: true,
}

// TODO добавить loaded
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        loading: false,
        messages: action.payload,
      }
    case ADD_MESSAGE: {
      const { messages } = state
      const messagesWithNew = [...messages, action.payload]
      const uniqMessages = uniqBy(messagesWithNew, m => m.id)
      const sortedMessages = sortBy(uniqMessages, m => m.id) // TODO asc vs desc поосмотреть

      return {
        ...state,
        messages: sortedMessages,
      }
    }
    default:
      return state
  }
};
