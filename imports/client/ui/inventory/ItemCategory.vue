<template lang="pug">
.ItemCategory(
  :title="category"
  :class="{'ItemCategory_selected': selected, 'ItemCategory_disabled': disabled}"
  @click="$emit('click')"
  )
  img.ItemCategory__icon(
    :src="`/images/${category}.png`"
  )
  .ItemCategory__title {{ translations[category] }}
</template>

<script>
import translations from '/imports/client/ui/translations/ru.json';

export default {
  props: {
    category: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
  created() {
    this.translations = translations.ItemCategory;
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'

.ItemCategory
  display flex
  padding 6px 8px
  min-width 50px
  flex-direction column
  justify-content flex-end
  align-items center

  @media screen and (min-width: 800px)
    cursor pointer

  &_selected
    padding 6px 6px 4px
    background $color_background;
    border 2px solid $color_white
    box-shadow 0 2px 6px rgba(0, 0, 0, 0.25);
    border-radius 3px

  &_disabled
    opacity 0.5
    pointer-events none
    cursor not-allowed

  &__icon
    align-self center
    display block
    max-height 18px
    max-width 18px

  &__title
    font-size 11px
    line-height 16px
    color rgba(0, 0, 0, 0.7)
</style>

<docs>
# Категория магазина/инвентаря (ItemCategory)

```js
import ItemCategory from '/imports/client/ui/inventory/ItemCategory';
```

### Использование
```pug
ItemCategory(
  :category="categoryObject"
  @click="doMethod"
)
```
### С заголовком
```pug
ItemCategory(
  :category="categoryObject"
  showTitle
  @click="doMethod"
)
```

#### Выбранная категория
```pug
ItemCategory(
  :category="categoryObject"
  :selected="categoryObject === selectedCategoryObject"
  @click="doMethod"
)
```

#### Неактивная категория
```pug
ItemCategory(
  :category="categoryObject"
  :disabled="true"
  @click="doMethod"
)
```

### Параметры

```ts
<Object> category // Объект категории
<Boolean> selected // Выбрана / не выбрана
<Boolean> disabled // Активна / не активна
<Boolean> showTitle // Отображение заголовка
```
</docs>
