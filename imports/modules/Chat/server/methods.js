import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import validatejs from 'validate.js';

import UserHelpers from '/imports/modules/User/lib/helpers';

import collection from './collection';
import Validation from '../lib/validation';

Meteor.methods({
  'Chat.postMessage'(text) {
    check(text, String);

    const character = UserHelpers.getCharacterById(this.userId);
    if (!character) {
      throw new Meteor.Error('Персонажа не существует');
    }

    const errors = validatejs({ text }, Validation.chatMessage);
    if (errors) {
      throw new Meteor.Error(Object.values(errors)[0][0], null, errors);
    }

    collection.insert({
      userId: this.userId,
      characterName: character.name,
      timestamp: new Date(),
      text,
    });
  },
});
