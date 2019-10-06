<template lang="pug">
.UserRemind
  form.UserRemind__form(
    novalidate
    @submit.prevent="submitForm"
  )
    h2.UserRemind__head Восстановление пароля
    .UserRemind__description
      | Введите e-mail, на которой Вы зарегистрировали аккаунт.
      | Мы отправим на почту письмо с инструкцией по восстановлению пароля.

    BaseInput(
      type="email"
      v-model="form.email"
      placeholder="email@adress.com"
      label="Ваш e-mail"
      :error="errors.email"
      class="UserRemind__input"
    )

    .UserRemind__actions
      BaseButton(
        text="Отправить"
        :disabled="hasErrors"
        class="UserRemind__submit"
      )

    .UserRemind__subActions
      a(
        href="#login"
        @click.prevent="$emit('switchForm', 'login')"
        class="UserRemind__subAction"
      ) Вернуться к авторизации

</template>

<script>
import FormValidator from '/imports/client/ui/mixins/FormValidator';
import BaseInput from '/imports/client/ui/components/BaseInput';
import BaseButton from '/imports/client/ui/components/BaseButton';

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
    email: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    form: {
      email: '',
    },
    errors: {
      email: '',
    },
  }),
  computed: {
    hasErrors() {
      return !!this.errors.email;
    },
  },
  created() {
    this.validator = this.validators.login;
  },
  mounted() {
    if (this.email) {
      this.form.email = this.email;
    }
  },
  methods: {
    submitForm() {
      const { email } = this.form;
      if (email && !this.errors.email) {
        this.$emit('restorePassword', email);
      }
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'

.UserRemind
  display block
  width 280px
  height 400px

  &__form
    display flex
    flex-direction column
    height 100%

  &__head
    margin-top 25px
    text-align center
    font-weight 500

  &__description
    text-align center

  &__input
    width 190px
    margin 30px auto 15px
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

  &__subAction
    padding 10px 0

    text-decoration none
    color $color_textGray

    &:active
      color $color_black

</style>


<docs>
## Напоминание пароля
```js
import UserRemind from '/imports/client/ui/user/UserRemind';
```

### Использование
```pug
UserRemind(
  email="email@address.ru"
  @switchForm="switchForm"
  @restorePassword="restorePassword"
  :validators="validators"
)
```

#### Параметры
`email: String` - адрес почты, передается текущее значение поля email

`validators: Object` - объект валидатора, с обязательным ключем `login`

#### События
`@switchForm`(*formName*: String) - переключение между формами
авторизации/регистрации (доступны значения `login`, `register`, `forget`)

`@restorePassword` (*email*: String) - Запрос восстанления пароля

</docs>
