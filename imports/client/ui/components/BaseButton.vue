<template lang="pug">
button.BaseButton(
  :class="{'BaseButton_light': light}"
  @click="$emit('click')"
) {{text}}
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Нажать',
    },
    light: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus">
.BaseButton
  position relative
  height 30px
  padding 0 20px 0px
  box-sizing border-box

  font-size 13px
  line-height 30px
  color #FFFFFF
  text-shadow 0px 1px 3px rgba(0, 0, 0, 0.6)
  background url(/images/button/btn_bg.png) repeat-x center
  border none
  cursor pointer

  transition all .3s ease

  &:active:not([disabled]),
  &:hover:not([disabled])
    box-shadow 2px 3px 6px rgba(0,0,0,.3)

  &:before,
  &:after
    content ''
    position absolute
    top -1px
    display block
    width 26px
    height 32px
    background-position center
    background-repeat no-repeat
    pointer-events none

  &:before
    left -3px
    background-image url(/images/button/btn_border_l.png)

  &:after
    right -3px
    background-image url(/images/button/btn_border_r.png)

  &_light
    color rgba(0, 0, 0, 0.9)
    text-shadow 0px 1px 3px rgba(255, 255, 255, 0.7)
    background-image url(/images/button/btn_bg_light.png)

    &:before
      background-image url(/images/button/btn_border_l_light.png)

    &:after
      background-image url(/images/button/btn_border_r_light.png)

  &_disabled, &[disabled]
    opacity .3
    cursor default

  &:focus
    outline none
    box-shadow 0px 2px 10px rgba(0, 0, 0, 0.2)

</style>

<docs>
# Стандартная кнопка (BaseButton)

```js
import BaseButton from '/imports/client/ui/components/BaseButton';
```

### Использование
```pug
BaseButton(
  text="Название кнопки"
  @click="doMethod"
)
```
#### Светлая версия
```pug
BaseButton(
  text="Название кнопки"
  light
  @click="doMethod"
)
```

### Параметры

| Param        | Type / Default      | Description                   |
| ------------ | ------------------- | ----------------------------- |
| **text**     | *String* / "Нажать" | Текст на кнопке               |
| **light**    | *Boolean*           | Переключает режим отображения |
| **disabled** | *Boolean*           | Деактивация кнопки            |

----
```ts
<String> text = "Нажать" // Текст на кнопке
<Boolean> light // Переключает режим отображения
<Boolean> disabled // Деактивация кнопки
```

<!-- STORY -->
</docs>
