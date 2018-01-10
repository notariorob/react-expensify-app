import React from 'react';
import { shallow } from 'enzyme';

import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpensesSummary correctly when 1 expense is provided', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235} />);

  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly when various expenses are provided', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={5} expensesTotal={123456789} />);

  expect(wrapper).toMatchSnapshot();
});