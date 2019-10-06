import { Meteor } from 'meteor/meteor';

import UserHelpers from '/imports/modules/User/lib/helpers';

import collection from './collection';

Meteor.publish('inventory', function () {
  if (!UserHelpers.getCharacterById(this.userId)) {
    return null;
  }
  return collection.find(
    { userId: this.userId },
    { fields: { userId: false } },
  );
});
