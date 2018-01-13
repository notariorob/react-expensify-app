import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

import { startAddExpense,
  addExpense,
  editExpense, 
  startEditExpense,
  removeExpense, 
  startRemoveExpense, 
  setExpenses, 
  startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt}) => {
    expensesData[id] = {
      description,
      note,
      amount,
      createdAt
    }
  });

  database.ref('expenses').set(expensesData).then(() => {
    done();
  });
});

test('should setup remove expense action object', () => {
  const action =  removeExpense({ id: '123abc'});

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove expense from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;

  store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', {
    note: 'This is a note!'
  });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'This is a note!'
    }
  });
});

test('should edit expense in firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  const newNote = 'this was added from test';
  const updates = {
    note: 'this was added from test'
  };

  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().note).toBe(newNote);
    done();
  });

});

test('should setup add expense action object with provided values', () => {

  const action = addExpense(expenses[2]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This mouse is the best',
    createdAt: 312637812124
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const defaultExpense = {
    description: '', 
    note: '', 
    amount: 0, 
    createdAt: 0 
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultExpense
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultExpense);
    done();
  });
});


test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

