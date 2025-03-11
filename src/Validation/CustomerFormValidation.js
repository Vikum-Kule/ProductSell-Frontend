const regex = {
  number: new RegExp('^[0-9]+$'),
};

const CustomerFormValidation = (values) => {
  let errors = {};
  console.log("calling....");
  
    if (values._name == "") {
      errors._name = "Please Enter Customer Name ";
    }
    if (values._phone == "") {
      errors._phone = "Enter Phone Number";
    }else{
      const length = values._phone ? values._phone.toString().length : 0;

      if (length > 9) {
          const result = regex.number.test(values._phone);
          if (!result) {
            errors._phone = "Phone number should only contains numbers"
          }
      }else{
        errors._phone = "Phone number should only contains atleast 10 numbers"
      }
    }
    if (values._email == "") {
      errors._email = "Please add customer cutomer email";
  }
    if (values._address == "") {
        errors._address = "Please add customer address";
    }
    console.log(errors)
    return errors;
  };
  
  export default CustomerFormValidation;