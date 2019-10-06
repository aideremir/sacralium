import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BaseInput from './BaseInput.vue';

storiesOf('Компоненты', module)
  .addDecorator(withReadme(BaseInput.__docs))
  .add('Текстовое поле (BaseInput)', () => ({
    components: { BaseInput },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Текстовое поле (BaseInput)
        </h2>

        <div class="sb-version">
          <BaseInput
            label="Заголовок поля"
            v-model="value"
            legend="Текст ПОД полем"
            placeholder="Плейсхолдер"
            showCount
            min="50"
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Вывод ошибок
          </h3>
          <BaseInput
            :error="error"
            v-model="value"
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Поле одобрено
          </h3>
          <BaseInput
            :isAccept="isAccept"
            v-model="value"
          />
        </div>
      </div>
    `,
    data: () => (
      {
        switchUserType: () => false,
        error: 'Какая-то супер-ошибочка',
        isAccept: true,
        value: 'Какое-то содержание',
      }
    ),
  }));
