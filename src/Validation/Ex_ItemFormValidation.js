const Ex_ItemFormValidation=(values)=> {
    let errors={}

    if(!values._barcode){
        errors._barcode = "Barcode is required."
    }
    if(!values._productName){
        errors._productName = "Product name is required."
    }

    return errors;
}

export default Ex_ItemFormValidation
