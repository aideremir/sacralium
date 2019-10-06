import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import Axe from '/imports/content/Item/Weapon/Axe/lib/Hack';

import Item from './Item.vue';

storiesOf('Инвентарь', module)
  .addDecorator(withReadme(Item.__docs))
  .add('Элемент списка предметов (Item)', () => ({
    components: { Item },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Элемент списка предметов
        </h2>
        <div class="sb-version">
          <Item
            :item="item"
            mode="shop"
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Выбран
          </h3>
          <Item
            :item="item"
            :selected="selected"
            mode="shop"
            @click="selected = !selected"
          />
        </div>
      </div>
    `,
    data: () => (
      {
        item: Axe,
        selected: true,
      }
    ),
  }));
