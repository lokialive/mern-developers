const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
  let errors = {}

  // verify string
  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.status = !isEmpty(data.status) ? data.status : ''
  data.skills = !isEmpty(data.skills) ? data.skills : ''
  data.website = !isEmpty(data.website) ? data.website : ''
  data.github = !isEmpty(data.github) ? data.github : ''
  data.email = !isEmpty(data.email) ? data.email : ''

  // handle part
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'The length of handle must between 2 and 40!'
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle cannot be empty!'
  }

  // status part
  if (!Validator.isLength(data.status, { min: 1, max: 30 })) {
    errors.status = 'The length of status must between 1 and 30!'
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = 'The status cannot be empty!'
  }

  //skills part
  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'The skills cannot be empty!'
  }

  //url part
  if (!Validator.isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'URL is not valid!'
    }
  }

  //email part
  if (!Validator.isEmpty(data.email)) {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'email is not valid!'
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
