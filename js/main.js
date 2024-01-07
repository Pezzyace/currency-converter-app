const fromThisCurrency = document.getElementById('from-this-currency');
const toThisCurrency = document.getElementById('to-this-currency');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');
let apiKey = "0972ae285a50c98317e91897";
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;


currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromThisCurrency.add(option);
})
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toThisCurrency.add(option);
})

fromThisCurrency.value = "USD";
toThisCurrency.value = "NGN";

let convertCurrency = () => {
  const amount = document.getElementById('amount').value;
  const fromCurrency = fromThisCurrency.value;
  const toCurrency = toThisCurrency.value;

  if (amount.length != 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRates = data.conversion_rates[fromCurrency];
        let toExchangeRates = data.conversion_rates[toCurrency];

        const convertedAmount = (amount / fromExchangeRates) * toExchangeRates;

        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
      })
      .catch(() => {
        alert("An error occurred while fetching the data")
      });
  } else {
    alert("Please fill in the amount");
  }

};

convertBtn.addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);