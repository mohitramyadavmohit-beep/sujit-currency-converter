const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

// List of popular currencies
const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CNY", "CHF", "NZD"];

// Populate dropdowns
currencies.forEach((currency) => {
  const option1 = document.createElement("option");
  option1.value = currency;
  option1.textContent = currency;
  fromCurrency.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = currency;
  option2.textContent = currency;
  toCurrency.appendChild(option2);
});

// Set default selections
fromCurrency.value = "USD";
toCurrency.value = "INR";

// Convert function
async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await response.json();

    if (data.result) {
      resultDiv.innerHTML = `
        <strong>${amount} ${from}</strong> = 
        <strong>${data.result.toFixed(2)} ${to}</strong>
      `;
    } else {
      resultDiv.textContent = "Conversion failed. Try again.";
    }
  } catch (error) {
    resultDiv.textContent = "Error fetching data.";
    console.error(error);
  }
}
