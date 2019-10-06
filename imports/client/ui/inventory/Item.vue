<template lang="pug">
.Item(
  :title="item.title"
  :class="{'Item_selected': selected}"
  @click="$emit('click')"
  )
  .Item__content
    .Item__title {{ item.title }}
      .Item__level [{{ item.level }}]
    .Item__params
      BaseElement(:name="item.element")
      .Item__param(v-if="damage") {{ damage.min }}-{{ damage.max }}
      .Item__param(
        v-if="armor"
      ) {{ armor.min }}-{{ armor.max }}
    .Item__iconContainer
      img.Item__icon(
        :src="`/images/${item.id}/2x.png`"
      )
    .Item__price(v-if="mode === 'shop'")
      BaseCurrency(:amount="item.price")
</template>

<script>
import _ from 'lodash';
import AttributesArmorPassive from '/imports/content/Attribute/ArmorPassive';
import helpers from '/imports/client/ui/helpers/common';
import BaseElement from '/imports/client/ui/components/BaseElement';
import BaseCurrency from '/imports/client/ui/components/BaseCurrency';

export default {
  components: { BaseCurrency, BaseElement },
  props: {
    item: {
      type: Object,
      required: true,
      validator(value) {
        return helpers.hasProperties(value, [
          'id',
          'title',
          'weight',
          'level',
          'category',
          'price',
          'element',
        ]);
      },
    },
    selected: {
      type: Boolean,
    },
    mode: {
      type: String,
      required: true,
      default: 'shop',
      validator (value) {
        return ['shop', 'inventory'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    armor() {
      return Object.values(
        _.pick(this.item.attributeMods, Object.keys(AttributesArmorPassive)),
      )[0];
    },
    damage() {
      return this.item.attributeMods?.['Attribute/Damage'];
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'

.Item
  height 100%
  background-color $color_background
  background-image url('/images/layouts/layouts__contentBG_bottom.png')
  background-position 50% 100%
  background-repeat repeat-x
  border 1px solid #d5d5d5
  box-shadow 0 2px 8px rgba(0, 0, 0, 0.07)
  border-radius 3px
  cursor pointer

  &_selected
    margin -1px
    border 1px solid #c6c9cc
    background #ededed

  &__content
    display flex
    flex-direction column
    justify-content flex-end
    align-items center
    padding 4px 2px
    width 100%
    height 100%
    box-sizing border-box
    border 1px solid $color_white
    border-radius 3px

  &__iconContainer
    display flex
    justify-content center
    align-items center
    width 100%
    min-height 80px
    padding 0 16px
    box-sizing border-box

    @media screen and (min-width: 800px)
      min-height 160px

  &__icon
    display block
    max-width 100%
    margin-bottom 3px

  &__title
    margin-bottom auto
    color $color_black
    font-size 12px
    line-height 14px
    text-align center

  &__level
    display inline
    color $color_gray

  &__params
    display flex
    width 100%
    margin-top 4px
    padding 0 11px
    justify-content space-between
    align-items center
    box-sizing border-box

  &__param
    color #8f8f8f
    font-size 11px
    line-height 1
    text-align center
</style>

<docs>
# Предмет (Item)

```js
import Item from '/imports/client/ui/inventory/Item';
```

### Использование
```pug
Item(
  :item="itemObject"
  @click="doMethod"
)
```

#### Выбранный предмет
```pug
Item(
  :item="itemObject"
  :selected="itemObject === itemObject"
  @click="doMethod"
)
```

### Параметры

```ts
<Object> item // Объект предмета
<Boolean> selected // Выбран / не выбран
<String> mode // режим отображения (shop | inventory)
```
</docs>
