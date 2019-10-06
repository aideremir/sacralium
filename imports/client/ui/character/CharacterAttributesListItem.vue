<template lang="pug">
.CharacterAttributeListItem
  .CharacterAttributeListItem__icon(
    v-if="iconStyle"
    :style="iconStyle"
  )
  .CharacterAttributeListItem__title {{ attributeType.title }}:
  button.CharacterAttributeListItem__button(
    v-if="changeable"
    :disabled="disabledDown"
    @click="$emit('decrease', attributeType.id)"
  ) -
  strong.CharacterAttributeListItem__value
    | {{ attributeType.isRange ? `${value.min} - ${value.max}` : value }}
  button.CharacterAttributeListItem__button(
    v-if="changeable"
    :disabled="disabledUp"
    @click="$emit('increase', attributeType.id)"
  ) +
</template>

<script>
export default {
  name: 'CharacterAttributesListItem',
  props: {
    attributeType: {
      type: Object,
      required: true,
    },
    value: {
      type: [Number, String, Object],
      required: true,
    },
    distributedValue: {
      type: Number,
      required: false,
      default: 0,
    },
    disabledUp: Boolean,
    changeable: Boolean,
  },
  computed: {
    disabledDown () {
      return this.distributedValue <= 0;
    },
    iconStyle () {
      return this.attributeType.icon ? { backgroundImage: `url(${this.attributeType.icon})` } : '';
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'

.CharacterAttributeListItem
  display flex
  height 32px
  flex-wrap wrap
  justify-items center
  align-items center
  padding 3px 0

  &__icon
    width 25px
    height 25px
    margin-right 4px
    background-position center
    background-repeat no-repeat

  &__title
    flex-grow 1
    flex-shrink 1

  &__value
    margin 0 10px

  &__button
    width 32px
    height 32px
    border solid 1px #dddedf
    border-radius 3px
    text-align center
    transition all 0.3s
    padding 0
    line-height 0

    &:not(:disabled)
      background-color $color_white
      box-shadow 0 2px 5px rgba(0, 0, 0, 0.1)
      cursor pointer

      &:focus,
      &:hover,
      &:active
        outline none
        border 1px solid #D0D0D0
        box-shadow 0 2px 10px rgba(0, 0, 0, 0.2)
</style>
