<template lang="pug">
.CharacterAttributesList
  .CharacterAttributesList__freeAttributePoints(v-if="freeAttributePoints")
    |+{{ freeAttributePoints }}
  ul.CharacterAttributesList__list
    li(
      v-for="(value, key) in attributes"
      :key="key"
    )
      CharacterAttributesListItem(
        :value="value"
        :distributedValue="distributedAttributes[key]"
        :attributeType="getAttributeType(key)"
        :disabledUp="!freeAttributePoints"
        :changeable="changeable"
        @increase="increaseAttribute"
        @decrease="decreaseAttribute"
      )
</template>

<script>
import CharacterAttributesListItem from '/imports/client/ui/character/CharacterAttributesListItem';

export default {
  name: 'CharacterAttributesList',
  components: { CharacterAttributesListItem },
  props: {
    attributes: {
      type: Object,
      required: true,
    },
    distributedAttributes: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    attributeTypes: {
      type: Object,
      required: true,
    },
    freeAttributePoints: {
      type: Number,
      default: 0,
    },
    changeable: Boolean,
  },
  methods: {
    getAttributeType (id) {
      return this.attributeTypes[id] || {};
    },
    increaseAttribute (attributeId) {
      this.$emit('change', { [attributeId]: 1 });
    },
    decreaseAttribute (attributeId) {
      this.$emit('change', { [attributeId]: -1 });
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'

.CharacterAttributesList
  position relative
  min-width 250px
  font-size 13px
  background-color $color_background
  user-select: none;

  &__list
    position relative
    padding 10px
    margin 0
    color $color_gray
    list-style none

  &__freeAttributePoints
    position absolute
    top -10px
    left 50%
    transform translateX(-50%)
    padding 1px 27px 1px 8px
    border solid 1px #dddedf
    border-radius 2px
    background-color $color_background
    background-image url(/images/character/CharacterAttributes/icon_attributes-up.png)
    background-position calc(100% - 8px) center
    background-repeat no-repeat
    line-height 1
    color $color_green
</style>

<docs>
## Характеристики персонажа

```js
import CharacterAttributesList from '/imports/client/ui/character/CharacterAttributesList';
```

## Использование

```pug
CharacterAttributesList(
  :attributes="attributes"
  :attributeTypes="attributeTypes"
  :freeAttributePoints="freeAttributePoints"
  :changeable="changeable"
  @change="changeSP"
)
```

## Параметры
```ts
<Object> attributes // Список текущих значений атрибутов персонажа
<Object> distributedAttributes // Список распределённых атрибутов персонажа
<Object> attributeTypes // справочник типов атрибутов
<Number> freeAttributePoints // Количество нераспределенных очков характеристик
<Boolean> changeable // Флаг редактируемых характеристик
```
## События
### `change`
Вызывается при изменении атрибута.

В качестве параметра передается объект
```
  { <ид_атрибута>: <новое_значение_атрибута> }
```
</docs>
