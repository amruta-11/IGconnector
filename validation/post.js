const validator = require('validator');

function validatePostInput(data){
    let errors = {};
    let isValid = true;
    
    //ImageURL
    if (validator.isURL(data.imageURL) == false){
        errors.website = 'Invalid image URL';
        isValid = false;
    }

    //Content
    if (typeof data.content !== 'undefined' && validator.isLength(data.content, { max: 1000}) == false) {
        errors.name = 'Content must be less than 1000 characters';
        isValid = false;
    }
    return {
        errors,
        isValid
    }
}

module.exports = validatePostInput;