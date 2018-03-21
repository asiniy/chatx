import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import userReducer from './userReducer'
import messageReducer from './messageReducer'

const rootReducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  messages: messageReducer,
  form: formReducer,
})

export default rootReducer;

// изучить combineReducers
// сделай userReducer
// подключи reducer от react-router-redux
// в дальнейшем: подключи личные сообщения messageReducer
