import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from '../reducers/auth'
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';



export default () => {
  const reducers = combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
    auth: authReducer
  });

  // Store creation
  const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

  return store;
};