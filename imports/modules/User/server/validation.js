import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';
import validatejs from 'validate.js';

import Validation from '../lib/validation';

validatejs.validators['User.checkEmailExistence'] = function (email) {
  const errors = validatejs.single(email, Validation.registration.email);
  if (!errors && Accounts.findUserByEmail(email)) {
    return ['Такой e-mail уже занят'];
  }
  return undefined;
};

validatejs.validators['User.checkCharacterExistence'] = function (name) {
  const errors = validatejs.single(name, Validation.characterCreation.name);
  if (!errors && Meteor.users.findOne(
    { 'character.name': name },
    { fields: { _id: true } },
  )) {
    return ['Такое имя уже занято'];
  }
  return undefined;
};

export default {
  registration: _.merge(_.cloneDeep(Validation.registration), {
    email: {
      'User.checkEmailExistence': true,
    },
    password: {
      presence: {
        allowEmpty: false,
        message: 'Пароль обязателен',
      },
    },
  }),

  characterCreation: _.merge(_.cloneDeep(Validation.characterCreation), {
    name: {
      'User.checkCharacterExistence': true,
    },
  }),
};
