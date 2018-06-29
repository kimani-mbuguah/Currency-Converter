function performConversion(){
  //get values from user
  let amountValue = document.getElementById('amount').value;
  let convertFromValue = document.getElementById('convert-from').value;
  let convertToValue = document.getElementById('convert-to').value;
  let showresult = document.getElementById('result');

  function convertCurrency (amount, fromCurrency, toCurrency) {
    fromCurrency = encodeURIComponent(fromCurrency);
    toCurrency = encodeURIComponent(toCurrency);
    let query = fromCurrency + '_' + toCurrency;
    let url = "https://free.currencyconverterapi.com/api/v5/convert?q=" +query + "&compact=ultra";

    //fetch 
    fetch(url).then(response => { 
      return response.json();
    }).then(results => {
      // Work with JSON data
      let currVal = parseFloat(amount);

      for (let result in results){
        let calculation = results[result];
        let total = calculation * currVal;
        (function(){
          swal("Conversion successful !!", `${currVal} ${fromCurrency} amounts to ${total} ${toCurrency}`, "success")
        }());

      showresult.innerHTML += `<h2 class="to-divider">${total}</h2>`;
      }

    }).catch(err => {
      (function(){
        sweetAlert("Oops...", "Something went wrong !!", "error");
      }());
    });
  }

  convertCurrency(amountValue, convertFromValue, convertToValue);
}