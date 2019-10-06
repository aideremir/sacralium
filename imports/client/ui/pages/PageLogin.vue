<template lang="pug">
.PageLogin
  .PageLogin__content
    .PageLogin__logo
      img.PageLogin__logoImg(src="/images/logo.png")

    component(
      :is="currentView"
      @switchForm="switchForm"
      @signIn="signIn"
      :validators="validators"
      @signUp="signUp"
      @signInWith="signInWith"
      @restorePassword="restorePassword"
      @resetPassword="resetPassword"
    )

</template>

<script>
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import UserValidation from '/imports/modules/User/client/validation';

import UserSignIn from '/imports/client/ui/user/UserSignIn';
import UserSignUp from '/imports/client/ui/user/UserSignUp';
import UserRemind from '/imports/client/ui/user/UserRemind';
import UserRestorePassword from '/imports/client/ui/user/UserRestorePassword';

export default {
  components: {
    UserSignIn,
    UserSignUp,
    UserRemind,
    UserRestorePassword,
  },
  props: {
    restorePasswordToken: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentView: 'UserSignIn',
    };
  },
  created() {
    this.validators = UserValidation;
    if (this.restorePasswordToken) {
      this.currentView = 'UserRestorePassword';
    }
  },
  methods: {
    switchForm(formName) {
      switch (formName) {
        case 'register':
          this.currentView = 'UserSignUp';
          break;
        case 'forget':
          this.currentView = 'UserRemind';
          break;
        case 'login':
        default:
          this.currentView = 'UserSignIn';
      }
    },
    signUp(registerObject) {
      Accounts.createUser(registerObject, (error) => {
        if (!error) {
          this.$router.push({ name: 'Game' });
        } else {
          this.$root.$emit(
            'showModal',
            {
              head: 'Ошибка регистрации',
              text: error.reason,
            },
          );
        }
      });
    },
    signIn(email, password) {
      Meteor.loginWithPassword(email, password, (error) => {
        if (!error) {
          this.$router.push({ name: 'Game' });
        } else {
          this.$root.$emit(
            'showModal',
            {
              head: 'Ошибка авторизации',
              text: error.reason,
            },
          );
        }
      });
    },
    signInWith(socialNet) {
      const netPermissionsObj = {
        facebook: ['public_profile', 'email'],
        google: ['profile', 'email'],
        vk: ['profile', 'email'],
      };

      const permissions = {
        requestPermissions: netPermissionsObj[socialNet],
      };

      const handler = (error) => {
        if (error) {
          this.$root.$emit(
            'showModal',
            {
              head: 'Ошибка входа',
              text: error.message,
            },
          );
        } else {
          this.$router.push({ name: 'Game' });
        }
      };
      switch (socialNet) {
        case 'facebook':
          Meteor.loginWithFacebook(permissions, handler);
          break;
        case 'google':
          Meteor.loginWithGoogle(permissions, handler);
          break;
        case 'vk':
          Meteor.loginWithVk(permissions, handler);
          break;
        default:
          this.$root.$emit(
            'showModal',
            {
              head: 'Такой сети нет',
              text: 'Имя сети указано с ошибкой, или ее нет',
            },
          );
      }
    },
    restorePassword(email) {
      Accounts.forgotPassword({ email }, (error) => {
        if (error) {
          this.$root.$emit(
            'showModal',
            {
              head: 'Не удалось восстановить пароль',
              text: error.reason,
            },
          );
        } else {
          this.$root.$emit(
            'showModal',
            {
              head: 'Инструкция отправлена!',
              text: 'На указанный адрес почты отправлено письмо с инструкцией по восстановлению доступа',
            },
          );
        }
      });
    },
    resetPassword(newPassword) {
      Accounts.resetPassword(
        this.restorePasswordToken,
        newPassword,
        (error) => {
          if (error) {
            this.$root.$emit(
              'showModal',
              {
                head: 'Не удалось изменить пароль',
                text: error.reason,
              },
            );
          } else {
            this.$root.$emit(
              'showModal',
              {
                head: 'Пароль изменен!',
                text: 'Авторизуйтесь с новым паролем',
              },
            );
            this.switchForm('login');
          }
        },
      );
    },
  },
};
</script>

<style lang="stylus">
.PageLogin
  display flex
  height 100%
  padding 0 20px 20px
  justify-content center
  align-items center
  box-sizing border-box

  background:
    url(/images/layouts/layouts__contentBG_top.png) top,
    url(/images/layouts/layouts__contentBG_bottom.png) bottom
  background-repeat repeat-x

  &__content
    display flex
    flex-direction column
    max-width 400px

  &__logo
    margin-bottom 20px

  &__logoImg
    display block
    width 282px
    margin 0 auto

</style>
