import selectExpensesTotal from '../../selectors/expensesTotal';
import expenses from '../fixtures/expenses';

test('should return total amount from given expenses', () => {
  const result = selectExpensesTotal(expenses);

  expect(result).toBe(154695);
});

test('should return total amount when 1 expense is given', () => {
  const result = selectExpensesTotal([expenses[0]]);

  expect(result).toBe(195);
})

test('should return 0 if no expenses are given', () => {
  const result = selectExpensesTotal([]);

  expect(result).toBe(0);
});