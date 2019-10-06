<template lang="pug">
.CharacterInformer
  img.CharacterInformer__icon(
    src="/images/character/CharacterInformer/CharacterInformer__icon.png"
  )
  .CharacterInformer__content
    .CharacterInformer__name {{character.name}}
    .CharacterInformer__lvl {{character.calculated['Attribute/Level']}}
    .CharacterInformer__bars
      BaseProgress(
        inverted
        green
        :max="character.calculated['Attribute/Health']"
        :value="health"
      )
      .CharacterInformer__xpWrapper
        BaseProgress(
          v-if="!opponent"
          class="CharacterInformer__barXP"
          inverted
          small
          gray
          :max="character.experienceNext"
          :value="character.experience"
        )

    .CharacterInformer__power(v-if="!opponent") {{character.power}}


</template>

<script>
import BaseProgress from '/imports/client/ui/components/BaseProgress';

export default {
  components: {
    BaseProgress,
  },
  props: {
    character: {
      type: Object,
      required: true,
    },
    opponent: Boolean,
  },
  computed: {
    health () {
      return this.character.health || this.character.calculated['Attribute/Health'];
    },
  },
};
</script>

<style lang="stylus">
$CharacterInformer__height = 45px
$CharacterInformer__icon_size = $CharacterInformer__height
$CharacterInformet__leftSpace = 35px

.CharacterInformer
  position relative
  display block
  height $CharacterInformer__height
  width 150px

  &__icon
    display block
    width $CharacterInformer__icon_size
    height @width
    border-radius ceil(@width / 2)

  &__content
    position absolute
    left $CharacterInformet__leftSpace
    bottom 0px

    display block
    width "calc(100% - %s)" % $CharacterInformet__leftSpace
    height 100%

  &__name
    display block
    padding 2px 0

    font-size 13px
    line-height 100%
    color #FFF

  &__bars
    position absolute
    bottom 0
    left 25px
    width "calc(100% - %s)" % @left

  &__xpWrapper
    height 8px
    padding 1px

    border-radius 6px
    background #373737

  &__lvl
    position absolute
    left 0
    bottom 0
    display flex
    flex-direction column
    width 24px
    height 24px
    padding-right 5px
    justify-content center

    font-weight 600
    font-size 12px
    text-align center

    color #FFF
    background-color #1C1C1C
    border solid 1px #0C0C0C
    border-radius 3px

    &:after
      content 'LVL'
      font-size 7px
      line-height 100%
      color rgba(#FFF,.60)

  &__params
    display block

  &__power
    position absolute
    top calc(100% + 7px)
    left 0
    z-index 5

    display block
    padding 0 3px 3px 11px
    margin-left calc(24px / 2)

    line-height 100%
    color rgba(#000,.65)
    background #e5e5e5
    border solid 1px #DFDFDF
    border-bottom-color #7C7C7C
    border-right-color #7C7C7C
    border-radius 4px
    box-shadow 0 1px 4px rgba(0,0,0,.35)

    &:before
      content ''
      position absolute
      left calc(-24px / 2)
      top -7px

      display block
      width 24px
      height 28px

      background-image url(/images/character/CharacterInformer/CharacterInforme__power.png)
      background-repeat no-repeat
      background-size cover


</style>

<docs>
## Информер персонажа в шапке

```js
import CharacterInformer from '/imports/client/ui/character/CharacterInformer';
```

Информер с основными характеристиками для персонажа - здоровье, аватар,
текущий уровень XP, мощность, имя

### Использование
```pug
CharacterInformer(
  opponent
  :character="character"
)
```

### Параметры
`character: Object` - объект персонажа (`Meteor.user().character`), содержащий name, power и пр.

`opponent: Boolean` - режим показа противника. Отключает показ мощности и XP

</docs>
