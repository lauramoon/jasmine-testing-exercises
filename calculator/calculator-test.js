
it('should calculate the monthly payment correctly', function () {
  expect(calculateMonthlyPayment(testValues1)).toEqual('106.07');
  expect(calculateMonthlyPayment(testValues2)).toEqual('321.75');
});
it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment(testValues1).slice(-3,-2)).toEqual('.');
  expect(calculateMonthlyPayment(testValues2).slice(-3,-2)).toEqual('.');
});
it('should handle loan amount of 0', () => {
  testZeroLoan = {amount: 0, years: 5, rate: 0.5}
  expect(calculateMonthlyPayment(testZeroLoan)).toEqual('0.00');
})
it('should handle negative loan amount', () => {
  testNegativeLoan = {amount: -1000, years: 5, rate: 0.5}
  expect(calculateMonthlyPayment(testNegativeLoan)).toEqual('The loan amount cannot be negative');
})
it('should handle rate of 0', () => {
  testZeroRate = {amount: 12000, years: 5, rate: 0}
  expect(calculateMonthlyPayment(testZeroRate)).toEqual('200')
})
it('should handle negative rate', () => {
  testNegativeRate = {amount: 10000, years: 5, rate: -.03}
  expect(calculateMonthlyPayment(testNegativeRate)).toEqual('The interest rate must be positive')
})
it('should check for unexpectedly large interest rate', () => {
  testLargeInterest = {amount: 10000, years: 5, rate: 5}
  expect(calculateMonthlyPayment(testLargeInterest))
    .toEqual('Please enter the interest rate as a decimal (for example, 5% as 0.05)')
})


beforeAll(() => {
  testValues1 = {amount: 10000, years: 10, rate: .05};
  testValues2 = {amount: 50000, years: 15, rate: .02};
})
