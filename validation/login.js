const validator = require('validator');
const passValid = require('password-validator');
const isEmpty = require('./isEmpty');


function validateLoginInput(data){
    let errors = {};
    let isValid = true;

//Email
    if (isEmpty(data.email)){
        errors.email = 'Email field is required';
        isValid = false;
    }
    else if (validator.isEmail(data.email) == false){
        errors.email = 'Invalid Email Id';
        isValid = false;
    }

    if (isEmpty(data.password)){
        errors.password = 'Password field is required';
        isValid = false;
    }
//Password
var schema = new passValid();
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(20)                                   // Maximum length 20
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().not().spaces()                           // Should not have spaces

if (!isEmpty(data.password) && schema.validate(data.password) == false) {
    errors.password = 'Password is incorrect';
    isValid = false;
}

return {
    errors,
    isValid
}
}

module.exports = validateLoginInput;