<template lang="pug">
.BaseCurrency(:class="{BaseCurrency_dark: isDark}")
  .BaseCurrency__item(
    v-for="(value, currency) in amount"
    :index="currency"
  )
    img.BaseCurrency__icon(:src="`/images/${currency}.png`")
    span.BaseCurrency__label {{ value }}
</template>

<script>
export default {
  props: {
    amount: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    isDark: Boolean,
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'

.BaseCurrency
  display flex
  align-items center

  &_dark
    & ^[0]__item
      background #1C1C1C
      border 1px solid #0C0C0C
      box-sizing border-box
      box-shadow 0 1px 4px rgba(255, 255, 255, 0.25)
      border-radius 15px

    & ^[0]__label
      min-width 57px
      font-weight 500
      font-size 13px
      line-height 20px
      color $color_white

  &__item
    margin-right 2px
    display flex
    align-items center

  &__icon
    margin-right 2px

  &__label
    font-weight 500
    font-size 12px
    line-height 16px
    letter-spacing -0.05em
    color $color_black
</style>

<docs>
# Валюты

```js
import BaseCurrency from '/imports/client/ui/components/BaseCurrency.vue';
```

## Использование

```pug
ItemPrice(
  :amount="amount"
)
```

## Параметры
```ts
<Object> amount // Объект цены, например: {'Currency/Dinar': 50, 'Currency/Ether': 100}
```

</docs>
