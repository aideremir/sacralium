<template lang="pug">
label.BaseCheckbox(
  :class=`{
    'BaseCheckbox_disabled': disabled,
    'BaseCheckbox_error': !!error,
  }`
  :data-error-text="error"
)
  .BaseCheckbox__checkboxWrapper
    input.BaseCheckbox__input(
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @change="$emit('change', $event.target.checked)"
    )

    .BaseCheckbox__checkbox(
      :class="{'BaseCheckbox__checkbox_checked': checked}"
    )
      .BaseCheckbox__checkSymbol

  .BaseCheckbox__labelText
    slot

</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
    disabled: Boolean,
    error: {
      type: String,
      default: null,
    },
  },
  computed: {
    hasError() {
      return !!this.error;
    },
  },
};

</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'

$checkbox__color_base = #828282
$checkbox__color_unchecked = rgba($checkbox__color_base, 0)
$checkbox__color_label = $color_gray

$checkbox__size = 18px

// checkbox mixin
BaseCheckbox-checked(isChecked)
  if isChecked
    background-color $checkbox__color_base
  else
    background-color $checkbox__color_unchecked

/* Анимации для того, чтобы снизить нагрузку на процессор
в этом случае отрисовка происходит в отдельном слое, и требует меньше ресурсов */

// Анимация для состояния checked
@keyframes BaseCheckbox__animation_onCheck
  0%
    BaseCheckbox-checked(false)
  100%
    BaseCheckbox-checked(true)

// Анимация для состояния unchecked
@keyframes BaseCheckbox__animation_onUncheck
  0%
    BaseCheckbox-checked(true)
  100%
    BaseCheckbox-checked(false)

@keyframes BaseCheckbox__animation_checkIn
  0%
    transform translate(-50%, -100%)
    display none
  100%
    transform translate(-50%, -50%)

.BaseCheckbox
  position relative

  display flex
  align-items center
  margin 10px 0

  font-size 13px

  &__checkboxWrapper
    flex-shrink 0
    position relative

    display block
    width $checkbox__size
    height @width

  &__checkbox
    position absolute
    left 0
    top 0

    display block
    height 100%
    width 100%
    box-sizing border-box

    border solid 1px $checkbox__color_base
    border-radius 3px

    BaseCheckbox-checked(false)
    animation BaseCheckbox__animation_onUncheck .2s

    &_checked
      BaseCheckbox-checked(true)
      animation BaseCheckbox__animation_onCheck .3s


  &_disabled &__checkbox
    opacity .4

  &__checkSymbol
    position absolute
    left 0
    top -20px

    display none
    width 100%
    height 100%

    &:before
    &:after
      content ''
      position absolute

      display block
      width 2px
      height 12px

      background-color #FFF

    &:before
      transform: rotate(45deg) translate(8px,-5px);

    &:after
      height 7px
      transform rotate(-45deg) translate(-2px, 7px)

  &__checkbox_checked &__checkSymbol
    top 50%
    left 50%
    display block
    transform translate(-50%, -50%)
    animation BaseCheckbox__animation_checkIn .2s forwards

  &__input
    position absolute
    left 0
    top 0
    padding 0
    margin 0

    width 100%
    height 100%
    opacity 0

  &__input:focus ~ &__checkbox
    box-shadow 0px 2px 10px rgba(0, 0, 0, 0.2)

  &__labelText
    margin-left 9px
    font-size inherit
    color $checkbox__color_label


  // TODO: Переместить в миксин
  &_error
    &[data-error-text]:before
      content attr(data-error-text)
      position absolute
      left 0
      bottom calc(100% + 2px)

      padding 0 5px
      max-width calc(100% - 15px)
      box-sizing border-box

      font-size 11px
      color #FFF
      background $color_red
      border-radius 3px 3px 3px 0
      box-shadow 2px 4px 10px rgba($color_red, 0.5)
      opacity .8

  &_error:after
    content ''
    position absolute
    bottom -4px

    display block
    width 100%
    height 2px

    border-radius 3px
    background-color $color_red

</style>


<docs>
# Стандартный чекбокс
```js
import BaseCheckbox from '/imports/client/ui/components/BaseCheckbox';
```

### Использование
```pug
BaseCheckbox(
  v-model="checked"
  :error="checkbox.error"
  :disabled="isDisabled"
) Я согласен
```

## Описание и принцип работы
Сохранена возможность фокусирования на элементе через
табуляцию (accessibility), а так же переключение по пробелу.

Компонент работает с `v-model` (`@change` + `checked`)

`@change` возвращает текущее состояние – `true|false`.

### Параметры
`v-model:Boolean` - Реактивная переменная

`checked:Boolean (false)` - Текущее состояние чекбокса

`disabled:Boolean` - Деактивация чекбокса

`error:String` - Текст ошибки

### Методы
`@change` - срабатывает при переключении

</docs>
