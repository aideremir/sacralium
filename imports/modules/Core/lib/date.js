import { Meteor } from 'meteor/meteor';

export default {
  Date() {
    if (Meteor.isServer) {
      return new Date();
    }
    // TODO возвращать откорректированное время на клиенте
    return new Date();
  },
};
