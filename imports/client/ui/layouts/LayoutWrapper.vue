<template lang="pug">
LayoutGame.LayoutWrapper(
  :user="currentUser"
  :messageList="messages"
  @sendChatMessage="sendChatMessage"
)
  template(slot="header")
    slot(name="header")
      WrapperHeader
  slot
  template(slot="menu" slot-scope="{ showChat }")
    slot(name="menu" :showChat="showChat")
</template>

<script>
import { Meteor } from 'meteor/meteor';
import Chat from '/imports/modules/Chat/lib/collection';
import LayoutGame from './LayoutGame';
import WrapperHeader from '/imports/client/ui/pages/WrapperHeader';
import helpers from '/imports/client/ui/helpers/meteor';

export default {
  name: 'LayoutWrapper',
  components: {
    LayoutGame,
    WrapperHeader,
  },
  computed: {
    currentUser () {
      return Meteor.user();
    },
  },
  meteor: {
    $subscribe: {
      chat: [],
    },
    messages () {
      return Chat.find({});
    },
  },
  methods: {
    async sendChatMessage (message) {
      try {
        await helpers.meteorCallPromise('Chat.postMessage', message);
      } catch (error) {
        this.$root.$emit(
          'showModal',
          {
            head: 'Не удалось отправить сообщение',
            text: error.error,
          },
        );
      }
    },
  },
};
</script>
