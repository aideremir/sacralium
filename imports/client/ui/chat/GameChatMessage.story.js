import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import GameChatMessage from './GameChatMessage';

storiesOf('Игровой чат', module)
  .addDecorator(withReadme(GameChatMessage.__docs))
  .add('Сообщение чата', () => ({
    components: { GameChatMessage },
    data: () => ({
      message: {
        characterName: 'Петя',
        timestamp: Date.now(),
        text: 'Привет',
      },
    }),
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Сообщение чужое
        </h2>
        <div class="sb-version">
          <GameChatMessage 
            :message="message"
            @click="selectNickName"
          />
        </div>
        <h2 class="sb-head">
          Сообщение свое
        </h2>
        <div class="sb-version">
          <GameChatMessage class="GameChatMessage__messageOwn"
            :message="message"
            @click="selectNickName"
          />
        </div>
      </div>`,
    methods: {
      selectNickName: action('Выбрать получателя'),
    },
  }));
