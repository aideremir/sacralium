<template lang="pug">
LayoutWrapper
  template(slot="header")
    BaseHeader(
      :character="battleProcessPlayerInfo"
      :opponent="battleProcessEnemyInfo"
      :isBattle="!!battleProcessEnemyInfo"
      @settingsMenuAction="settingsMenuAction"
    )

  transition(name="PageBattle__preloader_transition")
    .PageBattle__preloader(
      v-if="displayPreloader"
    ) Загрузка...

  .PageBattle
    .PageBattle__content
      BattlePlayersList(
        v-if="currentView === 'players-list'"
        :players="duelCandidatesList"
        @playerWasSelected="displayPlayerDetails"
      )

      BattleCharacterInfo(
        v-if="currentView === 'player-info'"
        :character="selectedCharacterDetails"
        :timeout="selectedCharacterBattleRequestTimeout"
        @close="selectedCharacterDetails = null"
        @callToBattle="callToBattle"
      )

      BattleProcess(
        v-if="currentView === 'battle' && battleProcessDataReady"
        :player="battleProcessPlayerInfo"
        :enemy="battleProcessEnemyInfo"
        :battleData="battleProcess"
        @executeMove="sendMovementToServer"
      )

  ResizeableContainer(
    v-if="displayLog"
    :class="{hiddenMobile: !displayLog}"
    containerName="BattleLog__resizeableContainer"
    :minContainerHeight="50"
    :maxContainerHeight="300"
    :saveSettings="true"
  )
    BattleLog(
      :currentUserId="currentUser._id"
      :players="logPlayersList"
      :log="battleProcess.log"
      @closeLog="hideLog"
    )

  template(
    v-if="isInBattle"
    slot="menu"
  )
    BaseMenuItem(
      class="BaseMenuItem__fightsLog"
      @click="toggleLog"
      :active="displayLog"
    )
    BaseMenuItem.BaseMenuItem__fights

</template>

<script>

import { Meteor } from 'meteor/meteor';
import helpers from '/imports/client/ui/helpers/meteor';
import commonHelpers from '/imports/client/ui/helpers/common';
import CharacterManager from '/imports/modules/Character/lib/Manager';

import BattlePlayersList from '/imports/client/ui/game/battle/BattlePlayersList.vue';
import BattlePlayerStatus from '/imports/client/ui/game/battle/BattlePlayerStatus.vue';
import BattleCharacterInfo from '/imports/client/ui/game/battle/BattleCharacterInfo.vue';
import BattleProcess from '/imports/client/ui/game/battle/BattleProcess.vue';
import BattleLog from '/imports/client/ui/game/battle/BattleLog.vue';
import ResizeableContainer from '/imports/client/ui/components/ResizeableContainer.vue';
import BaseMenuItem from '/imports/client/ui/components/BaseMenuItem.vue';
import LayoutWrapper from '/imports/client/ui/layouts/LayoutWrapper.vue';

import DuelCandidates from '/imports/modules/CombatRequest/client/collection';
import CombatCollection from '/imports/modules/Combat/lib/collection';
import CombatParticipants from '/imports/modules/Combat/client/combatParticipantsCollection';

import BaseHeader from '/imports/client/ui/components/BaseHeader';

const { displayError } = commonHelpers;

