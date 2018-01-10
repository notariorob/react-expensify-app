export default (expenses) => {
  return expenses.reduce((a, b) =>  {
    return a + b.amount;
  }, 0);
}