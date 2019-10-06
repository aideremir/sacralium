import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';


import UserSignUp from './UserSignUp.vue';

storiesOf('Авторизация', module)
  .addDecorator(withReadme(UserSignUp.__docs))
  .add('Регистрация (UserSignUp)', () => ({
    components: { UserSignUp },
    template: `
      <div
        class="
          sb-page
          sb-page_withPaddings
          sb-flex
          sb-flex_middle
          sb-flex_center
        "
      >
        <UserSignUp
          :validators="validators"
          @switchForm="switchForm"
          @signUp="signUp"
        />
      </div>
    `,
    data: () => ({
      validators: {
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
          password: {
            presence: true,
            length: {
              minimum: 1,
              message: 'Пароль обязателен',
            },
          },
          passwordRepeat: {
            presence: true,
            equality: {
              attribute: 'password',
              message: 'Пароли не совпадают',
            },
          },
          acceptLicense: {
            presence: true,
            inclusion: {
              within: [true],
              message: 'Для регистрации нужно принять условия пользовательского соглашения',
            },
          },
        },
      },
    }),
    methods: {
      switchForm: action('Смена пользователя'),
      signUp: action('Регистрация пользователя'),
    },
  }));
