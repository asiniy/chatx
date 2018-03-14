import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { Route, Router, hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import WrappedApp from './client';
import rootReducer from './reducers';

import SignIn from './pages/SignIn';
import Chat from './pages/Chat';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, routerMiddleware(hashHistory)),
);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={WrappedApp} >
        <Route path="sign_in" component={SignIn} />
        <Route path="chat" component={Chat} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
