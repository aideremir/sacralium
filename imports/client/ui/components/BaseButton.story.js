import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BaseButton from './BaseButton.vue';

storiesOf('Компоненты', module)
  .addDecorator(withReadme(BaseButton.__docs))
  .add('Кнопка (BaseButton)', () => ({
    components: { BaseButton },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Стандартная кнопка
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Обычное использование
          </h3>
          <BaseButton
            :text="text"
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Светлая версия
          </h3>
          <BaseButton
            light
            :text="text"
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Деактивирована
          </h3>
          <BaseButton
            disabled
            :text="text"
          />
        </div>
      </div>
    `,
    data: () => (
      {
        text: 'Название кнопки',
      }
    ),
  }));
