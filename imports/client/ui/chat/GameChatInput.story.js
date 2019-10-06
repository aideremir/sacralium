import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import GameChatInput from './GameChatInput';

storiesOf('Игровой чат', module)
  .addDecorator(withReadme(GameChatInput.__docs))
  .add('Поле ввода сообщения', () => ({
    components: { GameChatInput },
    data: () => ({
      message: '',
    }),
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Поле ввода сообщения
        </h2>
        <div class="sb-version">
          <GameChatInput 
            v-model="message"
            @submit="saveMessage"
          />
        </div>
      </div>`,
    methods: {
      saveMessage: action('Сохранить сообщение'),
    },
  }));
