import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BaseRadio from './BaseRadio.vue';

storiesOf('Компоненты', module)
  .addDecorator(withReadme(BaseRadio.__docs))
  .add('Радио-кнопка (BaseRadio)', () => ({
    components: { BaseRadio },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Радио-кнопка
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Обычный список кнопок с единым значением
          </h3>

          <div>
            <b>Значение:</b> {{radioValue}}
          </div>

          <BaseRadio
            value="Пункт1"
            v-model="radioValue"
          >
            Некоторый текст
          </BaseRadio>
          <BaseRadio
            value="Пункт2"
            v-model="radioValue"
            :checked="checked"
          >
            Другой пункт
          </BaseRadio>
          <BaseRadio
            value="Пункт Назначения"
            v-model="radioValue"
            :disabled="disabled"
          >
            Деактивированный пункт
          </BaseRadio>
          <BaseRadio
            value="Пункт3"
            v-model="radioValue"
          >
            Третий пункт
          </BaseRadio>
        </div>

        <div class="sb-version">
          <h3 class="sb-version__head">
            Горизонтальный вид
          </h3>
          <div
            style="
              display: flex;
              flex-direction: row;
            "
          >
            <BaseRadio
              value="Пункт1"
              v-model="radioValue2"
              :checked="checked"
            >
              Две и более полноценных строк
            </BaseRadio>
            <BaseRadio
              value="Пункт2"
              v-model="radioValue2"
            >
              Другой
            </BaseRadio>
            <BaseRadio
              value="Пункт3"
              v-model="radioValue2"
            >
              Третий
            </BaseRadio>
          </div>
        </div>
      </div>
    `,
    data: () => (
      {
        disabled: true,
        text: 'Радио-кнопка',
        radioValue: '',
        radioValue2: '',
        checked: true,
      }
    ),
  }));
