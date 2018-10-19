const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.degree = !isEmpty(data.degree) ? data.title : '';
  data.school = !isEmpty(data.school) ? data.degree : '';
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
  data.fromDate = !isEmpty(data.fromDate) ? data.fromDate : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'School title is required';
  }
  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }
  if (Validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'Field of Study is required';
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree is required';
  }
  if (Validator.isEmpty(data.fromDate)) {
    errors.fromDate = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors), // if errors exist, it's not valid
  };
};
