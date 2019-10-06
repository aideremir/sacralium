import { Meteor } from 'meteor/meteor';

import UserHelpers from '/imports/modules/User/lib/helpers';

import collection from './collection';

Meteor.publish('chat', function () {
  if (!UserHelpers.getCharacterById(this.userId)) {
    return null;
  }
  return collection.find(
    {},
    {
      fields: { userId: false },
      sort: { timestamp: -1 },
      limit: Meteor.settings.private.chatHistoryLength,
    },
  );
});
