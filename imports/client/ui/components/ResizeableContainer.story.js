import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import ResizeableContainer from '/imports/client/ui/components/ResizeableContainer.vue';
import LayoutMain from '/imports/client/ui/layouts/LayoutMain.vue';

storiesOf('Боевой экран', module)
  .addDecorator(withReadme(ResizeableContainer.__docs))
  .add('Контейнер с изменяемой высотой (ResizeableContainer)', () => ({
    components: { ResizeableContainer, LayoutMain },
    data() {
      return {
        name: 'ExampleContainer',
      };
    },
    template: `
      <LayoutMain>
        <div class="sb-page sb-page_withPaddings">
          <h2 class="sb-head">
            Контейнер с изменяемой высотой
          </h2>
            
        </div>
        <ResizeableContainer
          :containerName="name"
          :saveSettings="false"
        >
          <p>Содержимое контейнера</p>
          <p>Потяни за красную кнопку</p>
        </ResizeableContainer>
      </LayoutMain>
    `,
  }));
