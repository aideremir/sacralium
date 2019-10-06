import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BaseCheckbox from './BaseCheckbox.vue';

storiesOf('Компоненты', module)
  .addDecorator(withReadme(BaseCheckbox.__docs))
  .add('Чекбокс (BaseCheckbox)', () => ({
    components: { BaseCheckbox },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Чекбокс
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">Обычный чекбокс</h3>
          <BaseCheckbox v-model="checked">
            Я принимаю условия пользовательского соглашения
          </BaseCheckbox>
        </div>

        <div class="sb-version">
          <h3 class="sb-version__head">Деактивированный (Disabled)</h3>
          <BaseCheckbox
            v-model="checked"
            disabled
          >
            Деактивированный чекбокс нажимать нельзя
          </BaseCheckbox>
        </div>

        <div class="sb-version">
          <h3 class="sb-version__head">Ошибка</h3>
          <BaseCheckbox
            v-model="checked"
            :error="getError(checked)"
          >
            Чекбокс с ошибкой при снятии галки
          </BaseCheckbox>
        </div>
      </div>
    `,
    data: () => ({
      checked: false,
    }),
    methods: {
      getError(checked) {
        if (!checked) {
          return 'Ошибка заполнения этого поля';
        }
        return null;
      },
    },
  }));
