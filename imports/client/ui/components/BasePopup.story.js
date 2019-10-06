import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BasePopup from './BasePopup.vue';
import BaseButton from './BaseButton.vue';

storiesOf('Компоненты', module)
  .addDecorator(withReadme(BasePopup.__docs))
  .add('Попап (BasePopup)', () => ({
    components: { BasePopup, BaseButton },
    template: `
        <div class="sb-page sb-page_withPaddings">
          <h2 class="sb-head">
            Пример использования
          </h2>
          <div class="sb-version">
            <h3 class="sb-version__head">
              Вызов по нажатию кнопки
            </h3>
            
            <BaseButton @click="isPopupVisible=!isPopupVisible" text="Открыть" />
  
            <BasePopup v-if="isPopupVisible" @close="isPopupVisible=!isPopupVisible">
              <div style="padding:20px;height: 200px">
                <h2 class="sb-head">
                  {{text}}
                </h2>
              </div>
            </BasePopup>
          </div>
        </div>
      `,
    data: () => (
      {
        isPopupVisible: false,
        text: 'Содержимое попап окна',
      }
    ),
  }));
