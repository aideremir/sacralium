<template lang="pug">
.Items
  .Items__card(
    v-for="item in items"
    :key="item.id"
    :class="{'Items__card_shop': mode === 'shop'}"
  )
    Item(
      :item="item"
      :selected="selectedItem && item.id === selectedItem.id"
      :mode="mode"
      @click="$emit('select', item)"
    )
</template>

<script>
import BaseGrid from '/imports/client/ui/components/BaseGrid';
import Item from '/imports/client/ui/inventory/Item';

export default {
  components: {
    BaseGrid,
    Item,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectedItem: {
      type: Object,
      default: () => ({}),
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
};
</script>

<style lang="stylus">
$items__gutter = 1px

.Items
  display flex
  flex-wrap wrap
  margin -($items__gutter)
  padding 0 9px
  &__card
    padding $items__gutter
    flex-basis calc(100% / 2)
    min-width calc(100% / 2)
    box-sizing border-box

    @media screen and (min-width: 375px)
      flex-basis calc(100% / 3)
      min-width calc(100% / 3)

    @media screen and (min-width: 800px)
      flex-basis calc(100% / 4)
      min-width calc(100% / 4)

    &_shop
      @media screen and (min-width: 800px)
        flex-basis calc(100% / 6)
        min-width calc(100% / 6)
</style>

<docs>
# Список предметов магазина/инвентаря (Items)

```js
import Items from '/imports/client/ui/inventory/Items';
```

### Использование
```pug
Items(
  :items="itemsArray"
  @select="doMethod"
)
```

```ts
<Array> items // Список предметов
<Object> selectedItem // Выбранный предмет
<String> mode // режим отображения (shop | inventory)
```
</docs>
