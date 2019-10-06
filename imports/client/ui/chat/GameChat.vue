<template lang="pug">
.GameChat(v-if="show")
  .GameChat__container
    button.GameChat__closeButton(@click="setChatState(false)")
    .GameChat__messageList(ref="messageList")
      GameChatMessage(
        v-for="message in messageList"
        :key="message._id"
        :class="{ GameChatMessage__messageOwn: message.characterName === characterName }"
        :message="message"
        @click="selectNickname"
      )
    GameChatInput(
      ref="GameChatInput"
      v-model="newMessage"
      @submit="submitMessage"
    )
</template>

<script>
import GameChatMessage from './GameChatMessage';
import GameChatInput from './GameChatInput';

export default {
  name: 'GameChat',
  components: {
    GameChatInput,
    GameChatMessage,
  },
  props: {
    messageList: {
      type: Array,
      default: () => [],
    },
    characterName: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
    },
  },
  data: () => ({
    newMessage: '',
  }),
  watch: {
    messageList () {
      if (this.isScrolledToBottom()) {
        this.$nextTick(() => this.scrollToBottom());
      }
    },
  },
  mounted () {
    this.scrollToBottom();
    this.$root.$emit('chatState', true);
  },
  created () {
    this.$root.$on('setChatState', this.setChatState);
  },
  methods: {
    selectNickname(name) {
      this.newMessage = `@${name}, ${this.newMessage}`;
      this.$refs.GameChatInput.focus();
    },
    submitMessage() {
      this.$emit('submit', this.newMessage);
      this.scrollToBottom();
      this.newMessage = '';
    },
    scrollToBottom () {
      const el = this.$refs.messageList;
      if (!el) {
        return;
      }
      el.scrollTop = el.scrollHeight - el.clientHeight;
    },
    isScrolledToBottom () {
      const el = this.$refs.messageList;
      return el && el.scrollHeight - el.clientHeight <= el.scrollTop + 1;
    },
    setChatState(state) {
      this.$emit('update:show', state);
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'
@require '~imports/client/ui/styles/variables/layers'
@require '~imports/client/ui/styles/mixins/scrollbar'

$closeButton_width=32px
$closeButton_height=18px
$maxColumn_width=370px

.GameChat
  position absolute
  bottom 0
  height 60vh
  width 90vw
  left 50%
  display flex
  box-sizing border-box
  background-color $color_background
  border-width 5px 0 0 0
  border-style solid
  border-image url(/images/chat/menu_bg.png) 5 0 0 0
  box-shadow 0 -5px 15px rgba(0, 0, 0, 0.25)
  transform translateX(-50%)
  z-index $zindex_chat

  @media screen and (min-width: 1200px)
    width $maxColumn_width
    position unset
    height 100%
    flex 0 370px
    margin 0
    border 0
    transform translateX(0)

  &__container
    position relative
    flex 1 100%
    display flex
    flex-direction column

    &:after,
    &:before
      content ''
      position absolute
      height 100%
      width 100%
      background-image url(/images/chat/stone_pattern.png)
      background-repeat repeat-x

    &:after
      transform rotate(-180deg)

  &__closeButton
    position absolute
    right 5px
    top - $closeButton_height
    width $closeButton_width
    height $closeButton_height
    border 0
    background-color #5C5C5C
    background-image url(/images/chat/close_button.png)
    background-repeat no-repeat
    background-position center
    border-radius $closeButton_height $closeButton_height 0 0
    outline none
    cursor pointer

    @media screen and (min-width: 800px)
      display none

  &__messageList
    z-index 1
    max-height 60vh
    margin 19px 5px 0 10px
    flex 1
    overflow none
    overflow-y auto
    scroll-bar()

    @media screen and (min-width: 800px)
      max-height 100%
</style>

<docs>
# Игровой чат

```js
import GameChat from '/imports/client/ui/chat/GameChat';
```

## Использование

```pug
GameChat(
  :messageList="messageList"
  :characterName="Петя"
  @input="doSendMessage"
  @close="doCloseChatWindow"
)
```

## Параметры
```ts
<Array> messageList // Список сообщений
<String> characterName // Имя текущего персонажа
```
</docs>
