import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BaseProgress from './BaseProgress.vue';

storiesOf('Компоненты', module)
  .addDecorator(withReadme(BaseProgress.__docs))
  .add('Полоса прогресса (BaseProgress)', () => ({
    components: { BaseProgress },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Полоса прогресса
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Обычная
          </h3>
          <BaseProgress
            :max="200"
            :value="125"
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Зеленая (onSide)
          </h3>
          <BaseProgress
            green
            onSide
            :max="564"
            :value="232"
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Желтая (без максимального)
          </h3>
          <BaseProgress
            yellow
            :value="48"
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Серый (малый)
          </h3>
          <BaseProgress
            small
            gray
            :max="100"
            :value="66"
          />
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">
            Красный (в процентах)
          </h3>
          <BaseProgress
            red
            percentage
            :max="100"
            :value="66"
          />
        </div>
        <div
          class="sb-version"
          style="
            background: #1c1c1c;
            padding: 10px;
          "
        >
          <h3 class="sb-version__head" style="color: rgba(255,255,255,.75)">
            Инвертированные
          </h3>
          <BaseProgress
            green
            inverted
            :max="100"
            :value="66"
          />
          <br/>
          <BaseProgress
            green
            small
            inverted
            :max="100"
            :value="66"
          />
        </div>
      </div>
    `,
    data: () => (
      {
        text: 'Полоса прогресса',
      }
    ),
  }));
