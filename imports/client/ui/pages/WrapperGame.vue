<template lang="pug">
router-view(v-if="$subReady.character")
</template>

<script>
import { Meteor } from 'meteor/meteor';
import BattleRequestActionsMixin from '/imports/client/ui/game/battle/mixins/battleRequestActionsMixin';
import BattleProcessMixin from '/imports/client/ui/game/battle/mixins/battleProcessMixin';

export default {
  name: 'WrapperGame',
  mixins: [
    BattleRequestActionsMixin,
    BattleProcessMixin,
  ],
  beforeRouteEnter: (to, from, next) => {
    window.history.pushState('', '', '/game');
    next();
  },
  watch: {
    '$subReady.character'(val) {
      if (val) {
        if (this.userCharacter) {
          this.$router.push({ name: 'CharacterProfile' });
        } else {
          this.$router.push({ name: 'CharacterCreation' });
        }
      }
    },
  },
  meteor: {
    $subscribe: {
      character: [],
    },
    userCharacter() {
      return Meteor.user()?.character;
    },
  },
};
</script>
