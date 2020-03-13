const validator = require('validator');
const isEmpty = require('./isEmpty')

function validateProfileInput(data){
    let errors = {};
    let isValid = true;
    
//Website
    if (validator.isURL(data.website) == false){
        errors.website = 'Invalid website URL';
        isValid = false;
    }
//Bio
    if (validator.isLength(data.bio, { max: 250}) == false){
        errors.name = 'Bio must be less than 250 characters';
        isValid = false;
    }
    return {
        errors,
        isValid
    }
}

module.exports = validateProfileInput;