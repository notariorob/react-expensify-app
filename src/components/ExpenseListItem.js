import React from 'react';
import { connect } from 'react-redux';

import { removeExpense, editExpense } from '../actions/expenses';

 const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
    <h2>{description}</h2>
    <p>Amount: {amount}</p>
    <p>Created at: {createdAt}</p>
    <button onClick={() => { 
      dispatch(removeExpense({id}));
    }}>Remove</button>
  </div>
);

const ConnectedExpenseListItem = connect()(ExpenseListItem);

export default ConnectedExpenseListItem;