import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import ItemCategory from './ItemCategory.vue';

storiesOf('Инвентарь', module)
  .addDecorator(withReadme(ItemCategory.__docs))
  .add('Элемент списка категорий (ItemCategory)', () => ({
    components: { ItemCategory },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Элемент списка категорий
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Обычное использование
          </h3>
          <ItemCategory
            :category="category"
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            С заголовком
          </h3>
          <ItemCategory
            :category="category"
            showTitle
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Выбрана
          </h3>
          <ItemCategory
            :category="category"
            :selected="selected"
            @click="selected = !selected"
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Деактивирована
          </h3>
          <ItemCategory
            :category="category"
            :disabled="true"
          />
        </div>
      </div>
    `,
    data: () => (
      {
        category: 'Item/Weapon/Axe',
        selected: true,
      }
    ),
  }));
