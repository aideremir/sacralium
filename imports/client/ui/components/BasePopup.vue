<template lang="pug">
.BasePopup
  .BasePopup__closeButton.buttonClose(@click="$emit('close')")
  .BasePopup__body
    FrameComponent
      slot
</template>

<script>
import FrameComponent from '/imports/client/ui/layouts/LayoutFrame.vue';

export default {
  components: {
    FrameComponent,
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'

.BasePopup
  position fixed
  top 50%
  left 12px
  right 12px
  transform translateY(-50%)
  background $color_white
  z-index $zindex_local
  @media screen and (min-width: 800px)
    left 50%
    transform translate(-50%, -50%)
    max-width 355px // TODO: откорректировать, когда прояснится по desktop версии
  &__closeButton
    top 18px
    right @top
    z-index 100
</style>

<docs>
  # Попап (BasePopup)

  ```js
  import BasePopup from '/imports/client/ui/components/BasePopup';
  ```

  ### Использование
  ```pug
  BasePopup(@close="closePopupHandler")
    .someContent
  ```

  ### События
  `@close` - событие, срабатывающее при закрытии попапа
</docs>
