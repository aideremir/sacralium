<template lang="pug">
.GameChatMessage
  a.GameChatMessage__author(
    href="#"
    @click.prevent="$emit('click', message.characterName)"
  ) {{ message.characterName }}:
  |
  | {{ message.text }}
</template>

<script>
export default {
  name: 'GameChatMessage',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'

.GameChatMessage
  min-height 22px
  margin 5px 0
  padding-left 5px
  padding-right 24px
  word-wrap break-word

  &__author
    color #005291
    font-weight bold
    text-decoration none

  &__messageOwn
    margin-right 4px
    background-color $color_white
    border 1px solid #EFEFEF
    box-sizing border-box
    border-radius 8px 0 8px 8px
</style>

<docs>
# Сообщение чата

```js
import GameChatMessage from '/imports/client/ui/chat/GameChatMessage';
```

## Использование

```pug
GameChatMessage(
  :message="message"
  @click="selectNickname"
)
```

## Параметры
```ts
<Object> message // Сообщение
```

  ### Message
```ts
<String> timestamp // Временная метка сообщения
<String> characterName // Имя отправителя
<String> text // Текст сообщения
```

</docs>
