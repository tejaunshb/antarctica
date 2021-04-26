const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!data.first_name) {
    errors.first_name = "First Name is required";
  }
  if (!data.last_name) {
    errors.last_name = "Last Name is required";
  }

  if (!data.email) {
    errors.email = "Email is required";
  }

  if (data.email && !Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  if (
    data.password &&
    !Validator.isLength(data.password, { min: 6, max: 30 })
  ) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!data.password2) {
    errors.password2 = "Confirm Password  is required";
  }

  if (
    (data.password, data.password2) &&
    !Validator.equals(data.password, data.password2)
  ) {
    errors.password2 = "Passwords must match";
  }

  if (!data.organizationName) {
    errors.organizationName = "Organization Name is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
  };
};
