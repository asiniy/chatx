import { combineReducers } from 'redux'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer;

// изучить combineReducers
// сделай userReducer
// подключи reducer от react-router-redux
// в дальнейшем: подключи личные сообщения messageReducer
