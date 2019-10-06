<template lang="pug">
.ItemFilter
  .ItemFilter__select
    BaseSelect(
      :options="levels"
      v-model="filter.level"
    )
  .ItemFilter__select
    BaseSelect(
      :options="itemElements"
      v-model="filter.element"
    )
</template>

<script>
import range from 'lodash/range';
import translations from '/imports/client/ui/translations/ru.json';
import BaseSelect from '/imports/client/ui/components/BaseSelect';

const LEVELS_COUNT = 4; // TODO: вынести в какой-то конфиг

export default {
  name: 'ItemFilter',
  components: { BaseSelect },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    characterLevel: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    filter: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  created() {
    this.itemElements = [
      {
        id: '',
        label: 'Любая стихия',
      },
    ];
    this.levels = [
      {
        id: '',
        label: 'Любой уровень',
      },
    ];

    Object.keys(translations.ItemElement).forEach((key) => {
      this.itemElements.push({
        id: key,
        label: translations.ItemElement[key],
      });
    });

    range(0, LEVELS_COUNT + 1).forEach((level) => {
      this.levels.push({
        id: level,
        label: this.characterLevel === level ? `Мой уровень [${level}]` : `[${level}]`,
      });
    });
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'

.ItemFilter
  display flex
  padding 9px
  &__select
    flex-grow 1
    height 30px
    line-height 20px
    font-size 13px
    color rgba(118, 118, 118, 0.9)
    background $color_white
    border 1px solid #D0D0D0
    box-shadow 0 1px 4px rgba(0, 0, 0, 0.08)
    border-radius 3px
  &__select + &__select
    margin-left 4px
</style>
