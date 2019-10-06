<template lang="pug">
.BaseMenuItem(
  v-bind="$attrs"
  v-on="$listeners"
)
  a.BaseMenuItem__link(
    v-if="Object.keys($listeners).length"
    :class=`{
      BaseMenuItem__active: active
    }`
  ) {{ text }}

  router-link.BaseMenuItem__link(
    v-else
    :to="to"
    exact-active-class="BaseMenuItem__active"
    active-class=''
    exact
  ) {{ text }}
</template>

<script>
export default {
  name: 'BaseMenuItem',
  props: {
    text: {
      type: String,
      default: '',
    },
    to: {
      type: [String, Object],
      default: '',
    },
    active: {
      type: Boolean,
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'

.BaseMenuItem
  display inline-flex
  flex 1
  flex-direction column
  cursor pointer

  &:not(:last-of-type)
    border-right 1px solid $color_black

  &__active
    background-image:
      linear-gradient(180deg, rgba(249, 249, 249, 0.95) 0%, rgba(221, 221, 221, 0) 100%)

  &__link
    position relative
    flex 1
    text-decoration none
    line-height 52px
    text-align center
    color $color_white

    &:before
      content: ''
      position absolute
      top 20%
      left 0
      width 100%
      height 80%
      background-repeat no-repeat
      background-position center
      background-size auto 35px
      pointer-events none

    ~/__chat &:before
      background-image url(/images/chat/chat.svg)

    ~/__fights &:before
      background-image url(/images/menu/fights.svg)

    ~/__fightsLog &:before
      background-image url(/images/menu/fights-log.svg)

    ~/__player &:before
      background-image url(/images/menu/player.svg)

    ~/__shop &:before
      background-image url(/images/menu/shop.svg)
</style>

<docs>
# Базовый пункт меню

## Подключение
```js
import BaseMenuItem from '/imports/client/ui/components/BaseMenuItem';
```

## Использование
```pug
BaseMenuItem(
  :text="text"
  :to="to"
  active
  @click="clickMethod"
)
```

### Параметры
```ts
<String> text = "Нажать" // Текст на кнопке
<String> to // Адрес ссылки
<Boolean> active // Флаг активного состояния
```

## Стилизация
По умолчанию поддерживаются 4 класса кнопок:
* `.BaseMenuItem__chat` - кнопка чата
* `.BaseMenuItem__player` - кнопка страницы игрока
* `.BaseMenuItem__fights` - кнопка страницы боев
* `.BaseMenuItem__shop` - кнопка страницы магазина
</docs>
