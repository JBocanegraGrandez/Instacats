const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validatePostInput(data) {
    let errors = {}

    data.caption = validText(data.caption) ? data.caption : '';
    data.img = validText(data.img) ? data.img : '';

    if (!Validator.isLength(data.caption, {min: 0, max: 2200})) {
        errors.caption = "Caption is too long, maximun is 2200 chars"
    }

    if (Validator.isEmpty(data.img)) {
        errors.img = "Could not load the image, please try again"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}