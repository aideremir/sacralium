import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import LayoutMain from './LayoutMain.vue';

storiesOf('Блоки', module)
  .addDecorator(withReadme(LayoutMain.__docs))
  .add('Главный layout (LayoutMain)', () => ({
    components: { LayoutMain },
    template: `
      <div class="sb-page">
        <LayoutMain>
          <div style="padding:20px">
            <h2 class="sb-head">
              {{text}}
            </h2>
          </div>
        </LayoutMain>
      </div>
    `,
    data: () => ({
      text: 'Главный layout',
    }),
  }));
