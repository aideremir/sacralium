import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import Items from './Items.vue';
import Axes from '/imports/content/Item/Weapon/Axe';

storiesOf('Инвентарь', module)
  .addDecorator(withReadme(Items.__docs))
  .add('Список предметов (Items)', () => ({
    components: { Items },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Список предметов
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Пример использования
          </h3>
          <Items
            :items="items"
            :selectedItem="selectedItem"
            mode="shop"
            @select="selectItem($event)"
          />
        </div>
      </div>
    `,
    data: () => (
      {
        items: Object.values(Axes),
        selectedItem: null,
      }
    ),
    methods: {
      selectItem(item) {
        this.selectedItem = item;
      },
    },
  }));
