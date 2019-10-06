import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-vue-router';

import HeaderSettings from './HeaderSettings.vue';
import LayoutGame from '/imports/client/ui/layouts/LayoutGame';

storiesOf('Компоненты', module)
  .addDecorator(withReadme(HeaderSettings.__docs))
  .addDecorator(StoryRouter())
  .add('Кнопка "настройки" в шапке (HeaderSettings)', () => ({
    components: {
      HeaderSettings,
      LayoutGame,
    },
    template: `
      <div class="sb-page">
        <LayoutGame
          :messageList="messageList"
          :user="user"
        >
          <template slot="header">
            <div
              style="
                display:flex;
                justify-content:flex-end;
                padding: 7px;
              "
            >
              <HeaderSettings
                @settingsMenuAction="settingsMenuAction"
              />
            </div>
          </template>
          <div style="padding:20px">
            <h2 class="sb-head">
              Кнопка "настройки" в шапке
            </h2>
          </div>
        </LayoutGame>
      </div>
    `,
    data: () => ({
      messageList: () => [],
      user: {
        character: {
          name: 'Петя',
          power: 4324,
          experience: 34,
          experienceNext: 50,
          calculated: {
            'Attribute/Level': 5,
          },
        },
      },
    }),
    methods: {
      settingsMenuAction: action('Меню настроек'),
    },
  }));
