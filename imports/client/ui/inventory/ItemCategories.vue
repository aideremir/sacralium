<template lang="pug">
.ItemCategories
  .ItemCategories__list
    ItemCategory(
      :category="allCategory"
      :selected="!selectedCategory"
      @click="$emit('reset')"
    )
    ItemCategory(
      v-for="category in categories"
      :category="category"
      :key="category"
      :selected="category === selectedCategory"
      @click="$emit('select', category)"
    )
</template>

<script>
import ItemCategory from '/imports/client/ui/inventory/ItemCategory';

export default {
  components: {
    ItemCategory,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
    selectedCategory: {
      type: String,
      default: '',
    },
  },
  created() {
    this.allCategory = 'Item/All';
  },
};
</script>

<style lang="stylus">
.ItemCategories
  height 50px
  &__list
    display flex
    padding 1px 60px
    min-height 50px
    min-width 100%
    box-sizing border-box
    overflow-x auto
    overflow-y hidden
    overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    &:after
      content ''
      position static
      min-width 60px
      min-height 100%
</style>

<docs>
# Список категорий магазина/инвентаря (ItemCategories)

```js
import ItemCategories from '/imports/client/ui/inventory/ItemCategories';
```

### Использование
```pug
ItemCategories(
  :categories="categoriesArray"
  @select="doMethod"
)
```

```ts
<Array> categories // Список категорий
<Object> selectedCategory // Выбранная категория
```
</docs>
