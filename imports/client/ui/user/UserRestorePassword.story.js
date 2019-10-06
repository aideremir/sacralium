import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';


import UserRestorePassword from './UserRestorePassword.vue';

storiesOf('Авторизация', module)
  .addDecorator(withReadme(UserRestorePassword.__docs))
  .add('Сброс пароля (UserRestorePassword)', () => ({
    components: { UserRestorePassword },
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
        <UserRestorePassword
          :validators="validators"
          @resetPassword="resetPassword"
        />
      </div>
    `,
    data: () => ({
      validators: {
        registration: {
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
        },
      },
    }),
    methods: {
      resetPassword: action('Смена пароля'),
    },
  }));
