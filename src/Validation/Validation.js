

const Validation=(values)=> {
    let errors={}

    // if(!values.fullname){
    //     errors.fullname = "Name is required."
    // }
    if(!values.email){
        errors.email = "Email is required. "
    }
    if(!values.password){
        errors.password = "Password is required."
    }else if(values.password.lenght <5){
        errors.password="Password must be more than five characters."
    }
    if(!values._importName){
        errors._importName = "This is a required feild."
    }
    if(!values._importBrand){
        errors._importBrand = "This is a required feild."
    }
    if(!values._importMCategory){
        errors._importMCategory = "This is a required feild."
    }
    if(!values._importQty){
        errors._importQty = "This is a required feild."
    }
    if(!values._importUnitType){
        errors._importUnitType = "This is a required feild."
    }

    return errors;
}

export default Validation
