<template lang="pug">
.UserSignIn
  form.UserSignIn__form(
    novalidate
    @submit.prevent="checkForm"
  )
    LayoutFrame.UserSignIn__box
      h2.UserSignIn__head Войти в игру

      BaseInput(
        type="email"
        v-model="form.email"
        placeholder="text@sacralium.ru"
        label="Ваш логин (mail)"
        :error="errors.email"
        class="UserSignIn__input"
      )

      BaseInput(
        type="password"
        v-model="form.password"
        placeholder="*******"
        label="Пароль"
        :error="errors.password"
        class="UserSignIn__input"
      )

      .UserSignIn__actions
        BaseButton(
          text="Войти"
          :disabled="hasError"
          class="UserSignIn__submit"
        )

      .UserSignIn__subActions
        a(
          class=`
            UserSignIn__subAction
            UserSignIn__subAction_register
          `
          href="#register"
          @click.prevent="$emit('switchForm', 'register')"
        ) Регистрация

        a(
          class=`
            UserSignIn__subAction
            UserSignIn__subAction_forget
          `
          href="#forget"
          @click.prevent="$emit('switchForm', 'forget')"
        ) Забыли пароль

  .UserSignIn__socials
    .UserSignIn__socialsHead Войти через

    .UserSignIn__socialsList
      button(
        class=`
          UserSignIn__socialsItem
          UserSignIn__socialsItem_vk
        `
        @click="signInWith('vk')"
      )

      button(
        class=`
          UserSignIn__socialsItem
          UserSignIn__socialsItem_fb
        `
        @click="signInWith('facebook')"
      )

      button(
        class=`
          UserSignIn__socialsItem
          UserSignIn__socialsItem_goo
        `
        @click="signInWith('google')"
      )

</template>

<script>
import FormValidator from '/imports/client/ui/mixins/FormValidator';

import LayoutFrame from '/imports/client/ui/layouts/LayoutFrame';
import BaseInput from '/imports/client/ui/components/BaseInput';
import BaseButton from '/imports/client/ui/components/BaseButton';

export default {
  components: {
    LayoutFrame,
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
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      errors: {
        email: '',
      },
    };
  },
  created() {
    this.validator = this.validators.login;
  },
  methods: {
    submitForm() {
      this.$emit('signIn', this.form.email, this.form.password);
    },
    signInWith(networkName) {
      this.$emit('signInWith', networkName);
    },
  },
};
</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/colors'

$UserSignIn__color_text = rgba(0,0,0,.8)

.UserSignIn
  display block
  width 280px
  height 400px

  &__box
    padding 15px 25px 5px
    box-shadow 0 4px 50px rgba(0, 0, 0, 0.4);

  &__head
    margin 0 0 15px

    text-align center
    text-transform uppercase
    font-size 20px
    color $UserSignIn__color_text

  &__input
    text-align center

  &__actions
    display flex
    margin 25px 0 10px
    justify-content center

  &__submit
    width 150px

  &__subActions
    display flex
    margin 10px 0 0
    justify-content space-between

  &__subAction
    padding 10px 0
    text-decoration none
    font-weight 500
    color $color_textGray

    &_register
      color $UserSignIn__color_text

    &:active
      color $color_black

  &__socialsHead
    margin 48px 0 5px 0
    text-align center
    font-size 13px

  &__socialsList
    display flex
    justify-content center

  &__socialsItem
    display flex
    justify-content center
    align-items center
    width 30px
    height 30px
    margin 5px 7px

    border-radius 5px
    border none
    background-repeat no-repeat
    background-size cover
    background-color transparent
    cursor pointer

    &:focus
      outline none
      box-shadow 0px 2px 10px rgba(0,0,0,0.3);

    &_vk
      background-image url(/images/UserSignIn/UserSignIn__social_vk.svg)

    &_fb
      background-image url(/images/UserSignIn/UserSignIn__social_fb.svg)

    &_goo
      background-image url(/images/UserSignIn/UserSignIn__social_gp.svg)

</style>

<docs>
## Авторизация пользователя

```js
import UserSignIn from '/imports/client/ui/user/UserSignIn'
```

### Использование
```pug
UserSignIn(
  @switchForm="switchForm"
  :validators="validators"
  @restorePassword="restorePassword"
  @signIn="signIn"
  @signInWith="signInWith"
)
```
#### Параметры
`validators: Object` - объект валидатора, с обязательным ключем `login`

#### События
`@switchForm`(*formName*: String) - переключение между формами
авторизации/регистрации (доступны значения `login`, `register`, `forget`)

`@signIn`(*email*: String, *password*: String) - авторизация

`@signInWith`(*network*: String) - Вход через соц.сети. Возвращает название социальной сети

`@restorePassword`(*email*: String) - Запрос восстановления пароля

</docs>
