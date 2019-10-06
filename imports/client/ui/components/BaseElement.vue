<template lang="pug">
.BaseElement
  img.BaseElement__image(
    :src="imageUrl"
    :alt="label"
    :title="label"
  )
</template>

<script>
import translations from '/imports/client/ui/translations/ru.json';

export default {
  name: 'BaseElement',
  props: {
    name: {
      type: String,
      required: true,
      validator (value) {
        return ['Earth', 'Universe', 'Fire', 'Water', 'Air'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    imageUrl() {
      return `/images/Element/${this.name}.png`;
    },
    label() {
      return translations.ItemElement[this.name] || '';
    },
  },
};
</script>

<style lang="stylus" scoped>
.BaseElement
  &__image
    display block
    max-width 20px
    max-height 20px
</style>

<docs>
  # Стихия (BaseElement)

  ```js
  import BaseElement from '/imports/client/ui/components/BaseElement';
  ```

  ### Использование
  ```pug
  BaseElement(
    :name="Fire"
  )
  ```

  ### Параметры

  ```ts
  <String> name // Ключ стихии (Earth | Universe | Fire | Water | Air)
  ```
</docs>
