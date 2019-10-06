import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import ItemCategories from './ItemCategories.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

storiesOf('Инвентарь', module)
  .addDecorator(withReadme(ItemCategories.__docs))
  .add('Список категорий (ItemCategories)', () => ({
    components: { ItemCategories, FrameComponent },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Список категорий
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Пример использования
          </h3>
          <FrameComponent>
            <ItemCategories
              :categories="categories"
              :selectedCategory="selectedCategory"
              @select="selectCategory($event)"
            />
          </FrameComponent>          
        </div>
      </div>
    `,
    data: () => (
      {
        categories: [
          'Item/Weapon/Axe',
          'Item/Weapon/Knife',
          'Item/Weapon/Mace',
          'Item/Weapon/Sword',
        ],
        selectedCategory: null,
      }
    ),
    methods: {
      selectCategory(category) {
        this.selectedCategory = category;
      },
    },
  }));
