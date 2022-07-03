const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateEducationInput(data) {
  let errors = {}

  // verify string
  data.school = !isEmpty(data.school) ? data.school : ''
  data.degree = !isEmpty(data.degree) ? data.degree : ''
  data.filedOfStudy = !isEmpty(data.filedOfStudy) ? data.filedOfStudy : ''
  data.from = !isEmpty(data.from) ? data.from : ''

  // school part
  if (Validator.isEmpty(data.school)) {
    errors.school = 'The school cannot be empty!'
  }

  // degree part
  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'The degree cannot be empty!'
  }

  // degree part
  if (Validator.isEmpty(data.filedOfStudy)) {
    errors.filedOfStudy = 'The filedOfStudy cannot be empty!'
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
