import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BaseCurrency from './BaseCurrency.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

storiesOf('Компоненты', module)
  .addDecorator(withReadme(BaseCurrency.__docs))
  .add('Валюты (BaseCurrency)', () => ({
    components: { BaseCurrency, FrameComponent },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <div class="sb-version">
          <h3 class="sb-version__head">
            Обычный режим
          </h3>
          <BaseCurrency :amount="amount1" />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Инвертированный режим
          </h3>
          <BaseCurrency :amount="amount2" isDark/>
        </div>        
      </div>
    `,
    data: () => (
      {
        amount1: {
          'Currency/Dinar': 50,
          'Currency/Ether': 100,
        },
        amount2: {
          'Currency/Dinar': 500,
          'Currency/Ether': 30,
        },
      }
    ),
  }));
