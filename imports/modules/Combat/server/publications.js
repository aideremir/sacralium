import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import UserHelpers from '/imports/modules/User/lib/helpers';

import CombatCollection from './collection';

Meteor.publish('combat', function (_id) {
  check(_id, String);
  if (!UserHelpers.getCharacterById(this.userId)) {
    return null;
  }
  return CombatCollection.find(
    {
      _id,
      participants: this.userId,
    },
    {
      fields: {
        [`userActions.${this.userId}`]: true,
        timeout: true,
        winnerId: true,
        log: true,
      },
    },
  );
});

Meteor.publish('combatParticipants', function () {
  const character = UserHelpers.getCharacterById(this.userId);
  if (!character) {
    return null;
  }
  const result = Meteor.users.find(
    {
      _id: { $ne: this.userId },
      $and: [
        { 'character.combat._id': character.combat._id },
        { 'character.combat._id': { $exists: true } },
      ],
    },
    {
      fields: {
        'character.name': true,
        'character.gender': true,
        'character.experience': true,
        'character.distributedAttributes': true,
        'character.equipment': true,
        'character.combat': true,
      },
    },
  );
  // eslint-disable-next-line no-underscore-dangle
  Mongo.Collection._publishCursor(result, this, 'combatParticipants');
  this.ready();
  return null;
});
