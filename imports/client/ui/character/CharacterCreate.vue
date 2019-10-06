<template lang="pug">
.CharacterCreate
  h2.CharacterCreate__head Создай своего персонажа
  form.CharacterCreate__form(
    @submit.prevent="checkForm"
  )
    CharacterAvatar(
      class="CharacterCreate__avatar"
      :gender="form.gender"
    )
    .CharacterCreate__settings
      BaseInput(
        class="CharacterCreate__input"
        placeholder="Введите имя"
        v-model="form.name"
        :error="errors.name"
        label="Ваше имя в игре"
      )
      .CharacterCreate__genderSelect
        BaseRadio(
          value="male"
          v-model="form.gender"
          checked
        ) Мужчина
        BaseRadio(
          value="female"
          v-model="form.gender"
        ) Женщина

    .CharacterCreate__actions
      BaseButton(
        text="Создать персонажа"
        :disabled="hasErrors"
      )

</template>

<script>
import validatejs from 'validate.js';
import _ from 'lodash';
import to from 'await-to-js';

import FormValidator from '/imports/client/ui/mixins/FormValidator';

import CharacterAvatar from '/imports/client/ui/character/CharacterAvatar';
import BaseRadio from '/imports/client/ui/components/BaseRadio';
import BaseButton from '/imports/client/ui/components/BaseButton';
import BaseInput from '/imports/client/ui/components/BaseInput';

export default {
  components: {
    CharacterAvatar,
    BaseRadio,
    BaseButton,
    BaseInput,
  },
  mixins: [FormValidator],
  props: {
    validators: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    hasError: false,
    form: {
      name: null,
      gender: null,
    },
    errors: {
      name: '',
      nameAsync: false,
    },
  }),
  computed: {
    hasErrors() {
      // TODO: Переделать, чтобы асинхронные валидаторы фиксировались в hasError
      return this.hasError || !!this.errors.name;
    },
  },
  watch: {
    'form.name'(value) {
      if (this.errors.nameAsync) {
        this.errors.nameAsync = false;
        this.errors.name = '';
      }
      if (!this.errors.name) {
        this.debounceNameValidation(value);
      }
    },
  },
  created() {
    this.debounceNameValidation = _.debounce(this.validateCharacterName, 500);
    this.validator = this.validators.characterCreation;
  },
  methods: {
    async validateCharacterName(value) {
      const validatorAsync = this.validators.characterCreationAsync;
      if (validatorAsync) {
        const [errorsAsync] = await to(validatejs.async(
          this.form,
          validatorAsync,
        ));
        if (value === this.form.name) {
          this.errors.nameAsync = true;
          this.errors.name = _.get(errorsAsync, ['name', 0], '');
        }
      }
    },
    submitForm() {
      this.$emit('createCharacter', this.form.name, this.form.gender);
    },
  },
};
</script>

<style lang="stylus">
.CharacterCreate
  padding 20px
  max-width 300px

  &__head
    margin 0 0 15px
    font-size 20px
    text-align center

  &__form
  &__settings
    display flex
    flex-direction column
    align-items center

  &__avatar
    width 230px

  &__input
    width 190px
    text-align center

  &__genderSelect
    display flex
    flex-direction row

  &__actions
    padding-top 15px
    max-width 100%

</style>

<docs>
## Создание персонажа

```js
import CharacterCreate from '/imports/client/ui/character/CharacterCreate';
```

### Использование
```pug
CharacterCreate(
  :validators="validators"
  @createCharacter="createCharacter"
)
```

### Параметры

`validators: Object` - объект валидатора, с обязательным ключем `characterCreation`

### События

`@createCharacter`(`name: String`, `gender: String`) - создание персонажа


</docs>
