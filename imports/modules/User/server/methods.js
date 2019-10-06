import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import validatejs from 'validate.js';

import UserHelpers from '/imports/modules/User/lib/helpers';
import CharacterManager from '/imports/modules/Character/server/Manager';

import Validation from './validation';

Meteor.methods({
  'User.checkEmail'(email) {
    check(email, String);
    return validatejs.single(email, Validation.registration.email);
  },

  'User.checkCharacterName'(name) {
    check(name, String);
    return validatejs.single(name, Validation.characterCreation.name);
  },

  'User.createCharacter'(name, gender) {
    check(name, String);
    check(gender, String);
    if (!this.userId) {
      throw new Meteor.Error('Пользователь не найден');
    }
    if (UserHelpers.getCharacterById(this.userId)) {
      throw new Meteor.Error('Персонаж уже существует');
    }
    const errors = validatejs({ name, gender }, Validation.characterCreation);
    if (errors) {
      throw new Meteor.Error(Object.values(errors)[0][0], null, errors);
    }

    Meteor.users.update(
      {
        _id: this.userId,
        character: { $exists: false },
      },
      {
        $set: {
          character: {
            name,
            gender,
            ...Meteor.settings.private.blankCharacter,
          },
        },
      },
    );
    CharacterManager.updatePower(this.userId);
  },

  'User.getCharacterInfoById'(id) {
    check(id, String);

    if (!this.userId) {
      throw new Meteor.Error('Пользователь не найден');
    }

    const user = Meteor.users.findOne(
      {
        _id: id,
        character: { $exists: true },
      },
      {
        fields: {
          'character.name': true,
          'character.gender': true,
          'character.experience': true,
          'character.distributedAttributes': true,
          'character.equipment': true,
          'character.combatRequest': true,
        },
      },
    );

    if (!user) {
      throw new Meteor.Error('Персонаж не найден');
    }

    return user.character;
  },
});
