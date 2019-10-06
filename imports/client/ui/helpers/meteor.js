import { Meteor } from 'meteor/meteor';

export default {
  meteorCallPromise(method, ...args) {
    return new Promise((resolve, reject) => {
      Meteor.call(method, ...args, (error, result) => {
        if (error === undefined || error === null) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
};
