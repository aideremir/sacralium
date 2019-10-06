<template lang="pug">
.BaseTab(
  ref="tab"
  :class="{ BaseTab_active: active }"
  v-touch:moving="moveTab"
  v-touch:start="startTouch"
  v-touch-class="'BaseTab_moved'"
)
  slot
</template>

<script>
let uuid = 0;

export default {
  name: 'BaseTab',
  props: {
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
    },
  },

  data: () => ({
    active: false,
    uid: '',
    touchX: '',
  }),

  created () {
    this.uid = uuid;
    uuid += 1;
  },
  methods: {
    moveTab(event) {
      if (event.path.some(el => el.classList?.contains('no-swipe'))) {
        return;
      }
      const [touch] = event.changedTouches;
      const tabElement = document.querySelector('.BaseTab_moved');

      const moveTo = touch.pageX - this.touchX;
      if (Math.abs(moveTo) > 50) {
        tabElement.style.setProperty('--moveto', `${moveTo}px`);
      }
    },
    startTouch(event) {
      const [touch] = event.changedTouches;
      this.touchX = touch.pageX;
      const tabElement = document.querySelector('.BaseTab_moved');
      tabElement.style.setProperty('--moveto', '0px');
    },
  },
};
</script>

<style lang="stylus">
@keyframes BaseTabs_showing
  from
    opacity 0
  to
    opacity 1

.BaseTab
  display block
  will-change transform, opacity
  height 100%
  max-height 100%
  transition transform 500ms cubic-bezier(1.000, -0.800, 0, 1.5)
  transform translateX(0)

  @media screen and (max-width 1000px)
    display none

    &_moved
      transition transform 100ms ease-out
      transform translateX(var(--moveto))

    &_active
      display block
      animation BaseTabs_showing 500ms ease-in-out
</style>
