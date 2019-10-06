<template lang="pug">
BaseHeader(
  :character="character"
  @settingsMenuAction="settingsMenuAction"
)
</template>

<script>
import { Meteor } from 'meteor/meteor';
import BaseHeader from '/imports/client/ui/components/BaseHeader';
import CharacterManager from '/imports/modules/Character/lib/Manager';

export default {
  components: {
    BaseHeader,
  },
  meteor: {
    character() {
      return {
        ...Meteor.user()?.character,
        experienceNext: CharacterManager.getExperiencesRange().max,
        calculated: CharacterManager.getAttributesDetailed(this.currentUser).total,
      };
    },
  },
  methods: {
    settingsMenuAction(action) {
      if (action === 'logout') {
        Meteor.logout(() => { this.$router.push('/'); });
      }
    },
  },
};
</script>
