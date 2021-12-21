import validator from 'validator';

export const validateEmail = (email: string) => {
    if (validator.isEmail(email)){
        return "";
    }
    else{
        return "Not a valid email";
    }
}

export const validatePassword = (password: string, confirmPassword: string) => {
    if (validator.equals(password, confirmPassword)){
        return "";
    }
    else{
        return "Passwords do not match";
    }
}

export const notNull = (string: string) =>{
    if (!validator.isEmpty(string)){
        return "";
    }
    else return "Please enter the above value";
}

