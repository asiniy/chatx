import { combineReducers } from 'redux'
import userReducer from './userReducer'
import messageReducer from './messageReducer'

const rootReducer = combineReducers({
  user: userReducer,
  messages: messageReducer,
})

export default rootReducer;

// изучить combineReducers
// сделай userReducer
// подключи reducer от react-router-redux
// в дальнейшем: подключи личные сообщения messageReducer
