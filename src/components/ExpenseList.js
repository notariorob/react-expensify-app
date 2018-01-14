import React from 'react';
import { connect } from 'react-redux';

import selectExpenses from '../selectors/expenses';
import ExpenseListItem from './ExpenseListItem';

export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="mobile-only">Expenses</div>
      <div className="desktop-only">Expense</div>
      <div className="desktop-only">Amount</div>
    </div>
    <div class="list-body">
      {
        props.expenses.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No expenses</span>
          </div>
        ) : (
          props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />
        })
        )
      }    
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};


export default connect(mapStateToProps)(ExpenseList);