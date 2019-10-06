import { Meteor } from 'meteor/meteor';

function getSanitizedUserById(_id) {
  if (!_id) {
    return null;
  }
  return Meteor.users.findOne(
    { _id },
    { fields: { character: true } },
  );
}

export default {
  getSanitizedUserById,
  getCharacterById(_id) {
    return getSanitizedUserById(_id)?.character;
  },
};
