<template lang="pug">
.BaseSelect(
  :class="{'BaseSelect_disabled': disabled, 'BaseSelect_error': hasError}"
  :data-error-text="error"
)
  .BaseSelect__container
    select.BaseSelect__control(
        :disabled="disabled"
        v-model="selected"
      )
      option(
        v-for="option in options"
        :value="option[optionValueKey]"
      ) {{ option[optionLabelKey] }}
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: '',
    },
    disabled: Boolean,
    error: {
      type: String,
      default: '',
    },
    optionLabelKey: {
      type: String,
      default: 'label',
    },
    optionValueKey: {
      type: String,
      default: 'id',
    },
  },
  computed: {
    hasError() {
      return !!this.error;
    },
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'

$select__color_bg = $color_white
$select__color_border = $color_gray
$select__color_text = rgba(118, 118, 118, 0.9)
$select__color_selected = $color_gray
$select__height = 30px
$select__arrow_height = 6px
$select__arrow_color = #767676

.BaseSelect
  position relative
  height $select__height
  background-color $select__color_bg
  border 1px solid #D0D0D0
  box-shadow 0px 1px 4px rgba(0, 0, 0, 0.08)
  border-radius 3px
  box-sizing border-box
  &_disabled
    opacity 0.5
    pointer-events none
    cursor default
  &_error
    &:after
      content ''
      position absolute
      bottom -3px

      display block
      width 100%
      height 2px

      border-radius 3px

  &_error
    &[data-error-text]:before
      content attr(data-error-text)
      position absolute
      left 3px
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

    &:after
      background-color $color_red
  &__container
    display flex
    align-items center
    height 100%
    overflow hidden
    &:after
      content ''
      position absolute
      right 9px
      top 50%
      transform translateY(-50%)
      width 0
      height 0
      border solid $select__arrow_height
      border-bottom-width 0
      border-color $select__arrow_color transparent transparent
      pointer-events none
  &__control
    width 100%
    height 100%
    border none
    padding 0 9px
    background transparent
    color $select__color_text
    -webkit-appearance none
    outline none
    cursor pointer
</style>

<docs>
  # Выпадающий список (BaseSelect)

  ```js
  import BaseSelect from '/imports/client/ui/components/BaseSelect';
  ```

  ### Использование
  ```pug
  BaseSelect(
    :options="optionsArray"
    v-model="selectedOption"
  )
  ```

  ### Параметры
  `v-model:Number|String` - Выбранное значение опции

  `options:Array` - Массив опций

  `disabled:Boolean` - Деактивация контрола

  `optionLabelKey:String ('label')` - Поле в объекте опции, отвечающее за название опции

  `optionValueKey:String ('id')` - Поле в объекте опции, отвечающее за значение опции
</docs>
