import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

import { editExpense } from '../actions/expenses';

 const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={"/edit/" + id}>
      <h2>{description}</h2>
    </Link>
    <p>{numeral(amount / 100).format('$0,00.00')} -
    Created at: {moment(createdAt).format('MMMM Do, YYYY')}</p>
  </div>
);

export default ExpenseListItem;