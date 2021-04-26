const Validator = require("validator");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (data.email && !Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!data.email) {
    errors.email = "Email field is required";
  }

  if (!data.password) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
  };
};
