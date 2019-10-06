import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import StoryRouter from 'storybook-vue-router';

import CharacterInformer from './CharacterInformer.vue';
import LayoutGame from '/imports/client/ui/layouts/LayoutGame';

storiesOf('Персонаж', module)
  .addDecorator(withReadme(CharacterInformer.__docs))
  .addDecorator(StoryRouter())
  .add('Информер в шапке (CharacterInformer)', () => ({
    components: {
      CharacterInformer,
      LayoutGame,
    },
    template: `
      <div class="sb-page">
        <LayoutGame
          :messageList="messageList"
          :user="user"
        >
          <template slot="header">
            <div style="display:flex;">
              <div style="display:flex; align-items:flex-end; height:50px; margin-left:-5px">
                <CharacterInformer
                  :character="user.character"
                />
              </div>

              <div style="display:flex; align-items:flex-end; height:50px; margin-left:10px">
                <CharacterInformer
                  opponent
                  :character="opponent.character"
                />
              </div>
            </div>
          </template>

          <div style="padding:20px">
            <h2 class="sb-head">
              Информер в шапке
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
      opponent: {
        character: {
          name: 'Игорек',
          power: 4524,
          experience: 20,
          experienceNext: 50,
          calculated: {
            'Attribute/Level': 20,
          },
        },
      },
    }),
  }));
