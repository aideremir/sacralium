import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import StoryRouter from 'storybook-vue-router';

import LayoutGame from './LayoutGame';

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

storiesOf('Блоки', module)
  .addDecorator(withReadme(LayoutGame.__docs))
  .addDecorator(StoryRouter())
  .add('Игровой layout (LayoutGame)', () => ({
    components: { LayoutGame },
    data: () => ({
      messageList,
      user: {
        character: {
          name: 'Петя',
        },
      },
    }),
    methods: {
      saveMessage(text) {
        this.messageList.push({
          text,
          timestamp: Date.now(),
          characterName: this.user.character.name,
          _id: Date.now(),
        });
      },
    },
    template: `
      <div class="sb-page">
        <LayoutGame
          :messageList="messageList"
          :user="user"
          @sendChatMessage="saveMessage"
          >
          <div style="padding:20px">
            <h2 class="sb-head">
              LayoutGame              
            </h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sem eros, ultrices id lobortis id, 
            iaculis vitae diam. Phasellus commodo ut justo eu vestibulum. Fusce nulla sem, consectetur eget neque in, 
            mattis euismod erat. Vivamus turpis sem, elementum quis condimentum non, scelerisque id justo. 
            Integer dictum enim nisi, at sollicitudin libero congue ut. Donec aliquam euismod purus, et tempor dui volutpat eu. 
            Nam nec eros vitae odio porttitor venenatis non id turpis. Praesent interdum velit at ipsum euismod dapibus. 
            Mauris vestibulum sem sem, eu sollicitudin tellus rhoncus nec.</p>
            <p>Cras ultricies in leo id molestie. Phasellus vehicula mattis sagittis. Nullam imperdiet, mi at interdum facilisis, 
            sapien felis convallis sem, eget vehicula ipsum nisi vitae est. Vivamus eget malesuada nibh. 
            Maecenas lacus purus, dapibus sit amet enim vel, ultrices tincidunt metus. In tincidunt lorem enim, 
            sit amet ullamcorper sapien iaculis eget. Vestibulum rutrum consequat eleifend. Aliquam erat volutpat. 
            Mauris sodales nibh nec suscipit tempor. Phasellus dolor justo, rhoncus non justo sed, eleifend placerat nisi. 
            Nam viverra tristique metus ac interdum. Donec quis fringilla augue. Nulla a convallis leo, a hendrerit elit. 
            Suspendisse id magna est. Donec non nunc feugiat, aliquam ante eget, congue mauris. Ut et enim tellus.</p>
          </div>
        </LayoutGame>
      </div>
    `,
  }));
