<template lang="pug">
.BaseInput
  label.BaseInput__label(v-if="label") {{label}}
  .BaseInput__field(
    :class=`{
      'BaseInput__field_error': hasError,
      'BaseInput__field_accept': isAccept,
    }`
    :data-error-text="error"
  )
    .BaseInput__inputWrapper
      input.BaseInput__input(
        :type="type"
        :value="value"
        :maxlength="max"
        :minlength="min"
        :placeholder="placeholder"
        :name="name"
        @input="$emit('input', $event.target.value)"
        :class="{'BaseInput__input_withCounter': showCount}"
      )
      .BaseInput__counter(
        v-if="showCount"
        :class="{'BaseInput__counter_isShort': isShort}"
      ) {{getCount}}
    .BaseInput__legend(v-if="legend") {{legend}}
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    legend: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: 'Введите текст',
    },
    max: {
      type: String,
      default: null,
    },
    min: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    error: {
      type: String,
      default: null,
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
    showCount: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasError() {
      if (this.error) {
        return true;
      }
      return false;
    },
    getCount() {
      const { length } = this.value;
      if (this.min && this.min > length) {
        return (length - this.min);
      }
      if (this.max) {
        return (this.max - length);
      }
      return length;
    },
    isShort() {
      const { length } = this.value;
      if (this.min && this.min > length) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'

.BaseInput
  display block
  margin 10px 0
  font-size 15px

  &__label
    display block
    color $color_textGray
    margin: 3px 0 5px

  &__field
    position relative
    display block

    &_error, &_accept
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

    &_accept
      &:after
        background-color $color_green

  &__inputWrapper
    position relative

  &__input
    display block
    width 100%
    height 26px
    padding 3px 9px
    box-sizing border-box

    font-size 13px
    background #FFF
    border 1px solid #D0D0D0
    border-radius 3px
    box-shadow 0px 1px 4px rgba(0, 0, 0, 0.08)
    transition box-shadow .3s ease

    &:focus
      outline none
      box-shadow 0px 2px 10px rgba(0, 0, 0, 0.2)

    &[disabled]
      background #DCDCDC

    &_withCounter
      padding-right 25px

  &__field_error &__input
    color $color_red

  &__field_accept &__input
    color $color_green

  &__counter
    position absolute
    right 2px
    bottom 4px

    display block
    padding 1px 2px

    font-size 11px
    line-height 16px
    color $color_textGray
    pointer-events none

    &_isShort
      color $color_red

</style>

<docs>
# Стандартный Input (BaseInput)

```js
import BaseInput from '/imports/client/ui/components/BaseInput';
```
### Использование
```pug
BaseInput(
  value="Значение"
  @input="doMethod"
  error="Текст ошибки"
  label="Заголовок поля"
  legend="Текст ПОД полем"
  placeholder="Плейсхолдер"
)
```

### Параметры

| Param           | Type / Default             | Description                      |
| --------------- | -------------------------- | -------------------------------- |
| **type**        | *String* / "text"          | Тип поля (number, text)          |
| **value**       | *String*                   | Значение                         |
| **error**       | *String*                   | Текст ошибки                     |
| **isAccept**    | *Boolean*                  | Подсвечивает поле как принятое   |
| **label**       | *String*                   | Лейбел для поля ввода            |
| **legend**      | *String*                   | Описание поля (выводится внизу)  |
| **placeholder** | *String* / "Введите текст" | Плейсхолдер                      |
| **showCount**   | *Boolean*                  | Включает показ счетчика          |
| **max**         | *String/Number*            | Максимальное количество символов |
| **min**         | *String/Number*            | Минимальное количество символов  |

---
```ts
<String> type = 'text' // Тип поля (number|text)
<String> value = null // Значение
<String> error // Текст ошибки
<Boolean> isAccept // Подсвечивает поле как прошедшее проверку
<String> label // Лейбел для поля ввода
<String> legend // Описание поля (выводится внизу)
<String> placeholder = "Введите текст" // Плейсхолдер
<Boolean> showCount // Включает показ счетчика
<String/Number> max // Максимальное количество символов
<String/Number> min // Минимальное количество символов
```

### Работа счетчика
Параметр `showCount` выводит счетчик текущего количества символов.

Опция может быть полезна, когда необходимо показать сколько символов
ввести для достижения минимального и/или максимального порога.

При `max` счетчик показывает количество доступных символов (положительное число).

При `min` - количество символов необходимое для достижения минимального (отрицательное число).
При достижении значения `min` продолжает работать в обычном режиме.

</docs>
