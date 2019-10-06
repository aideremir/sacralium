<template lang="pug">
.CharacterLook
  .CharacterLook__container
    .CharacterLook__shapeBackground
    .CharacterLook__shapeContainer

      .CharacterLook__shapeHeader
        .CharacterLook__characterLevelContainer
          .CharacterLook__characterLevel {{ character.calculated['Attribute/Level'] }}
          .CharacterLook__characterLevelDescription уровень
        .CharacterLook__characterName {{ character.name }}

      .CharacterLook__shapeItem(
        v-for="item in columnItemsLeft"
      )
        img(
          class="CharacterLook__itemImage"
          :src="getItemImg(item)"
          @click="selectItem(item)"
        )

      .CharacterLook__shapeItem.CharacterLook__shapeItem_primaryItem
        CharacterAvatar(
          :gender="character.gender"
          :background="character.background"
        )

      .CharacterLook__shapeItem(
        v-for="item in columnItemsRight"
      )
        img(
          class="CharacterLook__itemImage"
          :src="getItemImg(item)"
          @click="selectItem(item)"
        )
</template>

<script>
import CharacterAvatar from '/imports/client/ui/character/CharacterAvatar.vue';

const emptySlotsImagesPath = '/images/character/CharacterLook/empty_slots/';

export default {
  name: 'CharacterLook',
  components: {
    CharacterAvatar,
  },
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  computed: {
    equipment() {
      return this.character.equipment || {};
    },
  },
  created() {
    this.columnItemsLeft = ['Head', 'Forearms', 'MainHand', 'Torso', 'Waist'];
    this.columnItemsRight = ['Shoulders', 'Hands', 'Offhand', 'Legs', 'Feet'];
  },
  methods: {
    getItemImg(item) {
      return this.equipment[item]
        ? `/images/${this.equipment[item].typeId}/1x.png`
        : `${emptySlotsImagesPath}${item}.png`;
    },
    selectItem(item) {
      this.$emit('selectItem', item);
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'

$headerCharacterColor = $color_textGray
$characterLevelColor = $color_textGray
// изначальные ширина и высота блока. Взяты из размеров фоновго изображения
$bgBlockWidth = 419px
$bgBlockHeight = 402px
$slotsBlockWidth = 340px
$slotsBlockHeight = 380px
$innerGridWidth = 327px
$innerContainerHeight = 373px
$blockMaxSizePercents = 0.85

$gridHeaderRow = 17%
$gridRow1 = 18%
$gridRow2 = 13%
$gridRow3 = 19%
$gridRow4 = 18%
$gridRow5 = 15%

$resolutions = (380px 0.70) (340px 0.7) (300px 0.6)

.CharacterLook
  display flex
  justify-content center

  min-width $slotsBlockWidth
  min-height $slotsBlockHeight

  for $res in $resolutions
    @media screen and (max-width: $res[0])
      min-width $slotsBlockWidth * $res[1]
      min-height $slotsBlockHeight * $res[1]

  &__container
    position relative

    display flex
    justify-content center

    width $slotsBlockWidth
    height $slotsBlockHeight

    for $res in $resolutions
      @media screen and (max-width: $res[0])
        width $slotsBlockWidth * $res[1]
        height $slotsBlockHeight * $res[1]

  &__shapeBackground
    position absolute
    z-index -1

    width ($bgBlockWidth*100/$slotsBlockWidth)%
    height ($bgBlockHeight*100/$slotsBlockHeight)%

    background url('/images/character/CharacterLook/slots_bg.png') no-repeat top
    background-size contain

  &__shapeContainer
    display grid
    width ($innerGridWidth*100/$slotsBlockWidth)%
    height ($innerContainerHeight*100/$slotsBlockHeight)%
    box-sizing border-box

    grid-template-areas "head head head" "A shape G" "B shape H" "C shape I" "D shape J" "E shape K"
    grid-template-columns 21.5% 57% 21.5%
    grid-template-rows $gridHeaderRow $gridRow1 $gridRow2 $gridRow3 $gridRow4 $gridRow5
    grid-auto-flow column
    justify-items stretch
    align-items stretch

  &__shapeHeader
    grid-area head
    display flex
    justify-content left
    align-items center
    min-height 100%
    box-sizing border-box
    padding 1% 1% 4%

    @media screen and (min-width: 300px)
      padding 1% 1% 4%

  &__characterLevelContainer
    width 17%
    display flex
    flex-direction column
    align-items center

  &__characterLevel
    font-size 12px
    font-weight bold
    color $characterLevelColor

    @media screen and (max-width: 320px)
      font-size 10px

  &__characterLevelDescription
    font-size 9px

    @media screen and (max-width: 320px)
      font-size 7px

  &__characterName
    width 66%
    overflow hidden
    padding 0 2%
    box-sizing border-box

    text-align center
    text-overflow ellipsis
    font-weight bold
    color $headerCharacterColor

  &__shapeItem
    display flex
    align-items center
    justify-content center

    &_primaryItem
      z-index -2
      display flex
      grid-area shape
      align-self stretch
      align-items center
      justify-content center
      overflow hidden

  &__itemImage
    max-width 80%
    max-height 80%

</style>

<docs>
# Внешний вид персонажа
```js
import CharacterLook from '/imports/client/ui/character/CharacterLook.vue';
```

## Использование

```pug
CharacterLook(
  :character="character"
)
```

## Параметры
```js
/**
 * Пример объекта imports/client/ui/game/battle/data-examples/character-example.js
 *
 * {string} character.name - имя персонажа, возможно, будет удалено
 * {integer} character.calculated['Attribute/Level'] - уровень персонажа
 * {string} character.gender - пол персонажа для аватары
 * {string} character.background - фон для аватары
*/
{Object} character - объект персонажа

Максимальные размеры блока - 419x402px. Сейчас ограничены фоновой картинкй
</docs>
