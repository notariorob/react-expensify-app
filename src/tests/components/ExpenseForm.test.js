import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import { SingleDatePicker } from 'react-dates';

test('should render ExpenseForm correcty with no expense', () => {
  const wrapper = shallow(<ExpenseForm />);

  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm correctly with given expense', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[2]} />);

  expect(wrapper).toMatchSnapshot()
});

test('should render error for invalid form data', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();

  wrapper.find('form').simulate('submit', { 
    preventDefault: () => {}
  });

  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = 'New description';

  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });

  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = 'New note';

  wrapper.find('textarea').simulate('change', {
    target: { value }
  });

  expect(wrapper.state('note')).toBe(value);
});

test('should set a valid amount', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = '23.5';

  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });

  expect(wrapper.state('amount')).toBe('23.5');
});

test('should try to set an invalid amount', () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = '23.5432';

  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });

  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm 
    expense={expenses[2]} 
    onSubmit={onSubmitSpy}
    />);

  wrapper.find('form').simulate('submit', { 
    preventDefault: () => {}
  });

  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({ 
    description: expenses[2].description, 
    amount: expenses[2].amount, 
    note: expenses[2].note, 
    createdAt: expenses[2].createdAt
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find(SingleDatePicker).prop('onDateChange')(now);

  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set focused state on focus change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });

  expect(wrapper.state('calendarFocused')).toBe(focused);
});