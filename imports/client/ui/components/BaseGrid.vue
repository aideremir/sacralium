<template lang="pug">
.BaseGrid(
  :style="{'grid-template-columns': gridStyle}"
)
  slot
</template>

<script>
export default {
  props: {
    cols: {
      type: Number,
      required: true,
    },
  },
  computed: {
    gridStyle() {
      return `repeat(${this.cols}, ${100 / this.cols}%)`;
    },
  },
};
</script>

<style lang="stylus">
.BaseGrid
  display grid
</style>

<docs>
# Сетка (BaseGrid)

```js
import BaseGrid from '/imports/client/ui/components/BaseGrid';
```

### Использование
```pug
BaseGrid(
  :cols="4"
)
```

```ts
<Number> cols // Количество колонок
```
</docs>
