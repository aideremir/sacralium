import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-vue-router';

import BaseMenu from '/imports/client/ui/components/BaseMenu';
import BaseMenuItem from '/imports/client/ui/components/BaseMenuItem';

storiesOf('Компоненты', module)
  .addDecorator(withReadme([BaseMenuItem.__docs, BaseMenu.__docs]))
  .addDecorator(StoryRouter())
  .add('Главное меню (BaseMenu)', () => ({
    components: {
      BaseMenu,
      BaseMenuItem,
    },
    data() {
      return {
        items: [
          {
            name: 'Лог',
            active: true,
          },
          {
            name: 'Инвентарь',
            slug: 'items',
          },
        ],
      };
    },
    methods: {
      clickHandler: action('клик по пункту меню'),
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
          <h2 class="sb-head">
            Главное меню (BaseMenu)
          </h2>
          <div class="sb-version">
          <h3 class="sb-version__head">
            Использование по-умолчанию
          </h3>
            <base-menu class="LayoutGame__footer"/> 
        </div>
         <div class="sb-version">
          <h3 class="sb-version__head">
            Использование кастомных пунктов
          </h3>
            <base-menu class="LayoutGame__footer"> 
              <base-menu-item
                v-for="item in items"
                :text="item.name"
                :key="item.slug"
                :to="item.slug"
                :active="item.active"
                @click="clickHandler(item.name)"
              />
            </base-menu>
        </div>
      </div>`,
  }));
