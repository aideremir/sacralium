<template lang="pug">
LayoutWrapper
  .PageShop
    ItemContainer(mode="shop")
</template>

<script>
import ItemContainer from '/imports/client/ui/layouts/ItemContainer';
import LayoutWrapper from '/imports/client/ui/layouts/LayoutWrapper';

export default {
  name: 'PageShop',
  components: {
    ItemContainer,
    LayoutWrapper,
  },
};
</script>

<style lang="stylus">
.PageShop
  height 100%
  padding-top 25px
  box-sizing border-box
</style>
