
const regex = {
    number: new RegExp('^[0-9]+$'),
};

export class Validators {

    static requiredNumberMoreThanZero(value, message){
        if (!value || parseFloat(value)<=0) {
            return { error: true, message };
        }
        return false;
    }

    static required(value, message) {
        if (!value || !value.toString().trim().length) {
            return { error: true, message };
        }
        return false;
    }

    static number(value, message) {
        const length = value ? value.toString().length : 0;

        if (length > 0) {
            const result = regex.number.test(value);
            if (!result) {
                return { error: true, message };
            }
        }

        return false;
    }
}



export const FormValidation=(validators,value)=> {
    if (validators && validators.length) {
        for (let i = 0; i < validators.length; i++) {
            const error = validators[i].check(value, validators[i].message);
            if (error) {
                return error;
            }
        }
    }
    return false;
}
