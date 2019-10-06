import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import BattleProcess from '/imports/client/ui/game/battle/BattleProcess.vue';
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

// TODO: пример данных. Переписать, когда будут готовы данные с сервера
import { player, enemies } from '/imports/client/ui/game/battle/data-examples/player-example';

storiesOf('Боевой экран', module)
  .addDecorator(withReadme(BattleProcess.__docs))
  .add('Процесс боя (BattleProcess)', () => ({
    components: { BattleProcess, FrameComponent },
    data() {
      return {
        player,
        enemy: enemies[0],
      };
    },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Процесс боя
        </h2>
        
        <FrameComponent class="sb__frame" style="max-width:480px;">
          <BattleProcess
            :player="player"
            :enemy="enemy"
          />
        </FrameComponent>
        
      </div>
    `,
  }));
