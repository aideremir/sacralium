import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BaseElement from './BaseElement.vue';

storiesOf('Компоненты', module)
  .addDecorator(withReadme(BaseElement.__docs))
  .add('Стихия (BaseElement)', () => ({
    components: { BaseElement },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Стихия
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Вода
          </h3>
          <BaseElement name="Water"/>
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Огонь
          </h3>
          <BaseElement name="Fire"/>
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Земля
          </h3>
          <BaseElement name="Earth"/>
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Воздух
          </h3>
          <BaseElement name="Air"/>
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Вселенная
          </h3>
          <BaseElement name="Universe"/>
        </div>
      </div>
    `,
  }));
