import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import UserHelpers from '/imports/modules/User/lib/helpers';

Meteor.publish('duelCandidates', function () {
  if (!UserHelpers.getCharacterById(this.userId)) {
    return this.error(new Meteor.Error('Персонажа не существует'));
  }
  const result = Meteor.users.find(
    {
      _id: { $ne: this.userId },
      'status.online': true,
      character: { $exists: true },
      'character.combat._id': { $exists: false },
    },
    {
      fields: {
        'character.name': true,
        'character.power': true,
        'character.combatRequest.timeout': true,
      },
    },
  );
  // eslint-disable-next-line no-underscore-dangle
  Mongo.Collection._publishCursor(result, this, 'duelCandidates');
  this.ready();
  return null;
});
