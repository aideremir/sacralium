import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { action } from '@storybook/addon-actions';

import Hack from '/imports/content/Item/Weapon/Axe/lib/Hack';
import Reckless from '/imports/content/Item/Weapon/Axe/lib/Reckless';

import ItemDetails from './ItemDetails.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

storiesOf('Инвентарь', module)
  .addDecorator(withReadme(ItemDetails.__docs))
  .add('Карточка предмета (ItemDetails)', () => ({
    components: { ItemDetails, FrameComponent },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <div class="sb-version">
          <h3 class="sb-version__head">
            Карточка предмета в инвентаре
          </h3>
          <FrameComponent class="sb__frame">
            <ItemDetails 
              :item="itemHack" 
              :character="character" 
              isOwned
              @equip="equip"
              @drop="drop"
              />
          </FrameComponent>
        </div>
        
        <div class="sb-version">
          <h3 class="sb-version__head">
            Карточка надетого предмета в инвентаре
          </h3>
          <FrameComponent class="sb__frame">
            <ItemDetails 
              :item="itemHack" 
              :character="character" 
              isOwned 
              isEquipped 
              @unequip="unequip"
              />
          </FrameComponent>
        </div>
        
        <div class="sb-version">
          <h3 class="sb-version__head">
            Карточка предмета в магазине
          </h3>
          <FrameComponent class="sb__frame">
            <ItemDetails 
              :item="itemHack" 
              :character="character" 
              @buy="buy"
              />
          </FrameComponent>
        </div>
        
        <div class="sb-version">
          <h3 class="sb-version__head">
            Карточка предмета в магазине, не подходящего по уровню
          </h3>
          <FrameComponent class="sb__frame">
            <ItemDetails :item="itemReckless" :character="character" />
          </FrameComponent>
        </div>        
      </div>
    `,
    data: () => (
      {
        itemHack: Hack,
        itemReckless: Reckless,
        character: {
          calculated: {
            'Attribute/Level': 1,
          },
        },
      }
    ),
    methods: {
      equip: action('Надеваем предмет'),
      unequip: action('Снимаем предмет'),
      buy: action('Покупаем предмет'),
      drop: action('Выбрасываем предмет'),
    },
  }));
