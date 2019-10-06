import { Meteor } from 'meteor/meteor';

Meteor.users._ensureIndex({
  'status.online': 1,
});

Meteor.users._ensureIndex({
  'character.combat._id': 1,
});

Meteor.users._ensureIndex({
  'character.combatRequest.timeout': 1,
});
