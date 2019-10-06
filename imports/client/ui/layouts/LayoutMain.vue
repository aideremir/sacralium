<template lang="pug">
.LayoutMain
  header.LayoutMain__header
    slot(name="header")

  main.LayoutMain__content
    slot

  footer.LayoutMain__footer
    slot(name="footer")
      .LayoutMain__copyrights
        | Sacralium Games LLC © All rights reserved.
</template>

<style lang="stylus">
.LayoutMain
  display flex
  flex-direction column
  height 100%

  &__header
  &__footer
    display flex
    justify-content center
    align-items center
    min-height 52px
    box-sizing border-box

    background-color #2d2d2d
    background-image url(/images/layouts/layouts__panelsBG.png)
    background-repeat repeat-x

  &__header
    background-position bottom

  &__footer
    padding-top 5px
    background-position top

  &__content
    flex-basis 100%
    box-sizing border-box
    position relative

    background:
      url(/images/layouts/layouts__contentBG_top.png) top,
      url(/images/layouts/layouts__contentBG_bottom.png) bottom
    background-repeat repeat-x

  &__copyrights
    display block
    text-align center
    font-size 12px
    color #767676

</style>

<docs>
## Главный layout

```js
import LayoutMain from '/imports/client/ui/layouts/LayoutMain';
```
### Использование
```pug
LayoutMain
  template(slot="header") отобразится в header'е
  div.SomeComponent Отобразится в центре
  template(slot="bottom") отобразится в footer'е
```

</docs>
