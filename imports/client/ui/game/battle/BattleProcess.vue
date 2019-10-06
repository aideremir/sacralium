<template lang="pug">
.BattleProcess

  .BattleProcess__timer
    span(v-if="!actionWasSentToServer") Ваш ход,&nbsp;
    span
      BattleTimer(
        :end="roundFinishedAt"
      )

  .BattleProcess__characterAvatarsContainer
    .BattleProcess__singleAvatarContainer
      CharacterAvatar(
        :gender="player.gender"
      )
    .BattleProcess__singleAvatarContainer
      CharacterAvatar(
        :gender="enemy.gender"
        isMirrored
      )

  .BattleProcess__selectActionsContainer
    .BattleProcess__actionItem
      BattleAttackSelection(
        :isAvailable="!isKnockedDown"
        :selectedValue="attackTypeSelected"
        :actionsList="attackActions"
        :armorActive="player.combat.armorActive"
        @actionWasSelected="setAttack($event.type)"
      )
    .BattleProcess__actionItem
      BattleAttackSelection(
        :isAvailable="!isStunned"
        :selectedValue="blockTypeSelected"
        :actionsList="defendActions"
        :armorActive="enemy.combat.armorActive"
        isDefend
        @actionWasSelected="setBlock($event.type)"
      )

  .BattleProcess__autoattack
    BaseCheckbox(
      :checked="autoAttack"
      @change="setAutoAttack"
    ) Автоатака

  .BattleProcess__executeMovementContainer
    BaseButton(
      :class=`{
        BattleProcess__executeMovement: true,
        BattleProcess__executeMovement_disabled: !executeMovementAvailable
      }`
      :disabled="!executeMovementAvailable"
      @click="executeMovement"
      text="Атаковать"
    )

</template>

<script>
import _ from 'lodash';
import BattleAttackSelection from '/imports/client/ui/game/battle/BattleAttackSelection.vue';
import BattleTimer from '/imports/client/ui/game/battle/BattleTimer.vue';
import helpers from '/imports/client/ui/helpers/common';
import BaseCheckbox from '/imports/client/ui/components/BaseCheckbox';
import CharacterAvatar from '/imports/client/ui/character/CharacterAvatar.vue';
import BaseButton from '/imports/client/ui/components/BaseButton';

import { attackActions, defendActions } from '/imports/client/ui/game/battle/BattleAttackDefendActionsList';

