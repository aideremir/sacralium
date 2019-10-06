<template lang="pug">
.LayoutFrame
  .LayoutFrame__content
    slot
</template>

<style lang="stylus">
$frameBorderWidth = 4px // Ширина бордюра родителя
$frameCornerImageSize = 52px // Фактический размер изображения с уголками
$frameCornerOutterSpace = 2px // Выступ уголков относительно родительского бордера
$frameCornerWidth = $frameCornerImageSize / 2 // Ширина одного уголка (px)

/* Сдвиг блока с уголками относительно родителя (px) */
$frameCornerOutter = ($frameBorderWidth + $frameCornerOutterSpace)

.LayoutFrame
  position relative
  display block
  box-sizing border-box

  border solid $frameBorderWidth
  border-image url(/images/frames/frame__border_gray.png)
  border-image-slice 30%

  &_noSideBorders
    border-left none
    border-right none
    margin 0 $frameBorderWidth

    & ^[0]__content
      margin-right -($frameBorderWidth)
      margin-left -($frameBorderWidth)

  &:before
    content ''

    position absolute
    left (- $frameCornerOutter)
    top @left

    display block
    width "calc(100% + %s)" % ($frameCornerOutter * 2)
    height "calc(100% + %s)" % ($frameCornerOutter * 2)

    box-sizing border-box

    border solid $frameCornerWidth
    border-image url(/images/frames/frame__corners_gray.png) stretch
    border-image-slice 50%
    z-index 10
    pointer-events none

  &__content
    position relative
    min-width $frameCornerImageSize
    min-height $frameCornerImageSize - ($frameBorderWidth * 2)
</style>

<docs>
## Рамка серая
```js
import LayoutFrame from '/imports/client/ui/layouts/LayoutFrame';
```

### Использование
```pug
.parent
  LayoutFrame
    .child
```

### Регулировка внутренних отступов
У фрейма нет своего padding'а в связи с непредсказуемостью порядка публикации CSS в `<head>`
правила могут быть перезаписаны.
Для исключения необходимости использования `!important`,
когда необходимость регулировки есть, внутренние отступы отключены полностью.

Использовать `LayoutFrame` следует вместе с CSS-классом,
который задает `padding` по месту. Например:

```
<template lang="pug">
.parent
  LayoutFrame.parent__box
    | Некоторый текст
</template>
```
```
<script lang="stylus">
.parent
  &__box
    padding 30px
    box-shadow 0 0 20px rgba(0,0,0,.4)
</script>
```

Таким образом отступ от границ рамки будет составлять 30px

</docs>
