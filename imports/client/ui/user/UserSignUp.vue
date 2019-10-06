<template lang="pug">
.UserSignUp
  form.UserSignUp__form(
    novalidate
    @submit.prevent="checkForm"
  )
    LayoutFrame.UserSignUp__box
      h2.UserSignUp__head Создать аккаунт
      BaseInput(
        type="email"
        placeholder="text@sacralium.ru"
        v-model="form.email"
        label="Ваш e-mail"
        :error="errors.email"
      ).UserSignUp__input

      BaseInput(
        type="password"
        placeholder="*****"
        v-model="form.password"
        label="Пароль"
        :error="errors.password"
      ).UserSignUp__input

      BaseInput(
        type="password"
        placeholder="*****"
        v-model="form.passwordRepeat"
        label="Повторите пароль"
        :error="errors.passwordRepeat"
      ).UserSignUp__input

      .UserSignUp__formSection
        BaseCheckbox(
          class="UserSignUp__checkbox"
          v-model="form.acceptLicense"
          :error="errors.acceptLicense"
        ) Я принимаю условия пользовательского соглашения

      .UserSignUp__formActions
        BaseButton(
          text="Регистрация"
          :disabled="hasError"
        ).UserSignUp__submit

  .UserSignUp__subActions
    a.UserSignUp__subAction(
      href="#login"
      @click.prevent="$emit('switchForm', 'login')"
    ) У меня есть аккаунт
</template>

<script>
import validatejs from 'validate.js';
import _ from 'lodash';
import to from 'await-to-js';

import LayoutFrame from '/imports/client/ui/layouts/LayoutFrame';
import BaseInput from '/imports/client/ui/components/BaseInput';
import BaseButton from '/imports/client/ui/components/BaseButton';
import FormValidator from '/imports/client/ui/mixins/FormValidator';
import BaseCheckbox from '/imports/client/ui/components/BaseCheckbox';

export default {
  components: {
    LayoutFrame,
    BaseInput,
    BaseButton,
    BaseCheckbox,
  },
  mixins: [FormValidator],
  props: {
    validators: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        email: null,
        phone: null,
        password: null,
        passwordRepeat: null,
        acceptLicense: null,
      },
      errors: {
        email: '',
        emailAsync: false,
        phone: '',
        password: '',
        passwordRepeat: '',
        acceptLicense: '',
      },
    };
  },
  watch: {
    'form.email'(value) {
      if (this.errors.emailAsync) {
        this.errors.emailAsync = false;
        this.errors.email = '';
      }
      if (!this.errors.email) {
        this.debounceEmailValidation(value);
      }
    },
  },
  created() {
    this.debounceEmailValidation = _.debounce(this.validateEmailAsync, 500);
    this.validator = this.validators.registration;
  },
  methods: {
    async validateEmailAsync(value) {
      const validatorAsync = this.validators.registrationAsync;
      if (validatorAsync) {
        const [errorsAsync] = await to(validatejs.async(
          this.form,
          validatorAsync,
        ));
        if (value === this.form.email) {
          this.errors.emailAsync = true;
          this.errors.email = _.get(errorsAsync, ['email', 0], '');
        }
      }
    },
    submitForm () {
      const registerObject = _.omit(this.form, [
        'passwordRepeat',
        'acceptLicense',
      ]);
      this.$emit('signUp', registerObject);
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'

.UserSignUp
  display block
  width 280px
  height 400px

  &__box
    padding 15px 25px 25px
    box-shadow 0 4px 50px rgba(0, 0, 0, 0.4);

  &__head
    margin 0 0 15px

    text-align center
    font-size 20px
    color rgba(0,0,0,.8)

  &__input
    text-align center

  &__checkbox
    font-size 11px

  &__formActions
    display flex
    justify-content center
    margin 20px 0 0

  &__submit
    width 150px

  &__subActions
    margin-top 25px
    text-align center

  &__subAction
    padding 10px 0

    text-decoration none
    color $color_textGray

    &:active
      color $color_black

</style>

<docs>
## Создание аккаунта

```js
import UserSignUp from '/imports/client/ui/user/UserSignUp'
```

### Использование
```pug
UserSignUp(
  :validators="validators"
  @switchForm="switchForm"
  @signUp="signUp"
)
```

#### Параметры
`validators: Object` - объект валидатора, с обязательным ключем `registration`

#### События
`@switchForm`(*formName*: String) - переключение между формами
авторизации/регистрации (доступны значения `login`, `register`, `forget`)

`@signUp`(*object*) - Регистрация

</docs>
