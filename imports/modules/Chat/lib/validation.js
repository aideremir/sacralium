import { Meteor } from 'meteor/meteor';

export default {
  chatMessage: {
    text: {
      presence: true,
      length: {
        minimum: 1,
        maximum: Meteor.settings.public.chatMessageMaxLength,
        tooShort: 'Слишком короткое сообщение',
        tooLong: 'Слишком длинное сообщение',
      },
    },
  },
};
