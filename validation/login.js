const Validator = require('validator');
const passValid = require('password-validator');


function validateLoginInput(data){
    let errors = {};
    let isValid = true;

//Email
    if (validator.isEmail(data.email) == false){
        errors.email = 'Invalid Email Id';
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

if (schema.validate(data.password) == false) {
    errors.password = 'Password must be between 8 and 20 characters and must contain uppercase and lowercase letter, digits and should not have spaces';
    isValid = false;
}

return {
    errors,
    isValid
}
}

module.exports = validateLoginInput;