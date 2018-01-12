import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([
    expenses[0],
    expenses[2]
  ]);
});

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = {
    id: '100',
    description: 'New expense',
    amount: 31683,
    note: '',
    createdAt: 342642
  };

  const action = {
    type: 'ADD_EXPENSE',
    expense
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([
    ...expenses,
    expense]);
});

test('should edit an expense by id', () => {
  const updates = {
    note: 'edited'
  };

  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates
  }

  const state = expensesReducer(expenses, action);

  expect(state[0].note).toBe('edited');
});

test('should not edit expense if not found', () => {
  const updates = {
    note: 'edited'
  };

  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[1]]);
});