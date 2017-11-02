import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, browserHistory} from 'react-router';
import ReduxThunk  from 'redux-thunk';

import App      from './components/app';
import Signin   from './components/auth/signin';
import Signout  from './components/auth/signout';
import Signup   from './components/auth/signup';
import Features from './components/features';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import {AUTH_USER} from './actions/types';


const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);
//check the valid token presents on user machine, on revist show him as authenticated; 
const token = localStorage.getItem('token');
if (token)
  store.dispatch({type:AUTH_USER});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
        <Route path="/features" component={RequireAuth(Features)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