export default {
  name: 'PageBattle',
  components: {
    LayoutWrapper,
    BaseMenuItem,
    ResizeableContainer,
    BattleLog,
    BattleProcess,
    BattleCharacterInfo,
    BattlePlayersList,
    BattlePlayerStatus,
    BaseHeader,
  },
  data() {
    return {
      selectedCharacterDetails: null,
      displayLog: false,
      displayPreloader: false,
    };
  },
  computed: {
    isInBattle() {
      return !!this.battleProcess && !this.battleProcess.winnerId;
    },
    battleProcessDataReady() {
      return !!(this.battleProcessPlayerInfo && this.battleProcessEnemyInfo && this.battleProcess);
    },
    duelCandidatesList() {
      const list = this.duelCandidates.map(item => ({
        id: item._id,
        name: item.character?.name,
        power: item.character?.power || 0,
        timeout: item.character?.combatRequest?.timeout,
      }));
      list.sort(({ power: a }, { power: b }) => b - a);

      return list;
    },
    selectedCharacterBattleRequestTimeout() {
      const selectedUserId = this.selectedCharacterDetails.userId;
      const combatRequestRecipientId = this.currentCharacter?.combatRequest?.recipient?._id;

      if (selectedUserId !== combatRequestRecipientId) {
        return '';
      }

      return this.currentCharacter?.combatRequest?.timeout?.toString() || '';
    },
    battleProcessPlayerInfo() {
      return Object.assign(
        {
          userId: this.currentUser._id,
          health: this.currentUser.character.combat?.health,
          calculated: CharacterManager.getAttributesDetailed(this.currentUser).total,
          // Количество очков до следующего уровня
          experienceNext: CharacterManager.getExperiencesRange().max,
        },
        this.currentUser.character,
      );
    },
    battleProcessEnemyInfo() {
      const enemy = this.battleParticipant;
      if (!enemy) {
        return enemy;
      }

      return Object.assign(
        {
          userId: enemy._id,
          health: enemy.character.combat.health,
          calculated: CharacterManager.getAttributesDetailed(this.battleParticipant).total,
        },
        enemy.character,
      );
    },
    currentView() {
      if (this.isInBattle) {
        return 'battle';
      }
      if (this.selectedCharacterDetails) {
        return 'player-info';
      }

      return 'players-list';
    },
    logPlayersList() {
      if (!this.battleProcessPlayerInfo || !this.battleProcessEnemyInfo) {
        return {};
      }
      return {
        [this.battleProcessPlayerInfo.userId]: this.battleProcessPlayerInfo.name,
        [this.battleProcessEnemyInfo.userId]: this.battleProcessEnemyInfo.name,
      };
    },
  },
  watch: {
    battleProcess(val) {
      if (val) {
        this.$subscribe('combatParticipants', []);
      }
    },
  },
  methods: {
    displayError,
    /**
     * Это отдельный модуль, наверное близок к роутеру. Стоит вынести, хотя бы в миксин
     * TODO: посмотреть принцип работы модуля меню
     *
     * @param {string} sectionName
     */
    toggleSectionVisibility(sectionName) {
      switch (sectionName) {
        case 'battle':
          this.showBattle();
          break;
        case 'log':
          this.toggleLog();
          break;
        case 'chat':
          break;
        default:
      }
    },
    toggleLog() {
      // hide chat if required
      this.hideChat();
      this.displayLog = !this.displayLog;
      this.$root.$once('chatState', this.hideLog);
    },
    hideLog() {
      this.displayLog = false;
    },
    hideChat() {
      this.$root.$emit('setChatState', false);
    },
    showBattle() {
      this.hideLog();
      this.hideChat();
    },
    async displayPlayerDetails(id) {
      this.displayPreloader = true;
      try {
        const character = await helpers.meteorCallPromise('User.getCharacterInfoById', id);
        const attributeDetails = CharacterManager.getAttributesDetailed({ character });
        this.selectedCharacterDetails = Object.assign(
          {
            userId: id,
            attributesPrimary: attributeDetails.primaryBaseWithEquipment,
            calculated: attributeDetails.total,
          },
          character,
        );
      } catch (e) {
        this.displayError('Не удалось получить данные об игроке', e.error);
      }
      this.displayPreloader = false;
    },
    async callToBattle(id) {
      this.displayPreloader = true;
      try {
        await helpers.meteorCallPromise('CombatRequest.send', id);
      } catch (e) {
        this.displayError('Ошибка отправки вызова на поединок', e.error);
      }
      this.displayPreloader = false;
    },
    async sendMovementToServer({ attackZone, defenseZones }) {
      try {
        await helpers.meteorCallPromise('Combat.makeMove', attackZone, defenseZones);
      } catch (e) {
        this.displayError('', e.error);
      }
    },
    finishBattle() {
      // TODO: отображение наград и результатов
    },

    settingsMenuAction(action) {
      if (action === 'logout') {
        Meteor.logout(() => { this.$router.push('/'); });
      }
    },
  },
  meteor: {
    $subscribe: {
      duelCandidates: [],
    },
    currentUser() {
      return Meteor.user();
    },
    currentCharacter() {
      return this.currentUser?.character;
    },
    duelCandidates() {
      return DuelCandidates.find({});
    },
    battleProcess() {
      return CombatCollection.findOne({ _id: this.currentCharacter?.combat?._id });
    },
    battleParticipant() {
      return CombatParticipants.findOne({});
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'
@require '~imports/client/ui/game/battle/styles'
$header_textColor = $color_gray

.PageBattle
  display flex
  justify-content center
  min-height 100%
  padding 0 20px
  box-sizing border-box

  &__battleProcessHeader
    display flex
    justify-content space-between
    align-items center
    padding 0 10px

    color $header_textColor

  &__preloader
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 1000

    display flex
    justify-content center
    align-items center

    background-color rgba(255,255,255,0.8)

    &_transition
      &-enter-active
        transition opacity .3s ease-in
      &-leave-active
        transition opacity .2s ease-out
      &-enter, &-leave-to
        opacity 0

  &__content
    display flex
    flex-direction column
    max-width 400px

  &__logButton .BaseMenuItem__link:before
    background-image url(/images/chat/chat.svg)
</style>

<docs>
# Страница поединков
```js
import PageBattle from '/imports/client/ui/game/battle/PageBattle.vue';
```
</docs>
