import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter, sortByDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

// store.subscribe(() => {
//   const state = store.getState();
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//   console.log(visibleExpenses);
// });

store.dispatch(addExpense({
  description: 'Water bill',
  amount: 300,
  createdAt: moment().subtract(10, 'days').valueOf()
}));

store.dispatch(addExpense({
  description: 'Gas bill',
  amount: 250,
  createdAt: moment().subtract(2, 'days').valueOf()
}));

store.dispatch(addExpense({
  description: 'Rent',
  amount: 1000000,
  createdAt: moment().add(40, 'days').valueOf()
}));

store.dispatch(sortByDate());

// store.dispatch(setTextFilter('water'));


const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(
  jsx,
  document.getElementById('app')
);
