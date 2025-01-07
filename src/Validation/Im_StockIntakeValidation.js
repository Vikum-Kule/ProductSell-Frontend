const Im_StockIntakeValidation = (values, rows) => {
  let errors = {};
  let ifItemSeleted = true;
  if (values._importItem == null) {
    errors._importItem = "Please select atleast one product";
    ifItemSeleted = false;
  }
  console.log("Item selected", ifItemSeleted);
  if (
    (values._totalPrice == "" || values._totalPrice == 0) &&
    (values._pricePerItem == "" || values._pricePerItem == 0)
  ) {
    errors._price = "Please enter total price or unit price";
  }
  if (values._importQty == "") {
    errors._importQty = "Please add import quantity";
  }

  return errors;
};

export default Im_StockIntakeValidation;
