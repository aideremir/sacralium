<template lang="pug">
.BaseProgress(
  :class=`{
    'BaseProgress_green': green,
    'BaseProgress_yellow': yellow,
    'BaseProgress_gray': gray,
    'BaseProgress_red': red,
    'BaseProgress_small': small,
    'BaseProgress_onSide': onSide,
    'BaseProgress_inverted': inverted,
  }`
)
  .BaseProgress__bar
    span.BaseProgress__field(
      :style="`width: ${percent}`"
    )
  .BaseProgress__counter
    template(v-if="percentage")
      | {{percent}}

    template(v-else)
      | {{formatNumber(value)}}/{{formatNumber(max)}}

</template>

<script>
import commonHelper from '/imports/client/ui/helpers/common';

export default {
  props: {
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      required: true,
      default: 0,
    },
    percentage: Boolean,
    small: Boolean,
    onSide: Boolean,
    inverted: Boolean,
    green: Boolean,
    yellow: Boolean,
    gray: Boolean,
    red: Boolean,
  },
  computed: {
    percent() {
      const percent = Math.ceil(this.value / this.max * 100);
      return `${percent}%`;
    },
  },
  methods: {
    formatNumber(num) {
      return commonHelper.formatNumberWithISO(Number(num));
    },
  },
};
</script>


<style lang="stylus">
$BaseProgress__color_default = #EEE2CA
$BaseProgress__color_green = #55b822
$BaseProgress__color_red = #e42525
$BaseProgress__color_yellow = #ebc531
$BaseProgress__color_gray = #e6e6e6

$BaseProgress__size_default = 16px
$BaseProgress__size_small = 8px


BaseProgress__fieldColors($baseColor)
  background linear-gradient(180deg, $baseColor 0%, darken($baseColor, 30%) 100%)
  border 1px solid lighten($baseColor, 30%)
  border-bottom-color darken($baseColor, 20%)

.BaseProgress
  position relative
  display flex
  height $BaseProgress__size_default
  width 100%

  &_small
    height $BaseProgress__size_small

  &__bar
    flex-grow 1
    display block

    box-sizing border-box
    background-color #555555
    border-radius 4px
    border 1px solid #FFF
    box-shadow 0 0 2px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(#3B3B3B, 1)

    ~/_inverted &
      border 1px solid #686868

    ~/_inverted^[0]_small &
      background-color #1e1e1e

  &__field
    display block
    height calc(100% - 4px)
    width 0
    max-width calc(100% - 4px)
    margin 1px

    BaseProgress__fieldColors($BaseProgress__color_default)
    border-radius 2px

  &_green &__field
    BaseProgress__fieldColors($BaseProgress__color_green)

  &_yellow &__field
    BaseProgress__fieldColors($BaseProgress__color_yellow)

  &_red &__field
    BaseProgress__fieldColors($BaseProgress__color_red)

  &_gray &__field
    BaseProgress__fieldColors($BaseProgress__color_gray)

  &__counter
    position absolute
    left 50%
    top 50%

    display block
    width 60px
    height 100%

    text-align center
    font-size 11px
    font-weight 500
    text-shadow 0 0 1px rgba(0,0,0,.9)

    color #FFF
    transform translate(-50%, -50%)

    ~/_onSide &
    ~/_small &
      position relative
      left unset
      top unset
      margin-left 5px

      font-weight 700
      text-shadow unset
      color rgba(#000,.75)
      transform unset

      ~/_inverted&
        color rgba(#FFF,.75)

    ~/_small &
      width 50px
      font-size 9px
      line-height 90%

</style>

<docs>
## Полоса прогресса

```js
import BaseProgress from '/imports/client/ui/components/BaseProgress';
```

### Пример использования
```pug
BaseProgress(
  green
  small
  inverted
  :max="256"
  :value="78"
)
```

### Параметры
`value: Number` - Текущее значение

`max: Number (100)` - Максимальное значение

`percentage: Boolean` - Показывать значение в процентах

`small: Boolean` - Изменяет размер прогресс-бара на маленький

`onSide: Boolean` - Отображение значения справа от бара

`inverted: Boolean` - Инвертирование цветов для использования на темном фоне

#### Цвета прогресс-бара
`yellow: Boolean` - желтый

`gray: Boolean` - серый

`green: Boolean` - зеленый цвет

`red: Boolean` - красный цвет


</docs>
