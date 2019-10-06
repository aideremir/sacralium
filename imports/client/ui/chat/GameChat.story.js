import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import GameChat from './GameChat';

const messageList = [
  {
    timestamp: Date.now() - 1000,
    characterName: 'Вася',
    text: 'сообщение в чат',
    _id: Date.now() - 1000,
  },
  {
    timestamp: Date.now() - 2000,
    characterName: 'Вася',
    text: 'сообщение в чат',
    _id: Date.now() - 2000,
  },
  {
    timestamp: Date.now(),
    characterName: 'Вася',
    text: 'сообщение в чат',
    _id: Date.now(),
  },
];

storiesOf('Игровой чат', module)
  .addDecorator(withReadme(GameChat.__docs))
  .add('Чат (GameChat)', () => ({
    components: {
      GameChat,
    },
    data: () => ({
      messageList,
      userName: 'Петя',
    }),
    template: `
      <div class="sb-page sb-page_withPaddings">
          <h2 class="sb-head">
            Чат (GameChat)
          </h2>
          <div class="sb-version">
            <GameChat 
              :messageList="messageList"
              :characterName="userName"
              show
              @submit="saveMessage"
              @close="closeChat"
            />
          </div>
      </div>
    `,
    methods: {
      saveMessage(text) {
        const message = {
          timestamp: Date.now(),
          characterName: this.userName,
          text,
          _id: Date.now(),
        };
        this.messageList.push(message);
      },
      closeChat: action('Закрыть окно чата'),
    },
  }));
