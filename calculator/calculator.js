window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.getElementById("loan-amount").value = 10000;
  document.getElementById("loan-years").value = 10;
  document.getElementById("loan-rate").value = 0.05;
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let values = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(values));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let numPayments = values.years*12;
  let decimal = 0;
  let monthlyRate = values.rate/12;
  let principle = values.amount;

  if (numPayments < 12) {
    return "The term must be at least one year"
  } else if (principle === 0) {
    return '0.00'
  } else if (principle < 0) {
    return 'The loan amount cannot be negative'
  } else if (monthlyRate === 0) {
    decimal = principle/numPayments;
  } else if (monthlyRate < 0) {
    return 'The interest rate must be positive'
  } else if (values.rate > 1) {
    return 'Please enter the interest rate as a decimal (for example, 5% as 0.05)'
  } else {
    decimal = principle*monthlyRate/(1-(1+monthlyRate)**(-numPayments));
  }
  
  let rounded = Math.round(decimal*100)/100;
  return rounded.toString();
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById('monthly-payment').textContent = monthly;
}
