<template lang="pug">
.ItemDetails
  .ItemDetails__title
    .ItemDetails__element
      BaseElement(:name="item.element")
    span {{ item.title }}
  .ItemDetails__sidebar
    img.ItemDetails__icon(
      :src="`/images/${item.id}/2x.png`"
    )
    .ItemDetails__level(data-label="LVL") {{ item.level }}
  .ItemDetails__content
    .ItemDetails__block.ItemDetails__block_spaced
      .ItemDetails__armorDamage(
        v-if="damage"
      ) {{ damage.min }} - {{ damage.max }}
        label Урон
      .ItemDetails__armorDamage(
        v-if="armor"
      ) {{ armor.min }} - {{ armor.max }}
        label Защита
      .ItemDetails__price
        BaseCurrency(
          v-if="!isOwned"
          :amount="item.price"
        )
    .ItemDetails__block(v-if="Object.keys(filterAttributesPrimary()).length")
      .ItemDetails__blockTitle Характеристики
      .ItemDetails__blockContent
        ul.ItemDetails__list
          li.ItemDetails__listItem(v-for="(value, key) in filterAttributesPrimary()")
            | {{ translate(key) }}
            .ItemDetails__listItemValue +{{ value }}
    .ItemDetails__block(v-if="Object.keys(filterAttributesAdditional()).length")
      .ItemDetails__blockTitle Модификаторы
      .ItemDetails__blockContent
        ul.ItemDetails__list
          li.ItemDetails__listItem(v-for="(value, key) in filterAttributesAdditional()")
            | {{ translate(key) }}
            .ItemDetails__listItemValue +{{ value }}
  .ItemDetails__description(v-if="item.description") {{ item.description }}
  .ItemDetails__buttons
    .ItemDetails__buttonContainer
      button.ItemDetails__button.ItemDetails__button_scrap(
        v-if="isOwned && !isEquipped"
        @click="$emit('scrap', item)"
      ) Выбросить
    .ItemDetails__buttonContainer
      BaseButton.ItemDetails__button(
        v-if="!isOwned"
        text="Купить"
        @click="$emit('buy', item)"
      )
      BaseButton.ItemDetails__button(
        v-if="isOwned && !isEquipped"
        text="Надеть"
        @click="$emit('equip', item)"
      )
      BaseButton.ItemDetails__button(
        v-if="isOwned && isEquipped"
        text="Снять"
        @click="$emit('unequip', item)"
      )
</template>

<script>
import _ from 'lodash';
import Attributes from '/imports/content/Attribute';
import AttributesPrimary from '/imports/content/Attribute/Primary';
import AttributesArmorPassive from '/imports/content/Attribute/ArmorPassive';
import helpers from '/imports/client/ui/helpers/common';
import BaseButton from '/imports/client/ui/components/BaseButton.vue';
import BaseCurrency from '/imports/client/ui/components/BaseCurrency';
import BaseElement from '/imports/client/ui/components/BaseElement';

export default {
  components: {
    BaseElement,
    BaseButton,
    BaseCurrency,
  },
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
    isOwned: Boolean,
    isEquipped: Boolean,
    character: {
      type: Object,
      required: true,
      validator(value) {
        return helpers.hasProperties(value, [
          'name',
          'gender',
          'calculated',
          'experience',
          'money',
        ]);
      },
    },
  },
  computed: {
    requiredLevelError() {
      return this.character.calculated['Attribute/Level'] < this.item.level;
    },
    buttonText() {
      if (!this.isOwned) {
        return 'Купить';
      }
      return this.isEquipped ? 'Снять' : 'Надеть';
    },
    armor() {
      return Object.values(
        _.pick(this.item.attributeMods, Object.keys(AttributesArmorPassive)),
      )[0];
    },
    damage() {
      return this.item.attributeMods?.['Attribute/Damage'];
    },
  },
  created() {
    this.translate = attributeId => (Attributes[attributeId]
      ? Attributes[attributeId].title : attributeId);
  },
  methods: {
    buttonClick() {
      let event = 'buy';
      if (this.isOwned) {
        event = this.isEquipped ? 'unequip' : 'equip';
      }
      this.$emit(event, this.item);
    },
    filterAttributesPrimary() {
      return _.pick(this.item.attributeMods, Object.keys(AttributesPrimary));
    },
    filterAttributesAdditional() {
      const attributesOmit = [
        'Attribute/Damage',
        ...Object.keys(AttributesPrimary),
        ...Object.keys(AttributesArmorPassive),
      ];
      return _.omit(this.item.attributeMods, attributesOmit);
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'

.ItemDetails
  display flex
  flex-wrap wrap
  padding 15px

  &__title
    display flex
    margin 0 0 15px
    width 100%
    font-size 15px
    line-height 20px
    color $color_black

  &__sidebar
    flex-basis 30%

  &__icon
    margin-bottom 15px
    width 100%

  &__content
    margin-left 15px
    flex-grow 1

  &__block
    margin-bottom 15px

    &_spaced
      display flex
      justify-content space-between
      align-items center

  &__armorDamage
    font-weight bold
    font-size 14px
    line-height 20px
    color $color_black

    label
      margin-left 5px
      font-weight normal

  &__blockTitle
    margin-bottom 5px
    font-weight bold
    font-size 13px
    line-height 14px
    color $color_black

  &__blockContent
    display flex

  &__level
    position relative
    margin 0 auto 30px
    display flex
    justify-content center
    align-items center
    width 30px
    height 30px
    background url(/images/ui/levelBg.png) 50% no-repeat
    font-weight 500
    font-size 13px
    line-height 14px
    color $color_black

    &:after
      position absolute
      top 100%
      content attr(data-label)
      font-size 10px
      line-height 14px
      color $color_gray

  &__element
    margin-right 5px

  &__list
    list-style-image url(/images/ui/point.png)
    margin 0
    padding 0 15px

  &__listItemValue
    display inline
    margin-left 3px
    font-weight bold

  &__price
    margin-left auto

  &__description
    font-size 12px
    line-height 14px
    color $color_gray

  &__buttons
    display flex
    margin-top 15px
    width 100%
    justify-content space-between

  &__buttonContainer
    flex-basis 50%

  &__button
    width 100%

    &_scrap
      width auto
      padding 6px 6px 6px 20px
      background #F7EBEB
      border 1px solid #810000
      box-sizing border-box
      box-shadow 0px 1px 3px rgba(129, 0, 0, 0.25)
      border-radius 3px
      background url(/images/ui/scrap.svg) 6px 50% no-repeat

      font-size 11px
      line-height 14px
      text-align center
      color #810000
</style>

<docs>
# Карточка предмета

```js
import ItemDetails from '/imports/client/ui/inventory/ItemDetails.vue';
```

## Использование

```pug
  ItemDetails(
    :character="character"
    :item="item"
    isEquipped
    @equip="doEquip"
    @unequip="doUnEquip"
    @buy="doBuy"
    @scrap="doScrap"
  )
```

## Параметры
```ts
<Object> item // Объект предмета
<Object> character // Объект персонажа
<Boolean> isOwned // Принадлежит ли предмет текущему персонажу
<Boolean> isEquipped // Надет ли предмет на текущего персонажа
```

## События
`@equip` — срабатывает по нажатию кнопки «Надеть»
`@unequip` — срабатывает по нажатию кнопки «Снять»
`@buy` — срабатывает по нажатию кнопки «Купить»
`@scrap` — срабатывает по нажатию кнопки «Выбросить»
</docs>
