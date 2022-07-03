const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
  let errors = {}

  // verify string
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  // email part
  if (!Validator.isEmail(data.email)) {
    errors.email = 'The email is not valid!'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'The email cannot be empty!'
  }

  // password part
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'The length of password must between 6 and 30!'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'The password cannot be empty!'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
