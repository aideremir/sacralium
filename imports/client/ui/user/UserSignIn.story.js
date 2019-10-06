import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';


import UserSignIn from './UserSignIn.vue';

storiesOf('Авторизация', module)
  .addDecorator(withReadme(UserSignIn.__docs))
  .add('Авторизация (UserSignIn)', () => ({
    components: { UserSignIn },
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
        <UserSignIn
          @switchForm="switchForm"
          :validators="validators"
          @restorePassword="restorePassword"
          @signIn="signIn"
          @signInWith="signInWith"
        />
      </div>
    `,
    data: () => ({
      validators: {
        login: {
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
      },
    }),
    methods: {
      switchForm: action('Переключение в регистрацию'),
      restorePassword: action('Восстановление пароля'),
      signIn: action('Авторизация'),
      signInWith: action('Вход через социальную сеть'),
    },
  }));
