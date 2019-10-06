<template lang="pug">
.HeaderSettings
  .HeaderSettings__icon(@click="toggleMenu")

  template(v-if="showMenu")
    .HeaderSettings__menuShadow(@click="toggleMenu")
    .HeaderSettings__menu
      a.HeaderSettings__menuItem(
        href="#logout"
        @click.prevent="onClickMenu('logout')"
      )
        | Выйти из игры

</template>

<script>
export default {
  data: () => ({
    showMenu: false,
  }),
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    onClickMenu(action) {
      this.$emit('settingsMenuAction', action);
      this.toggleMenu();
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'

$HeaderSettings__color_menuBorder = $color_gray
$HeaderSettings__color_menuBg = $color_background

.HeaderSettings
  position relative

  display block
  width 30px
  height 30px

  &__icon
    position relative
    display block
    width 30px
    height 30px
    z-index 100

    background url(/images/HeaderSettings__icon.png)
    background-repeat no-repeat
    background-position center
    cursor pointer

  &__menu
    position absolute
    top 100%
    right 15px
    z-index 100

    display block
    min-width 50px
    box-sizing border-box

    background-color $HeaderSettings__color_menuBg
    border solid 1px $HeaderSettings__color_menuBorder
    border-radius 6px 0 6px 6px
    box-shadow 0 4px 50px rgba(#000,.4)
    opacity .95

  &__menuItem
    display block
    padding 15px

    font-weight 600
    font-size 13px
    line-height 100%
    text-decoration none
    text-transform uppercase

    color $color_text
    white-space nowrap

    &:active
      background-color rgba(#000,.05)

    &:not(:first-child)
      border-top solid 1px $HeaderSettings__color_menuBorder

  &__menuShadow
    position fixed
    left 0
    top 0
    z-index 99

    width 100%
    height 100%

    background-color rgba(#000,.2)
    cursor pointer

</style>

<docs>
## Кнопка "настройки"

```js
import HeaderSettings from '/imports/client/ui/components/HeaderSettings';
```

### Использование
```pug
HeaderSettings(
  @settingsMenuAction="settingsMenuAction"
)
```

### События
`@settingsMenuAction`(*String*) - возвращает значение текущего действия при клике по пункту меню

</docs>
