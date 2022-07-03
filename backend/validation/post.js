const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
  let errors = {}

  // verify string
  data.text = !isEmpty(data.text) ? data.text : ''

  // text part
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'The content length must between 10 and 300!'
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = 'The text is not valid!'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
