import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import UserRemind from './UserRemind.vue';

storiesOf('Авторизация', module)
  .addDecorator(withReadme(UserRemind.__docs))
  .add('Напоминание пароля (UserRemind)', () => ({
    components: { UserRemind },
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
        <UserRemind
          email="email@address.ru"
          @switchForm="switchForm"
          @restorePassword="restorePassword"
          :validators="validators"
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
      switchForm: action('Переключение формы'),
      restorePassword: action('Восстановление пароля'),
    },
  }));
