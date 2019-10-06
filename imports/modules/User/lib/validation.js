export default {
  registration: {
    email: {
      presence: true,
      length: {
        minimum: 3,
        message: 'Слишком короткий e-mail',
      },
      format: {
        pattern: '.*@.*',
        message: 'E-mail должен содержать @',
      },
    },
  },

  characterCreation: {
    name: {
      presence: true,
      length: {
        minimum: 3,
        message: 'Слишком короткое имя',
      },
    },
    gender: {
      presence: true,
      inclusion: ['male', 'female'],
    },
  },
};
