<template lang="pug">
.ResizeableLayout(
  :class="containerClassObj"
)
  .ResizeableLayout__container
    button.ResizeableLayout__resizeButton(
      @mousedown="startResizing($event)"
      @touchstart="startResizing($event)"
      @touchmove.prevent="updateCoordinates($event.changedTouches[0])"
      @touchend="stopResizing()"
      @touchcancel="stopResizing()"
    )
    .ResizeableLayout__substrate(
      v-if="resizeActive"
      @mousemove="updateCoordinates($event)"
      @mouseup="stopResizing()"
    )
    .ResizeableLayout__content(
      :id="contentContainerName"
      :style="contentStyleObj"
    )
      slot

</template>

<script>
let uuid = 0;

export default {
  name: 'ResizeableContainer',
  props: {
    containerName: {
      type: String,
      required: true,
    },
    minContainerHeight: {
      type: Number,
      default: 100,
    },
    maxContainerHeight: {
      type: Number,
      default: 300,
    },
    saveSettings: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      containerHeight: null,
      resizeActive: false,
      resizerInitialPosY: null,
    };
  },
  computed: {
    contentContainerName() {
      return `${this.uuid}_${this.containerName}_content`;
    },
    storageName() {
      return `${this.containerName}__height`;
    },
    contentElem() {
      return document.getElementById(this.contentContainerName);
    },
    containerClassObj() {
      return [this.containerName];
    },
    contentStyleObj() {
      return {
        minHeight: `${this.minContainerHeight}px`,
        maxHeight: `${this.maxContainerHeight}px`,
        height: `${this.containerHeight}px`,
      };
    },
  },
  beforeCreate() {
    this.uuid = uuid.toString();
    uuid += 1;
  },
  created() {
    if (this.hasLocalStorage() && this.saveSettings) {
      this.restoreHeightFromStorage();
    }
  },
  methods: {
    getContentCoordinates() {
      const elemRect = this.contentElem.getBoundingClientRect();
      return {
        bottomPos: elemRect.top + elemRect.height + window.pageYOffset,
      };
    },
    isMobile() {
      // TODO: поставить максимальную ширину экрана, для которой требуется менять размер окна лога
      // return window.outerWidth < 1024;
      return true;
    },
    hasLocalStorage() {
      return typeof localStorage !== 'undefined';
    },
    restoreHeightFromStorage() {
      if (!this.hasLocalStorage() || !this.isMobile() || !this.saveSettings) {
        return;
      }
      const storageHeight = localStorage.getItem(this.storageName);

      if (!!storageHeight && Number.isFinite(Number(storageHeight))) {
        this.containerHeight = Number(storageHeight);
      }
    },
    saveHeightToStorage(height) {
      if (!this.hasLocalStorage() || !this.saveSettings) {
        return;
      }
      localStorage.setItem(this.storageName, Math.round(height));
    },
    startResizing() {
      this.resizeActive = true;
    },
    stopResizing() {
      this.resizeActive = false;
      this.saveHeightToStorage(this.containerHeight);
    },
    updateCoordinates(e) {
      const containerCoords = this.getContentCoordinates();

      let newContentHeight = containerCoords.bottomPos - e.pageY;
      if (newContentHeight > this.maxContainerHeight) {
        newContentHeight = this.maxContainerHeight;
      }
      if (newContentHeight < this.minContainerHeight) {
        newContentHeight = this.minContainerHeight;
      }
      this.containerHeight = newContentHeight;
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'
@require '~imports/client/ui/styles/mixins/scrollbar'
@require '~imports/client/ui/styles/variables/layers'

$containerBackgroundColor = $color_background
$containerZindex = $zindex_resizeableBlock

.ResizeableLayout
  position relative
  z-index $containerZindex

  &__container
    position absolute
    bottom 0
    box-sizing border-box
    width 100%
    padding-top 10px

    background-color $containerBackgroundColor

  &__resizeButton
    position absolute
    z-index 1
    top -12px

    width 100%
    height 24px

    background transparent
    outline none
    border none
    cursor ns-resize

    &:before
      content ''
      position absolute
      top 0
      left 0
      height 24px
      width 100%
      background  url(/images/resizeable-container/half-corner_b_l.png) bottom left no-repeat,
                  url(/images/resizeable-container/half-corner_b_r.png) bottom right no-repeat,
                  url(/images/resizeable-container/top_shadow.png) bottom center repeat-x
    &:after
      content ''
      position absolute
      top 16px
      left 50%
      transform translateX(-50%)
      width 42px
      height 8px
      border none
      background url(/images/resizeable-container/icon_resize.png) center no-repeat

  &__substrate
    position fixed
    z-index 10
    top 0
    bottom 0
    left 0
    right 0

  &__content
    overflow-y auto
    scroll-bar()

    box-sizing border-box

    border solid 4px transparent
    border-image url(/images/frames/frame__border_gray.png)
    border-image-slice 30%

</style>

<docs>
# Контейнер с изменяемой высотой
```js
import ResizeableContainer from '/imports/client/ui/components/ResizeableContainer.vue';
```

# Использование
```pug
ResizeableContainer(
  :containerName: String, // уникальное имя
  :minContainerHeight: Number, // минимальная высота контейнера
  :maxContainerHeight: Number, // максимальная высота контейнера
  :saveSettings: Boolean, // Сохранять ли высоту в localStorage
)
```
</docs>
