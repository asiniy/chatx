import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import WrappedApp from './client';
import rootReducer from './reducers';


/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

// store.subscribe(() => {
//   console.log('subscribe', store.getState());
// });
// store.dispatch({ type: 'SIGN_IN', payload: { username: 'vasiliy', password: 'secret' } });

ReactDOM.render(
  <Provider store={store}>
    <WrappedApp />
  </Provider>,
  document.getElementById('root'),
);

// TODO export default connect(App)(mapStateToProps, mapDispatchToProps)
