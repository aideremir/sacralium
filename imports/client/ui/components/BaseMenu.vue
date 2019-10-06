<template lang="pug">
nav.BaseMenu
  slot
    BaseMenuItem.BaseMenuItem__player(:to="{ name: 'CharacterProfile' }")
    BaseMenuItem.BaseMenuItem__fights(:to="{ name: 'Battle' }")
    BaseMenuItem.BaseMenuItem__shop(:to="{ name: 'Shop' }")
  BaseMenuItem.BaseMenuItem__chat(
    :active="showChat"
    @click="toggleChat"
  )
</template>

<script>
import BaseMenuItem from '/imports/client/ui/components/BaseMenuItem';

export default {
  components: { BaseMenuItem },
  props: {
    showChat: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleChat() {
      this.$emit('update:showChat', !this.showChat);
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'

.BaseMenu
  display flex
  flex 1
  flex-direction row
  padding 0
  margin 0
  list-style none
</style>

<docs>
# Главное меню (BaseMenu)

## Подключение

```js
import BaseMenu from '/imports/client/ui/components/BaseMenu';
```

## Использование

* С кнопками по-умолчанию
```pug
BaseMenu(:show-chat.sync="showChat")
```
* С переопределением кнопок
```pug
BaseMenu(:show-chat.sync="showChat")
    BaseMenuItem.BaseMenuItem__customClass(
      параметры BaseMenuItem
    )
```
### Параметры
```ts
<Boolean> showChat // Флаг состояния окна чата (открыто/закрыто)
```

>**Внимание:** кнопка чата присутствует в меню всегда
</docs>
