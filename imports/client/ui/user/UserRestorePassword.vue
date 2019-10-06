<template lang="pug">
.UserRestorePassword
  form.UserRestorePassword__form(
    @submit.prevent="submitForm"
  )
    h2.UserRestorePassword__head Сброс пароля

    .UserRestorePassword__description
      | Введите новый, надежный пароль, который Вы не забудете

    BaseInput(
      type="password"
      placeholder="*****"
      v-model="form.password"
      label="Новый пароль"
      :error="errors.password"
      class="UserRestorePassword__input"
    )

    BaseInput(
      type="password"
      placeholder="*****"
      v-model="form.passwordRepeat"
      label="Повторите пароль"
      :error="errors.passwordRepeat"
      class="UserRestorePassword__input"
    )

    .UserRestorePassword__actions
      BaseButton(
        text="Сохранить"
        :disabled="hasError"
      ).UserRestorePassword__submit

</template>

<script>
import BaseInput from '/imports/client/ui/components/BaseInput';
import BaseButton from '/imports/client/ui/components/BaseButton';
import FormValidator from '/imports/client/ui/mixins/FormValidator';

export default {
  components: {
    BaseInput,
    BaseButton,
  },
  mixins: [FormValidator],
  props: {
    validators: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    form: {
      password: null,
      passwordRepeat: null,
    },
    errors: {
      password: '',
      passwordRepeat: '',
    },
  }),
  created() {
    this.validator = this.validators.registration;
  },
  methods: {
    submitForm () {
      this.$emit('resetPassword', this.form.password);
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'

.UserRestorePassword
  display block
  width 280px
  height 400px

  &__form
    height 100%

  &__head
    margin-top 25px
    text-align center
    font-weight 500

  &__description
    margin-bottom 20px
    text-align center

  &__input
    width 190px
    margin-left auto
    margin-right auto
    text-align center

  &__subActions
    display flex
    justify-content center
    font-weight 500

  &__actions
    display flex
    justify-content center
    margin 15px 0 20px

  &__submit
    width 150px

</style>

<docs>
## Сброс пароля пользователя

```js
import UserRestorePassword from '/imports/client/ui/user/UserRestorePassword';
```

### Использование
```pug
UserRestorePassword(
  :validators="validators"
  @resetPassword="resetPassword"
)
```

#### Параметры
`validators: Object` - объект валидатора, с обязательным ключем `registration`

#### События
`@resetPassword`(*newPassword*: String) - Новый пароль пользователя

</docs>
