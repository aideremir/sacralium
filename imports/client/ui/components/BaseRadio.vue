<template lang="pug">
label.BaseRadio(
  :class="{'BaseRadio_disabled': disabled}"
)
  .BaseRadio__radioWrapper
    input.BaseRadio__input(
      type="radio"
      @change="onChange"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
    )

    .BaseRadio__radio(
      :class="{'BaseRadio__radio_checked': isChecked}"
    )

  .BaseRadio__labelText
    slot

</template>

<script>
export default {
  model: {
    prop: 'picked',
    event: 'change',
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    picked: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    checked: Boolean,
  },
  computed: {
    isChecked() {
      return this.picked === this.value;
    },
  },
  created() {
    if (this.checked === true) {
      this.onChange();
    }
  },
  methods: {
    onChange() {
      this.$emit('change', this.value);
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'

$radio__color_base = #828282
$radio__color_label = $color_gray

$radio__size = 18px
$radio__size_check = ($radio__size - (3px * 2))

@keyframes BaseRadio__animation_onCheck
  0%
    width 0
    height 0
    opacity 0
  100%
    width $radio__size_check
    height $radio__size_check
    opacity 1

.BaseRadio
  position relative

  display flex
  align-items center
  margin 10px

  font-size 13px

  &__radioWrapper
    flex-shrink 0
    position relative

    display block
    width $radio__size
    height @width

  &__radio
    position absolute
    left 0
    top 0

    display block
    width 100%
    height @width
    box-sizing border-box

    border solid 1px $radio__color_base
    border-radius 50%

    cursor pointer

    &:before
      content ''
      position absolute
      left 50%
      top @left

      display block
      width 0
      height 0
      border-radius 50%
      transform translate(-50%, -50%)

    &_checked:before
      width $radio__size_check
      height @width

      background-color $radio__color_base
      animation BaseRadio__animation_onCheck .2s

  &_disabled &__radio
    opacity .4
    cursor default

  &__input
    position absolute
    left 0
    top 0
    padding 0
    margin 0

    width 100%
    height 100%
    opacity 0

  &__input:focus ~ &__radio
    box-shadow 0px 2px 10px rgba(0, 0, 0, 0.2)

  &__labelText
    margin-left 9px
    font-size inherit
    color $radio__color_label

</style>


<docs>
# Радио-кнопка

```js
import BaseRadio from '/imports/client/ui/components/BaseRadio';
```

### Использование

```pug
BaseRadio
  value="radioValue"
  v-model="radioVar"
  :checked="isChecked"
  :disabled="isDisabled"
```

## Описание и принцип работы
Повторяет функционал стандартного `input[type="radio"]`
Сохранена возможность фокусирования на элементе, переключение стрелками

Используется в группе из 2х и более компонентов.

Работает с `v-model` (`@change` + `picked`),
значение `picked` должно совпадать с заданным `value`
(является обязательным).

### Выбор активного пункта
При указании `checked` элемент становится активным —
значение `picked` устанавливается равным `value`.

В случае, когда `checked` имеют несколько компонентов,
активным становится последний созданный (`created`).

### Параметры
`v-model:String` - Реактивная переменная

`value:String`* - Значение текущего пункта radio

`disabled:Boolean` - Деактивация элемента

`checked:Boolean` - Определяет текущий компонент как активный

`picked:String` - Значение выбранного параметра

### События
`@change` - срабатывает при переключении, возвращает текущее значение `value`

</docs>
