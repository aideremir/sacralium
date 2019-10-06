import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import BaseHeader from './BaseHeader.vue';
import LayoutMain from '/imports/client/ui/layouts/LayoutMain';

storiesOf('Компоненты', module)
  .addDecorator(withReadme(BaseHeader.__docs))
  .add('Шапка (BaseHeader)', () => ({
    components: { BaseHeader, LayoutMain },
    template: `
      <div class="sb-page">
        <LayoutMain>
          <template slot="header">
            <BaseHeader
              :character="user.character"
              :opponent="opponent.character"
              :isBattle="isBattle"
              @settingsMenuAction="settingsMenuAction"
            />
          </template>
          <div style="padding: 20px;">
            <h2 class="sb-head">
              Шапка в игре
            </h2>
            <div>
              Режим показа:
              <a
                href="#"
                @click.prevent="setBattleMode(false)"
                style="padding: 10px"
              >
                Обычный
              </a>
              <a
                href="#"
                @click.prevent="setBattleMode(true)"
                style="padding: 10px"
              >
                Идет бой
              </a>
            </div>
          </div>
        </LayoutMain> 
      </div>
    `,
    data: () => (
      {
        isBattle: false,
        user: {
          character: {
            name: 'Петя',
            power: 4324,
            experience: 34,
            experienceNext: 50,
            money: {
              'Currency/Dinar': 50,
              'Currency/Ether': 100,
            },
            health: 342,
            calculated: {
              'Attribute/Level': 5,
              'Attribute/Health': 2352,
            },
          },
        },
        opponent: {
          character: {
            name: 'Игорек',
            power: 4524,
            experience: 20,
            experienceNext: 50,
            health: 202,
            calculated: {
              'Attribute/Level': 20,
              'Attribute/Health': 235,
            },
          },
        },
      }
    ),
    methods: {
      settingsMenuAction: action('Клик по кнопке в настройках'),
      setBattleMode(mode) {
        this.isBattle = mode;
      },
    },
  }));
