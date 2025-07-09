const {isRequired, isFullName, isArray, isContact, isValidDate, isEmail} = require('./')

exports.USER_CREATE = {
    email: isEmail,
    fullName: isFullName,
    contact: isContact,
}