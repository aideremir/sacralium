import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';
import validatejs from 'validate.js';

import Validation from './validation';

import './config';

const oldHandler = Accounts.updateOrCreateUserFromExternalService;
Accounts.updateOrCreateUserFromExternalService = function(...args) {
  const [serviceName, serviceData] = args;
  const serviceIdField = `services.${serviceName}.id`;
  const isSocialUserExists = this.users.findOne(
    { [serviceIdField]: serviceData.id },
    { fields: { _id: true } },
  );
  if (!isSocialUserExists) {
    let candidateEmail = null;
    switch (serviceName) {
      case 'facebook':
        candidateEmail = serviceData.email;
        break;

      case 'google':
        if (serviceData.verified_email) {
          candidateEmail = serviceData.email;
        }
        break;

      case 'vk':
        if (serviceData.verified_email) {
          candidateEmail = serviceData.email;
        }
        break;

      default:
        throw new Meteor.Error(403, 'Неизвестный сервис аутентификации');
    }
    if (candidateEmail) {
      const existingUser = this.findUserByEmail(candidateEmail);
      if (existingUser) {
        // TODO проверять верификацию candidateEmail у existingUser
        this.users.update(
          { _id: existingUser._id },
          { $set: { [serviceIdField]: serviceData.id } },
        );
      }
    }
  }
  return oldHandler.apply(this, args);
};

/**
 * Добавляем емейл во время регистрации через соцсеть, чтобы можно было
 * автоматически делать слияние при логине через другие соцсети
 */
Accounts.onCreateUser((options, user) => {
  const updatedUser = _.cloneDeep(user);
  delete updatedUser.username;
  if (!updatedUser?.services?.password && !updatedUser?.emails?.length) {
    updatedUser.emails = [];
    Object.values(updatedUser.services).forEach((service) => {
      if (service.email) {
        updatedUser.emails.push({
          address: service.email,
          verified: false,
        });
      }
    });
  } else {
    const errors = validatejs(options, Validation.registration, { format: 'flat' });
    if (errors) {
      throw new Meteor.Error(Object.values(errors)[0][0], null, errors);
    }
  }
  return updatedUser;
});
