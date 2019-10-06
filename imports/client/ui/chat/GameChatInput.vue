<template lang="pug">
form.GameChatInput(@submit.prevent="$emit('submit')")
  input.GameChatInput__input(
    autofocus
    ref="input"
    v-model="localMessage"
    v-bind="$attrs"
  )
  button.GameChatInput__button(
    type="submit"
    :disabled="!value.length"
  )
</template>

<script>
const emoticons = {
  ':)': 0x1F600,
  ':(': 0x2639,
};

const RegExpEscape = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

export default {
  name: 'GameChatInput',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    localMessage: {
      get() {
        return this.value;
      },
      set(value) {
        const emoteMessage = this.replaceEmoticons(value, emoticons);
        this.$emit('input', emoteMessage);
      },
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    replaceEmoticons(text, emotes) {
      return Object.keys(emotes)
        .reduce(
          (result, emote) => result.replace(
            new RegExp(RegExpEscape(emote), 'gi'),
            match => String.fromCodePoint(emotes[match]),
          ),
          text,
        );
    },
  },
};
</script>

<style lang="stylus">
.GameChatInput
  position relative
  display flex
  margin 0 5px 7px 5px
  align-items center
  z-index 1

  &__input
    display block
    flex 1
    height 35px
    padding 0 35px 0 14px
    margin 0
    background-color $color_white
    border 1px solid #D0D0D0
    border-radius 25px
    font-size 12px
    transition box-shadow .3s ease
    outline none
    box-shadow 0 1px 6px rgba(0, 0, 0, 0.25)

    &:disabled
      background #D0D0D0

    &:focus,
    &:hover
      box-shadow 0 2px 10px rgba(0, 0, 0, 0.2)

  &__button
    position absolute
    right 4px
    width 27px
    height 27px
    display block
    border 0
    border-radius 25px
    background-image url(/images/chat/chat.svg)
    background-repeat no-repeat
    background-position center
    background-color #5C5C5C
    background-size 15px
    outline none
    cursor pointer

    &:active
      transform scale3d(1.2, 1.2, 1)
</style>

<docs>
# Поле ввода сообщения
Используется в GameChat
Понимает ввод эмодзи и конвертирует их в unicode

```js
import GameChatInput from '/imports/client/ui/chat/GameChatInput';
```

## Использование

```pug
GameChatInput(
  v-model="message"
  @submit="doSubmitMessage"
)
```

## Параметры
```ts
<String> value // Текст сообщения
```
</docs>
