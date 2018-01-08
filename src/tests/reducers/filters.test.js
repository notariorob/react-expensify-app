import filtersReducer from '../../reducers/filters';
import moment from 'moment';

// Setup default filters
test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

// Sort by amount
test('should set sort by amount filter', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

  expect(state.sortBy).toBe('amount');
});

// Sort by date
test('should set sort by date filter', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  };

  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);

  expect(state.sortBy).toBe('date');
});

// Setup text filter
test('should set text filter', () => {
  const text = 'rent';
  const state = filtersReducer(undefined, {
    type: 'SET_TEXT_FILTER',
    text
  });

  expect(state.text).toEqual(text);
});

// Setup start date filter
test('should set start date filter', () => {
  const startDate = moment();
  const state = filtersReducer(undefined, {
    type: 'SET_START_DATE',
    startDate
  });

  expect(state.startDate).toEqual(startDate);
})

// Setup end date filter
test('should set end date filter', () => {
  const endDate = moment();
  const state = filtersReducer(undefined, {
    type: 'SET_END_DATE',
    endDate
  });

  expect(state.endDate).toEqual(endDate);
})