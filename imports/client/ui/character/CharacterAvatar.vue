<template lang="pug">
.CharacterAvatar(
  :class=`[
    backgroundClass,
    mirroredClass,
  ]`
)
  img.CharacterAvatar__image(
    :src="avatarSrc"
  )
</template>

<script>
export default {
  props: {
    gender: {
      type: String,
      default: 'male',
    },
    background: {
      type: String,
      default: '',
    },
    isMirrored: Boolean,
  },
  computed: {
    avatarSrc() {
      return (
        `/images/character/CharacterAvatar/CharacterAvatar_${this.gender}.png`
      );
    },
    backgroundClass() {
      return this.background ? `CharacterAvatar_${this.background}` : '';
    },
    mirroredClass() {
      return this.isMirrored ? 'CharacterAvatar_mirrored' : '';
    },
  },
};

</script>

<style lang="stylus">
.CharacterAvatar
  position relative

  &:before
    content ''
    position absolute
    left 0
    top 0
    display block
    height 100%
    width 100%
    background-repeat no-repeat
    background-size cover

  &_neutral:before
    background-image url(/images/character/CharacterAvatar/CharacterAvatar__bg_neutral.png)

  &_dark:before
    background-image url(/images/character/CharacterAvatar/CharacterAvatar__bg_dark.png)

  &_light:before
    background-image url(/images/character/CharacterAvatar/CharacterAvatar__bg_light.png)

  &_mirrored
    &:before
      transform scaleX(-1)

  &__image
    position relative
    display block
    width 100%
    height auto

    ~/_mirrored &
      transform scaleX(-1)

</style>


<docs>
## Аватар персонажа

```js
import CharacterAvatar from '/imports/client/ui/character/CharacterAvatar';
```

### Ширина и высота аватара

Размер аватара зависит от ширины. Высота меняется пропорнционально,
в соответствии с пропорцией 1.67

Максимальный размер: 375x624px

### Параметры

`gender: [String] ('male')` - пол персонажа. Может иметь значения `male` или `female`

`background: [String] ('')` - фоновая картинка. По умолчанию отсутствует.
Может принимать значения `neutral`, `dark`, `light`, в соответствии с именами
изображений в `/images/character/CharacterAvatar/`

`isMirrored: [Boolean]` - отраженная версия аватарки (применяется в бою)

</docs>
