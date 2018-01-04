import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter, sortByDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

store.dispatch(addExpense({
  description: 'Water bill',
  amount: 300,
  createdAt: 10
}));

store.dispatch(addExpense({
  description: 'Gas bill',
  amount: 250,
  createdAt: 30
}));

store.dispatch(addExpense({
  description: 'Rent',
  amount: 1000000,
  createdAt: 1
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
