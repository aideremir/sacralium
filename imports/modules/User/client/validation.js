import _ from 'lodash';
import validatejs from 'validate.js';

import helpers from '/imports/client/ui/helpers/meteor';

import Validation from '../lib/validation';

validatejs.validators['User.checkEmailExistence'] = function (email) {
  return helpers.meteorCallPromise('User.checkEmail', email);
};

validatejs.validators['User.checkCharacterExistence'] = function (name) {
  return helpers.meteorCallPromise('User.checkCharacterName', name);
};

export default {
  login: {
    email: _.cloneDeep(Validation.registration.email),
  },

  registration: _.merge(_.cloneDeep(Validation.registration), {
    password: {
      presence: true,
      length: {
        minimum: 1,
        message: 'Пароль обязателен',
      },
    },
    passwordRepeat: {
      presence: true,
      equality: {
        attribute: 'password',
        message: 'Пароли не совпадают',
      },
    },
    acceptLicense: {
      presence: true,
      inclusion: {
        within: [true],
        message: 'Для регистрации нужно принять условия пользовательского соглашения',
      },
    },
  }),

  registrationAsync: {
    email: {
      'User.checkEmailExistence': true,
    },
  },

  characterCreation: {
    name: _.cloneDeep(Validation.characterCreation.name),
  },

  characterCreationAsync: {
    name: {
      'User.checkCharacterExistence': true,
    },
  },
};
