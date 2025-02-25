const SaleBillValidation = (values, products) => {
  let errors = {};

  if (products.length == 0) {
    errors._product = "Please select atleast one product";
  } else {
    products.map((row) => {
      if (row.totalPrice == 0.0) {
        errors._product = "Please check product data";
      }
      if (row.batches.lenght == 0) {
        errors._product = "Please check product data";
      }
    });
  }
  if (values._billNumber == "") {
    console.log("Bill error....");
    errors._billNumber = "Please add bill number";
  }
  if (values._customer == "") {
    errors._customer = "Please add customer name";
  }
  if (values._paidStatus == "") {
    errors._paidStatus = "Please add paid status";
  }

  return errors;
};

export default SaleBillValidation;
