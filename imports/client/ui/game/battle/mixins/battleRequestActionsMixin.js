import { Meteor } from 'meteor/meteor';
import meteorHelpers from '/imports/client/ui/helpers/meteor';
import commonHelpers from '/imports/client/ui/helpers/common';

const { displayError } = commonHelpers;

export default {
  computed: {
    $_battleRequestActions_requestTimeout() {
      return this.battleRequestActions_character?.combatRequest?.timeout;
    },
    $_battleRequestActions_wasCalledToBattle() {
      return !!this.battleRequestActions_character?.combatRequest?.sender;
    },
    $_battleRequestActions_requestIsRejected() {
      return this.battleRequestActions_character?.combatRequest?.rejected;
    },
  },
  meteor: {
    battleRequestActions_character() {
      return Meteor.user()?.character;
    },
  },
  watch: {
    $_battleRequestActions_requestTimeout(val) {
      if (!val) {
        return;
      }

      if (Date.parse(val) > Date.now() && this.$_battleRequestActions_wasCalledToBattle) {
        this.$_battleRequestActions_displayRequest();
      }
    },
    $_battleRequestActions_requestIsRejected(val) {
      // TODO: избавиться от появления уведомления при каждой перезагрузки страницы
      const requestIsActual = Date.parse(this.$_battleRequestActions_requestTimeout) > Date.now();
      if (val && requestIsActual) {
        this.displayError('', 'Ваш вызов был отклонен.');
      }
    },
  },
  methods: {
    displayError,
    $_battleRequestActions_displayRequest() {
      const id = `battle-request-${Date.now()}`;
      this.$root.$emit(
        'createModalExtended',
        {
          id,
          head: 'Вас вызвали на поединок',
          text: 'Принять Вызов?',
          onAccept: this.$_battleRequestActions_acceptRequest,
          onReject: this.$_battleRequestActions_rejectRequest,
          preventClose: true,
        },
      );
      const interval = setInterval(() => {
        let remaining = Math.round(
          (Date.parse(this.$_battleRequestActions_requestTimeout) - Date.now()) / 1000,
        );
        if (remaining < 0) {
          remaining = 0;
        }
        this.$root.$emit('updateModalExtended',
          {
            id,
            modal: {
              text: `Принять вызов? (Осталось ${remaining} секунд)`,
            },
          });
      }, 200);
      setTimeout(
        () => {
          clearInterval(interval);
          this.$root.$emit('deleteModalExtended', { id });
        },
        Date.parse(this.$_battleRequestActions_requestTimeout) - Date.now(),
      );
    },
    async $_battleRequestActions_acceptRequest() {
      try {
        await meteorHelpers.meteorCallPromise('CombatRequest.accept');
      } catch (e) {
        this.displayError('Ошибка при попытке вступить в поединок', e.error);
      }
    },
    async $_battleRequestActions_rejectRequest() {
      try {
        await meteorHelpers.meteorCallPromise('CombatRequest.reject');
      } catch (e) {
        this.displayError('Ошибка при попытке отказаться от поединка', e.error);
      }
    },
  },
};
