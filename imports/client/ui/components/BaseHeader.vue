<template lang="pug">
.BaseHeader
  .BaseHeader__user
    CharacterInformer(
      :character="character"
    )

  template(v-if="isBattle")
    .BaseHeader__opponent
      CharacterInformer(
        :character="opponent"
        opponent
      )

  template(v-else)
    .BaseHeader__money
      BaseCurrency(
        isDark
        :amount="character.money"
      )

  .BaseHeader__settings
    HeaderSettings(
      @settingsMenuAction="settingsMenuAction"
    )

</template>

<script>
import CharacterInformer from '/imports/client/ui/character/CharacterInformer';
import BaseCurrency from '/imports/client/ui/components/BaseCurrency';
import HeaderSettings from '/imports/client/ui/components/HeaderSettings';

export default {
  components: {
    CharacterInformer,
    BaseCurrency,
    HeaderSettings,
  },
  props: {
    character: {
      type: Object,
      required: true,
    },
    opponent: {
      type: Object,
      default: () => ({}),
    },
    isBattle: Boolean,
  },
  methods: {
    settingsMenuAction(param) {
      this.$emit('settingsMenuAction', param);
    },
  },
};
</script>

<style lang="stylus">
.BaseHeader
  position relative
  display flex
  width 100%
  height 100%

  &__user
    margin-left -10px

  &__settings
    display flex
    align-items center
    margin-left auto
    margin-right 10px

  &__money
    display flex
    padding 10px
    margin-left auto
    justify-content center
    align-items center

  &__opponent
    margin-left auto

</style>

<docs>
## Шапка игры

```js
import BaseHeader from '/imports/client/ui/components/BaseHeader';
```

### Использование

```pug
BaseHeader(
  :character="user.character"
  :opponent="opponent.character"
  :isBattle="isBattle"
  @settingsMenuAction="settingsMenuAction"
)
```

### Параметры
`character: Object` - персонаж пользователя

`opponent: Object` - персонаж оппонента

`isBattle: Boolean` - включает режим показа здоровья оппонента, скрывает деньги

### События
`@settingsMenuAction`(*action: String*) - возвращает действие из меню "настроек"

</docs>
