import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { editExpense } from '../actions/expenses';

 const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={"/edit/" + id}>
      <h2>{description}</h2>
    </Link>
    <p>Amount: {amount}</p>
    <p>Created at: {moment(createdAt).format('MMM Do, YYYY')}</p>
  </div>
);

export default ExpenseListItem;