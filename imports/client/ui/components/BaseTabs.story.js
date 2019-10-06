import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BaseTabs from '/imports/client/ui/components/BaseTabs';
import BaseTab from '/imports/client/ui/components/BaseTab';

storiesOf('Компоненты', module)
  .addDecorator(withReadme([BaseTabs.__docs]))
  .add('Вкладки (BaseTabs)', () => ({
    components: { BaseTabs, BaseTab },
    data: () => ({
      selectedTab: 2,
    }),
    methods: {
      previousTab() {
        this.selectedTab -= 1;
      },
      nextTab() {
        this.selectedTab += 1;
      },
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Вкладки (BaseTabs)
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Использование по умолчанию
          </h3>
          <button @click="previousTab">
            Предыдущая вкладка
          </button>
          <button @click="nextTab">
            Следующая вкладка
          </button>
            <BaseTabs v-model="selectedTab">
              <BaseTab name="Вкладка 1">
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis, mi at convallis suscipit, 
                  mi neque laoreet metus, ut ultrices libero leo at massa. Integer condimentum est eros, 
                  quis molestie est sollicitudin a. Integer rutrum quam et ultricies lobortis. 
                  Vivamus rhoncus tempor ex, ac congue metus molestie sed. In nec auctor nisl, rhoncus sodales eros. 
                  Sed molestie, odio at pellentesque feugiat, nibh neque facilisis urna, vel placerat dui magna non tortor. 
                  Aenean sit amet ante efficitur, blandit velit vitae, suscipit orci. Curabitur vulputate pulvinar nisi, 
                  in malesuada dolor dignissim sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Phasellus at malesuada massa, ut luctus lectus. Nam efficitur libero et diam interdum efficitur. 
                  Mauris et tristique nulla. Aliquam iaculis nulla fringilla, tincidunt risus ac, iaculis lacus. 
                  Praesent tincidunt volutpat orci ut feugiat.
                </div>
              </BaseTab>
              <BaseTab name="Вкладка 2" disabled>
                <div>Отключенная вкладка</div>
              </BaseTab>
              <BaseTab name="Вкладка 3">
                <div>
                  Ut viverra nunc tellus, quis cursus arcu eleifend pellentesque. Nullam consectetur, 
                  mi sed porttitor commodo, ante arcu tincidunt magna, non elementum nunc tellus nec libero. 
                  Aliquam eget pretium metus. Suspendisse nec lorem blandit, semper mi id, pretium diam. 
                  Donec nec odio finibus, bibendum nisl in, gravida ligula. Donec eu hendrerit dolor. 
                  Nulla sodales arcu turpis, id malesuada quam elementum ut. Sed at ligula cursus, rutrum quam quis, 
                  vehicula arcu. In rutrum volutpat massa, et consequat massa sollicitudin id. 
                  In id elit nec dolor fermentum placerat rhoncus a sapien. Suspendisse sit amet tortor lorem. 
                  Nam pulvinar ipsum eget faucibus finibus. Suspendisse accumsan libero lacus, 
                  eu facilisis libero ullamcorper quis. Suspendisse tincidunt accumsan interdum.
                </div>
              </BaseTab>
            </BaseTabs>          
        </div>
      </div>`,
  }));
