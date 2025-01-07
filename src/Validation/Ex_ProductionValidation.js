const Ex_ProductionValidation = (values, rows) => {
  let errors = {};

  if (values._productionItems.length === 0) {
    errors._productionItems = "Please Select atleast one item";
  }
  if (values._productionQty <= 0) {
    errors._productionQty = "Production Quantity can not be empty";
  }
  if (values._productionItems.length !== 0) {
    console.log("Validating....");
    let isErrorItem = false;
    values._productionItems.map((item) => {
      if (
        item.itemQty <= 0 ||
        item.unitPrice <= 0 ||
        item.unitPriceMethod === ""
      ) {
        console.log("Error true....");
        isErrorItem = true;
      }
    });
    if (isErrorItem) {
      errors._productionItems = "Please check Production items";
    } else {
      let errorMsg = "There is no required quantity for this Items. ( ";
      let isInsufficientQty = false;
      rows.map((row) => {
        if (row.avlQty < row.itemQty * values._productionQty) {
          isInsufficientQty = true;
          errorMsg = errorMsg + row.item + " , ";
        }
      });
      if (isInsufficientQty) {
        errors._productionItems = errorMsg + " )";
      }
    }
  }

  return errors;
};

export default Ex_ProductionValidation;
