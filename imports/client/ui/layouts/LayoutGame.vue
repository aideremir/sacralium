<template lang="pug">
.LayoutGame
  header.LayoutGame__header
    slot(name="header")

  main.LayoutGame__content
    .LayoutGame__contentWrapper: slot
    .LayoutGame__chatWrapper
      GameChat(
        v-if="showChat"
        :messageList="messageList"
        :characterName="user.character.name"
        :show.sync="showChat"
        @submit="$emit('sendChatMessage', $event)"
      )
  footer.LayoutGame__footer
    BaseMenu(:showChat.sync="showChat")
      slot(name="menu" :showChat="showChat")
</template>

<script>
import GameChat from '/imports/client/ui/chat/GameChat';
import BaseMenu from '/imports/client/ui/components/BaseMenu';

export default {
  name: 'LayoutGame',
  components: {
    GameChat,
    BaseMenu,
  },
  props: {
    messageList: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    showChat: false,
  }),
};

</script>

<style lang="stylus">
@require '~imports/client/ui/styles/mixins/scrollbar'

.LayoutGame
  display flex
  flex-direction column
  height 100%

  &__header
  &__footer
    min-height 52px
    box-sizing border-box

    background-color #2d2d2d
    background-image url(/images/layouts/layouts__panelsBG.png)
    background-repeat repeat-x

  &__header
    background-position bottom
    flex-shrink 0
    padding-bottom 8px

  &__footer
    display flex
    background-position top

  &__content
    position relative
    display flex
    flex-basis 100%
    box-sizing border-box
    flex-direction column

    @media screen and (min-width: 1400px)
      flex-direction unset
      width 1400px
      margin 0 auto

  &__contentWrapper
    flex 1
    overflow-y auto
    overflow-x hidden
    scroll-bar()

    background:
      url(/images/layouts/layouts__contentBG_top.png) top,
      url(/images/layouts/layouts__contentBG_bottom.png) bottom
    background-repeat repeat-x

  &__chatWrapper
    position relative
    display flex

  &__copyrights
    display block
    text-align center
    font-size 12px
    color #767676

</style>

<docs>
## Игровой layout

```js
import LayoutGame from '/imports/client/ui/layouts/LayoutGame';
```
### Использование
```pug
LayoutGame(
  :message-list="messages"
  :user="user"
)
  template(slot="header") отобразится в header'е
  div.SomeComponent Отобразится в центре
  template(slot="menu") Отображение пунктов меню
```

### Параметры
```ts
<Array> messageList // список сообщений
<Object> user // данные текущего игрока
```
</docs>
