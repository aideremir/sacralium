<template lang="pug">
.BattleArmorActive(
  :class="{ BattleArmorActive_mirrored: isMirrored }"
)
  .BattleArmorActive__part.BattleArmorActive__part_head(
    :class="{ BattleArmorActive__part_empty: head === 0 }"
  )
    .BattleArmorActive__part_value {{ head }}
    .BattleArmorActive__part_image

  .BattleArmorActive__part.BattleArmorActive__part_torso(
    :class="{ BattleArmorActive__part_empty: torso === 0 }"
  )
    .BattleArmorActive__part_value {{ torso }}
    .BattleArmorActive__part_image

  .BattleArmorActive__part.BattleArmorActive__part_waist(
    :class="{ BattleArmorActive__part_empty: waist === 0 }"
  )
    .BattleArmorActive__part_value {{ waist }}
    .BattleArmorActive__part_image

  .BattleArmorActive__part.BattleArmorActive__part_legs(
    :class="{ BattleArmorActive__part_empty: legs === 0 }"
  )
    .BattleArmorActive__part_value {{ legs }}
    .BattleArmorActive__part_image

</template>

<script>
export default {
  name: 'BattleArmorActive',
  props: {
    isMirrored: Boolean,
    head: {
      type: Number,
      default: 0,
    },
    torso: {
      type: Number,
      default: 0,
    },
    waist: {
      type: Number,
      default: 0,
    },
    legs: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="stylus">
bodyPartBlock($part, $blockHeight, $imageHeight, $imageTop)
  height $blockHeight

  & .BattleArmorActive__part_value
    top $imageTop

  & .BattleArmorActive__part_image
    height $imageHeight
    background-image 'url(/images/battle/ArmorActive/armor_%s.png)' % $part

  &.BattleArmorActive__part_empty .BattleArmorActive__part_image
    background-image 'url(/images/battle/ArmorActive/armor_%s_0.png)' % $part

.BattleArmorActive
  min-width 60px

  *
    box-sizing border-box

  &__part
    position relative

    &_value
      position absolute
      z-index 1
      width 40px
      min-height 11px
      padding 0 2px 1px
      line-height 1
      font-size 11px
      font-weight bold
      color #fff
      background #bababa
      border-radius 3px
      text-shadow 0 0 2px rgba(0, 0, 0, 0.35)

      ^[0]:not(^[0]_mirrored) &
        left 0
        margin-left 20px
        text-align right

      ^[0]_mirrored &
        right 0
        margin-right 20px

    &_empty
      & .BattleArmorActive__part_value
        background #c49d9d

    &_image
      position absolute
      z-index 2
      top 0
      width 47px
      background center no-repeat

      ^[0]:not(^[0]_mirrored) &
        left 0

      ^[0]_mirrored &
        right 0

    &_head
      bodyPartBlock(head, 19px, 28px, 3px)

    &_torso
      bodyPartBlock(torso, 27px, 45px, 5px)

    &_waist
      bodyPartBlock(waist, 14px, 23px, 4px)

    &_legs
      bodyPartBlock(legs, 56px, 56px, 21px)

</style>

<docs>
# Карта активной брони
```js
import BattleArmorActive from '/imports/client/ui/game/battle/BattleArmorActive.vue';
```

## Использование

```pug
BattleArmorActive(
  isMirrored
  :head="Number"
  :torso="Number"
  :waist="Number"
  :legs="Number"
)
```

## Параметры
```js
{Boolean} isMirrored - обычный или отеркаленны вариант
{Number} head - количество брони на голове
{Number} torso - количество брони на теле
{Number} waist - количество брони на поясе
{Number} legs - количество брони на ногах
```

Если количество брони для определенной области не передано, по-умолчанию будет 0
</docs>
