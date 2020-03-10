const validator = require('validator');
const passValid = require('password-validator');
const isEmpty = require('./isEmpty');

function validateRegisterInput(data){
    let errors = {};

    // Initially assume that data is valid. Later set this variable to false as we go on with validating different fields.
    let isValid = true;

//Name
    if (isEmpty(data.name)){
        errors.name = 'Name field is required';
        isValid = false;
    }
    else {
        if (validator.isLength(data.name, {min: 4, max: 30}) == false){
            errors.name = 'Name must be between 4 and 30 characters';
            isValid = false;
        }
        if (validator.isAlpha(data.name) == false){
            errors.name = 'Name must not contain special characters or numbers';
            isValid = false;
        }
    }

//Email
    if (isEmpty(data.email)){
        errors.email = 'Email field is required';
        isValid = false;
    } 
    else if (validator.isEmail(data.email) == false){
        errors.email = 'Invalid Email Id';
        isValid = false;
    }
//Username
    if (isEmpty(data.username)){
        errors.username = 'Username field is required';
        isValid = false;
    } 
    else if (validator.isLength(data.username, {min: 2, max: 10}) == false){
        errors.username = 'Username must be between 2 and 10 characters';
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

module.exports = validateRegisterInput;