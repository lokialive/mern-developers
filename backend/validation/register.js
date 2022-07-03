const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  // verify string
  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  //name part
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'The length of name must between 2 and 30'
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'The name cannot be empty!'
  }

  // email part
  if (!Validator.isEmail(data.email)) {
    errors.email = 'The email is not valid'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'The email cannot be empty!'
  }

  // password1 part
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'The length of password must between 6 and 30!'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'The password cannot be empty!'
  }

  // password2 part
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'The password2 cannot be empty!'
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'The two passwords are not the same!'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
