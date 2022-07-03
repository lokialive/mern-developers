const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateExperienceInput(data) {
  let errors = {}

  // verify string
  data.title = !isEmpty(data.title) ? data.title : ''
  data.company = !isEmpty(data.company) ? data.company : ''
  data.from = !isEmpty(data.from) ? data.from : ''

  // title part
  if (Validator.isEmpty(data.title)) {
    errors.title = 'The title cannot be empty!'
  }

  // company part
  if (Validator.isEmpty(data.company)) {
    errors.company = 'The company cannot be empty!'
  }

  // from part
  if (Validator.isEmpty(data.from)) {
    errors.from = 'The from cannot be empty!'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
