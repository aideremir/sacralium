import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import CharacterLook from '/imports/client/ui/character/CharacterLook.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

import { player as character } from '/imports/client/ui/game/battle/data-examples/player-example';

storiesOf('Персонаж', module)
  .addDecorator(withReadme(CharacterLook.__docs))
  .add('Внешний вид персонажа (CharacterLook)', () => ({
    components: { CharacterLook, FrameComponent },
    data() {
      return {
        character,
      };
    },
    methods: {
      selectItem: action('Предмет выбран'),
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Внешний вид персонажа
        </h2>
        
        <FrameComponent  class="sb__frame">
          <CharacterLook
            :character="character"
            @selectItem="selectItem"
          ></CharacterLook>
        </FrameComponent>
        
      </div>
    `,
  }));
