<template lang="pug">
.BaseTabs(
  v-touch:swipe.left.right.stop.prevent="swipeTab"
  :class="{ BaseTabs_mobile: mobile }"
  v-touch-class="'BaseTabs_touch'"
)
  slot
  .BaseTabs__buttonsContainer
    .BaseTabs__button(
      v-for="tab in tabs"
      :key="tab.uid"
      :disabled="tab.disabled"
      :class="{ BaseTabs__button_active: selectedUid === tab.uid }"
      @click="setActiveTab(tab.uid)"
    )
</template>

<script>
import BaseButton from '/imports/client/ui/components/BaseButton';

export default {
  name: 'BaseTabs',
  components: { BaseButton },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    mobile: {
      type: Boolean,
    },
  },
  data: () => ({
    tabs: null,
  }),
  computed: {
    selectedUid: {
      get () {
        return this.tabUidByIdx(this.value);
      },
      set (value) {
        this.$emit('input', this.tabIdxByUid(value));
      },
    },
    selectableTabs () {
      return this.tabs.filter(tab => !tab.disabled);
    },
  },
  watch: {
    value () {
      this.setActiveTab(this.selectedUid);
    },
  },
  mounted() {
    this.tabs = this.$slots.default
      .filter(vnode => Boolean(vnode.tag))
      .map(vnode => vnode.componentInstance);
    this.setActiveTab(this.selectedUid);
  },
  methods: {
    setActiveTab(uid) {
      this.selectableTabs.forEach((el) => {
        const tab = el;
        tab.active = (el.uid === uid);
        return tab;
      });

      this.selectedUid = uid;
    },
    tabIdxByUid(uid) {
      return this.selectableTabs.findIndex(tab => tab.uid === uid);
    },
    tabUidByIdx(idx) {
      const { length } = this.selectableTabs;
      if (idx < 0) {
        return this.selectableTabs[0].uid;
      }
      if (idx > length - 1) {
        return this.selectableTabs[length - 1].uid;
      }
      return this.selectableTabs[idx].uid;
    },
    swipeTab (swipeTo, event) {
      if (event.path.some(el => el.classList?.contains('no-swipe'))) return;
      const directions = {
        left: 1,
        right: -1,
      };
      this.setActiveTab(this.tabUidByIdx(this.value + directions[swipeTo]));
    },
  },
};
</script>

<style lang="stylus">
// TODO: реализовать коректный способ изменения способа отображения компонента вкладок
@require '~imports/client/ui/styles/variables/colors'

.BaseTabs
  ~/_mobile
    @media screen and (min-width: 1000px)
      display flex

  &__buttonsContainer
    position absolute
    bottom 0
    left 50%

    display flex
    justify-content space-evenly
    align-items center
    width 50%
    height 50px

    opacity 1
    will-change opacity
    transition opacity 200ms ease-out
    transform translateX(-50%)

    ~/_touch &
      opacity 1

    ~/_mobile &
      @media screen and (min-width: 1000px)
        display none

  &__button
    position: relative
    width 10px
    height @width
    margin 2px
    padding 2px

    border-radius @width
    border-color $color_white
    border-style solid
    border-width 1px
    box-shadow 0 0 10px 1px rgba(0,0,0, 0.5)
    background-clip content-box
    background-color rgba(0,0,0, 0.1)
    transition transform 200ms ease-out
    will-change scale

    &_active
      transform scale(1.5)
      background-color $color_black
      box-shadow 0 0 10px 1px rgba(0,0,0, 0.7)

</style>

<docs>
# Вкладки (BaseTabs)

```js
import BaseTabs from '/imports/client/ui/components/BaseTabs';
import BaseTab from '/imports/client/ui/components/BaseTab';
```

### Использование
```pug
BaseTabs(v-model="selectedTab")
  BaseTab(
    :disabled="true"
    name="Название"
  )
    .tabContent
```

### Параметры

#### BaseTabs

`v-model:Number` - индекс выбранной вкладки

`mobile:Boolean` - мобильный режим работы,
при котором кнопки переключения вкладок отображаются только на мобильных устройствах

#### BaseTab

`name:String` - Название вкладки

`disabled:Boolean` - Деактивация вкладки
</docs>
