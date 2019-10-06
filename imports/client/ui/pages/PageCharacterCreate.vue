<template lang="pug">
.PageCharacterCreate
  CharacterCreate(
    :validators="validators"
    @createCharacter="createCharacter"
  )
</template>

<script>
import helpers from '/imports/client/ui/helpers/meteor';

import UserValidation from '/imports/modules/User/client/validation';
import CharacterCreate from '/imports/client/ui/character/CharacterCreate';

export default {
  components: {
    CharacterCreate,
  },
  created() {
    this.validators = UserValidation;
  },
  methods: {
    async createCharacter(name, gender) {
      try {
        await helpers.meteorCallPromise('User.createCharacter', name, gender);
        this.$router.push({ name: 'CharacterProfile' });
      } catch (error) {
        this.$root.$emit(
          'showModal',
          {
            head: 'Не удалось создать персонажа',
            text: error.error,
          },
        );
      }
    },
  },
};
</script>

<style lang="stylus">
.PageCharacterCreate
  display flex
  height 100%
  padding 0 20px 20px
  justify-content center
  align-items center
  box-sizing border-box

</style>


<docs>
## Страница создания персонажа

```js
import PageCharacterCreate from '/imports/client/ui/pages/PageCharacterCreate';
```

</docs>
