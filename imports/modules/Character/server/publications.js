import { Meteor } from 'meteor/meteor';

Meteor.publish('character', function () {
  if (!this.userId) {
    return null;
  }
  return Meteor.users.find(
    { _id: this.userId },
    { fields: { character: true } },
  );
});
