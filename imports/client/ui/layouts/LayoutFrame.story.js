import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import LayoutFrame from './LayoutFrame.vue';

storiesOf('Блоки', module)
  .addDecorator(withReadme(LayoutFrame.__docs))
  .add('Рамка стандартная (LayoutFrame)', () => ({
    components: { LayoutFrame },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Рамка стандартная
        </h2>
        <LayoutFrame>
          <div style="padding: 20px">Некоторое содержимое фрейма</div>
        </LayoutFrame>
      </div>
    `,
  }));
