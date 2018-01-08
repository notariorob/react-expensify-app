import { setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount } from '../../actions/filters';
import moment from 'moment';

// Set start date 
test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
});

// Set end date
test('should generate set end date action object', () => {
  const action = setEndDate(moment(0));

  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
});

// Sort by date
test('should generate sort by date action object', () => {
  const action = sortByDate();

  expect(action).toEqual({
    type: 'SORT_BY_DATE'
  });
});

// Sort by amount
test('should generate sort by amount action object', () => {
  const action = sortByAmount();

  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  });
});

// Set text filter with default values
test('should generate set text filter action object with default value', () => {
  const action = setTextFilter();
  
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

// Set text filter with provided values
test('should generate set text filter action object with provided value', () => {
  const text = 'rent';
  const action = setTextFilter(text);
  
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  });
});