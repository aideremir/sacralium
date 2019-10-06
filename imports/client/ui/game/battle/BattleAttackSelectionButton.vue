<template lang="pug">
button.AttackSelectionButton(
  :class="className"
  @click="$emit('click')"
  :disabled="isDisabled"
  :description="description"
)
  slot

</template>

<script>
export default {
  props: {
    isActive: Boolean,
    isDisabled: Boolean,
    description: {
      type: String,
      default: '',
    },
  },
  computed: {
    className() {
      return {
        AttackSelectionButton_active: this.isActive,
      };
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'
$activeBorderColor = rgba(255,153,0,1)
$activeBgColor = $color_white
$descriptionBgColor = $color_red
$descriptionTextColor = $color_white

.AttackSelectionButton
  position relative
  display flex
  align-items center
  justify-content center
  width 70px
  max-width 100%
  height 40px
  overflow hidden

  color #767676

  background linear-gradient(360deg, #F0F1F1 0%, rgba(255, 255, 255, 0) 100%)
  border 1px solid #C0C3C5
  box-sizing border-box
  border-radius 3px
  cursor pointer

  &:before
    content attr(description)
    position absolute
    bottom 0
    right 0
    padding 0 3px

    font-size 10px
    color $descriptionTextColor
    background-color $descriptionBgColor
    border-radius 3px

  &:not(:last-child)
    margin-bottom 4px

  &:focus
    outline none

  &_active,
  &:hover,
  &:active
    background $activeBgColor
    border 1px solid $activeBorderColor
    box-shadow 1px 1px 3px transparentify($activeBorderColor, 0.3)

  &_disabled, &[disabled]
    color #C0C3C5
    background linear-gradient(360deg, #F0F1F1 0%, rgba(255, 255, 255, 0) 100%)
    box-shadow none
    border 1px solid #C0C3C5
    cursor not-allowed

</style>

<docs>
# BattleAttackSelectionButton
```js
import BattleAttackSelectionButton from
'/imports/client/ui/game/battle/BattleAttackSelectionButton.vue';
```

## Использование в шаблоне

```pug
BattleAttackSelectionButton(
  :isActive="true"
  :isDisabled="true"
  :description="string"
  @click="callback()"
) some useful content inside the button
```
## Параметры
```js
{Boolean} isActive // Активна ли внопка
{Boolean} isDisabled // Кнопка в состоянии disabled
{String} description // Дополнительное описание
```
</docs>
