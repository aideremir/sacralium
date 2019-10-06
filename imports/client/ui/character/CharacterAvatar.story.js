import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import CharacterAvatar from './CharacterAvatar.vue';

storiesOf('Персонаж', module)
  .addDecorator(withReadme(CharacterAvatar.__docs))
  .add('Аватар персонажа (CharacterAvatar)', () => ({
    components: { CharacterAvatar },
    template: `
      <div
        class="sb-page sb-page_withPaddings"
        style="
          height: auto;
          padding-bottom: 50px;
        "
      >
        <h2 class="sb-head">
          Аватар персонажа
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Мужчина
          </h3>
          <CharacterAvatar
            :background="background"
            style="max-width: 300px"
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Женщина (отраженный)
          </h3>
          <CharacterAvatar
            :isMirrored="mirror"
            gender="female"
            :background="background"
            style="max-width: 300px"
          />
        </div>
        <div
          style="
            display:block;
            position:fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #CCC;
            padding: 5px;
          "
        >
          <b>Фон:</b>
          <a
            href="#"
            style="
              display: inline-block;
              padding: 5px;
            "
            @click.prevent="setBackground('neutral')"
          >
            нейтральный
          </a>
          <a
            href="#"
            style="
              display: inline-block;
              padding: 5px;
            "
            @click.prevent="setBackground('dark')"
          >
            темный
          </a>
          <a
            href="#"
            style="
              display: inline-block;
              padding: 5px;
            "
            @click.prevent="setBackground('light')"
          >
            светлый
          </a>
          <a
            href="#"
            style="
              display: inline-block;
              padding: 5px;
            "
            @click.prevent="setBackground(null)"
          >
            снять
          </a>
        </div>
      </div>
    `,
    data: () => (
      {
        text: 'Аватар персонажа',
        background: '',
        mirror: true,
      }
    ),
    methods: {
      setBackground(name) {
        this.background = name;
      },
    },
  }));
