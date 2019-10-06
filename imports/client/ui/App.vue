<template lang="pug">
.MainApp
  router-view
  ModalAlert
  ModalExtended
</template>

<script>
import ModalAlert from '/imports/client/ui/modals/ModalAlert';
import ModalExtended from '/imports/client/ui/modals/ModalExtended.vue';

export default {
  components: {
    ModalAlert,
    ModalExtended,
  },
  created () {
    this.$router.push(window.location.pathname);
  },
};
</script>

<style lang="stylus">
@import '~imports/client/ui/styles/index.styl'

.MainApp
  display block
  height 320px
  min-height 100vh
  box-sizing border-box
  color $color_text

</style>