export default {
  name: 'BattleProcess',
  components: {
    BaseButton,
    BaseCheckbox,
    BattleAttackSelection,
    BattleTimer,
    CharacterAvatar,
  },
  props: {
    /**
     * @property {string} player.userId - id пользователя
     * @property {string} player.gender - пол
     * @property {Object} player.combat - объект боя
     */
    player: {
      type: Object,
      required: true,
      validator(value) {
        return helpers.hasProperties(value, ['userId', 'gender', 'combat']);
      },
    },
    /**
     * @property {string} enemy.gender - пол
     * @property {Object} enemy.combat - объект боя
     */
    enemy: {
      type: Object,
      required: true,
      validator(value) {
        return helpers.hasProperties(value, ['gender', 'combat']);
      },
    },
    battleData: {
      type: Object,
      required: true,
      validator(value) {
        return helpers.hasProperties(value, ['timeout']);
      },
    },
  },
  data() {
    return {
      autoAttack: true,
      // Тип выбранной атаки (в голову, в туловище и т.д.)
      attackTypeSelected: null,
      // Тип выбранного блока
      blockTypeSelected: null,
      // Идентификатор запущенного в очередной раунд таймера.
      battleTimer: null,
    };
  },
  computed: {
    actionWasSentToServer() {
      return !!this.battleData.userActions?.[this.player.userId];
    },
    /**
     * Берется с сервера
     * @type {boolean} игрок оглушен, не может защищаться
     */
    isStunned() {
      return false;
    },
    /**
     * Берется с сервера
     * @type {boolean} игрок сбит с ног, не может атаковать
     */
    isKnockedDown() {
      return false;
    },
    /**
     * Таймштамп окончания раунда, мс.
     * Также отвечает за то, активен бой или нет.
     */
    roundFinishedAt() {
      return Date.parse(this.battleData.timeout);
    },
    selectAttackTypeAvailable() {
      return (!this.actionWasSentToServer && !this.isKnockedDown);
    },
    selectBlockTypeAvailable() {
      return (!this.actionWasSentToServer && !this.isStunned);
    },
    attackTypeSelectionRequired() {
      return (!this.isKnockedDown && !this.attackTypeSelected);
    },
    blockTypeSelectionRequired() {
      return (!this.isStunned && !this.blockTypeSelected);
    },
    executeMovementAvailable() {
      return (
        !this.actionWasSentToServer
        && !this.attackTypeSelectionRequired
        && !this.blockTypeSelectionRequired
      );
    },
  },
  watch: {
    autoAttack(val) {
      if (this.hasLocalStorage()) {
        localStorage.setItem('battleProcess__autoAttack', val);
      }
    },
    roundFinishedAt() {
      this.startRoundIfRequired();
    },
  },
  created() {
    if (this.hasLocalStorage() && localStorage.getItem('battleProcess__autoAttack') !== null) {
      this.autoAttack = JSON.parse(localStorage.getItem('battleProcess__autoAttack'));
    }

    this.attackActions = attackActions;
    this.defendActions = defendActions;
    this.startRoundIfRequired();
  },
  beforeDestroy() {
    this.stopBattleTimer();
  },
  methods: {
    hasLocalStorage() {
      return typeof localStorage !== 'undefined';
    },
    startRoundIfRequired() {
      /**
       * очищаем предыдущий таймер
       * проверяем, чтобы время окончания раунда было больше текущего времени
       *
       * в новом раунде:
       * очищаем выбранные в предыдущем бою типы атаки и защиты
       * запускаем автоатаку (если она реализована на клиенте, а не сервере)
       * запускаем таймер для текущего раунда
       */
      this.stopBattleTimer();
      if (this.roundFinishedAt <= Date.now()) {
        return;
      }
      this.attackTypeSelected = null;
      this.blockTypeSelected = null;
      this.executeAutoAttack();
      this.battleTimer = setTimeout(
        () => {
          this.startRoundIfRequired();
        },
        this.roundFinishedAt - Date.now(),
      );
    },
    stopBattleTimer() {
      if (this.battleTimer !== null) {
        clearTimeout(this.battleTimer);
        this.battleTimer = null;
      }
    },
    setAttack(value) {
      if (!this.selectAttackTypeAvailable) {
        return;
      }
      this.attackTypeSelected = value;
    },
    setBlock(value) {
      if (!this.selectAttackTypeAvailable) {
        return;
      }
      this.blockTypeSelected = value;
    },
    setAutoAttack(val) {
      this.autoAttack = val;
      if (val) {
        this.executeAutoAttack();
      }
    },
    executeAutoAttack() {
      if (!this.autoAttack) {
        return;
      }
      if (this.attackTypeSelectionRequired) {
        const attackRand = _.random(0, this.attackActions.length - 1);
        this.attackTypeSelected = this.attackActions[attackRand].name;
      }
      if (this.blockTypeSelectionRequired) {
        const blockRand = _.random(0, this.defendActions.length - 1);
        this.blockTypeSelected = this.defendActions[blockRand].name;
      }
    },
    executeMovement() {
      if (!this.executeMovementAvailable) {
        // TODO: бросить какую-то ошибку пользователю
        return;
      }
      this.$emit('executeMove', {
        attackZone: this.attackActions.find(item => item.name === this.attackTypeSelected).zones[0],
        defenseZones: this.defendActions.find(item => item.name === this.blockTypeSelected).zones,
      });
    },
  },
};
</script>

<style lang="stylus">
.BattleProcess
  &__timer
    display flex
    justify-content center
    padding-top 10px

  &__characterAvatarsContainer
    display flex
    justify-content space-around
    align-items center

  &__singleAvatarContainer
    width 40%

  &__selectActionsContainer
    display flex
    justify-content space-between
    align-items center

    & > *
      flex-basis 48%

  &__autoattack
    display flex
    justify-content center

  &__executeMovementContainer
    display flex
    justify-content center

  &__executeMovement
    background-color #2b91af
    cursor pointer

    &_disabled
      background-color #7f7f7f
      cursor not-allowed

</style>

<docs>
# Компонент проведения боя.

Не отвечает за начало и окончание боя, только за сам процесс поединка, получение и отправку
данных, связанных с боем. События начала и конца боя обрабатываются в PageBattle.

# Использование

```js
import BattleProcess from '/imports/client/ui/game/battle/BattleProcess.vue';
```
```pug
BattleProcess(
  v-if="battleIsInAction"
  :player="currentPlayer"
  :enemy="enemy"
)
```

Параметры, получаемые из props скорее всего также стоит перенести в computed свойства и брать из
централизованного хранилища, как и все остальные данные о поединке
</docs>
