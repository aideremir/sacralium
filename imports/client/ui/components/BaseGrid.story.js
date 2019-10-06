import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BaseGrid from './BaseGrid.vue';

storiesOf('Компоненты', module)
  .addDecorator(withReadme(BaseGrid.__docs))
  .add('Сетка (BaseGrid)', () => ({
    components: { BaseGrid },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Сетка
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">
            3 колонки
          </h3>
          <BaseGrid
            :cols="3"
          >
            <div> Item 1</div>
            <div> Item 2</div>
            <div> Item 3</div>
            <div> Item 4</div>
            <div> Item 5</div>
            <div> Item 6</div>
            <div> Item 7</div>
          </BaseGrid>
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            4 колонки
          </h3>
          <BaseGrid
            :cols="4"
          >
            <div> Item 1</div>
            <div> Item 2</div>
            <div> Item 3</div>
            <div> Item 4</div>
            <div> Item 5</div>
            <div> Item 6</div>
            <div> Item 7</div>
          </BaseGrid>
        </div>
      </div>
    `,
  }));
