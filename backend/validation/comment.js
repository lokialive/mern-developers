const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateCommentInput(data) {
  let errors = {}

  // verify string
  data.text = !isEmpty(data.text) ? data.text : ''

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Comment cannot be empty!'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
