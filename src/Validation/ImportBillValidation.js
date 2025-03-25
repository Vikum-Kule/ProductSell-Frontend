const ImportBillValidation = (values, selectedRows) => {
  let errors = {};
  if (values.billNo == "") {
    errors._billNo = "Bill number can not be empty";
  }
  if (values.shop == "") {
    errors._shop = "Shop name can not be empty";
  }
  if (values.total == 0.0) {
    errors._total = "Total can not be empty";
  }
  if (selectedRows.length == 0) {
    errors._total = "Please select atleast one import item";
  }else{
    for(let x = 0; x < selectedRows.length; x++){
        if(selectedRows[x].qty == 0){
            errors._items = "Bill items qty can not be emtpy"
        }else if(selectedRows[x].unitPrice == 0 || selectedRows[x].price == 0){
            errors._items = "Please check the item prices or process the prices"
        }else if(selectedRows[x].billUnit !== selectedRows[x].unitType && selectedRows[x].itemUintsPerBillUnit == 0){
            errors._items = "Please update item units per bill units"
        }
      }
  }

  return errors;
};

export default ImportBillValidation;
