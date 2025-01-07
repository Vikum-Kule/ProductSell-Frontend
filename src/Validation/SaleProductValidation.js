const SaleProductValidation = (values, rows) => {
    let errors = {};
  
    if (values._product == null) {
      errors._product = "Please select atleast one product";
    }
    if (values._customer == "") {
      errors._customer = "Please add customer name";
    }
    if (values._paidStatus == "") {
        errors._paidStatus = "Please add paid status";
    }
    if (values._sellingQty == "") {
        errors._sellingQty = "Please add selling quantity";
    }
  
    return errors;
  };
  
  export default SaleProductValidation;
  