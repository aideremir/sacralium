import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BaseSelect from '/imports/client/ui/components/BaseSelect';

storiesOf('Компоненты', module)
  .addDecorator(withReadme([BaseSelect.__docs]))
  .add('Выпадающий список (BaseSelect)', () => ({
    components: {
      BaseSelect,
    },
    data() {
      return {
        selectedValue: 0,
        options: [
          {
            id: 0,
            label: 'Все',
          },
          {
            id: 1,
            label: 'Опция 1',
          },
          {
            id: 2,
            label: 'Опция 2',
          },
          {
            id: 3,
            label: 'Опция 3',
          },
          {
            id: 4,
            label: 'Опция 4',
          },
        ],
      };
    },
    methods: {
      getError(selected) {
        if (selected === 0) {
          return 'Не выбрана опция';
        }
        return null;
      },
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Выпадающий список (BaseSelect)
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Использование по умолчанию
          </h3>
          <BaseSelect :options="options" v-model="selectedValue" />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">Деактивированный (Disabled)</h3>
          <BaseSelect :options="options" disabled v-model="selectedValue"/>
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">С ошибкой</h3>
          <BaseSelect :options="options" v-model="selectedValue" :error="getError(selectedValue)"/>
        </div>
      </div>`,
  }));
