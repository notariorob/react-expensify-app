import React from 'react';
import { shallow } from 'enzyme';

import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render expense item when an expense is provided', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[2]} />);

  expect(wrapper).toMatchSnapshot();
});