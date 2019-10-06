import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import CharacterCreate from './CharacterCreate.vue';

storiesOf('Персонаж', module)
  .addDecorator(withReadme(CharacterCreate.__docs))
  .add('Создание персонажа (CharacterCreate)', () => ({
    components: { CharacterCreate },
    template: `
      <div
        class="
          sb-page
          sb-flex
          sb-flex_center
          sb-flex_middle
        "
      >
        <CharacterCreate
          @createCharacter="characterCreate"
          :validators="validators"
        />
      </div>
    `,
    data: () => ({
      validators: {
        characterCreation: {
          name: {
            presence: true,
            length: {
              minimum: 3,
              maximum: 16,
              tooShort: 'Слишком короткое имя',
              tooLong: 'Имя должно быть не длиннее 16 символов',
            },
          },
        },
      },
    }),
    methods: {
      characterCreate: action('Создаем характера'),
    },
  }));
