import validatejs from 'validate.js';
import _ from 'lodash';

import helpers from '/imports/client/ui/helpers/common';

export default {
  data() {
    return {
      hasError: false,
      form: {},
      errors: {},
    };
  },
  watch: {
    form: {
      deep: true,
      handler: _.debounce(function() { this.validate(false); }, 500),
    },
  },
  methods: {
    validate(validateAll) {
      let validatorObj = this.validator;
      if (validateAll) {
        this.form = _.mapValues(this.form, value => (value === null ? '' : value));
      } else {
        validatorObj = helpers.validatorOptionalize(validatorObj);
      }
      const errors = validatejs(this.form, validatorObj, { fullMessages: false });
      Object.keys(this.form).forEach((field) => {
        if (field !== null && !this.errors[`${field}Async`]) {
          this.errors[field] = _.get(errors, [field, 0], '');
        }
      });
      this.hasError = !!errors;
    },
    checkForm() {
      this.validate(true);
      if (!this.hasError) {
        this.submitForm();
      }
    },
  },
};
