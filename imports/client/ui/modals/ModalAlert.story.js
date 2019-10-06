import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';

import ModalAlert from './ModalAlert.vue';

storiesOf('Модальные окна', module)
  .addDecorator(withReadme(ModalAlert.__docs))
  .add('Диалог (ModalAlert)', () => ({
    components: { ModalAlert },
    template: `
      <div class="sb-page sb-page_withPaddings">
        <h2 class="sb-head">
          Окно диалога
        </h2>
        <div class="sb-version">
          <h3 class="sb-version__head">Вызов окна "alert"</h3>
          <button
            @click.prevent="showAlert"
          >
            Вызвать ошибку
          </button>
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">Подтверждение действий</h3>
          <button
            @click.prevent="showConfirm"
          >
            Подтвердить действия
          </button>
        </div>
        <div class="sb-version">
          <h3 class="sb-version__head">Форма для ввода</h3>
          <button
            @click.prevent="showPrompt"
          >
            Окно для ввода
          </button>
        </div>
        <ModalAlert/>
      </div>
    `,
    data: () => (
      {
        head: 'Заголовок сообщения',
        text: 'Поясняющий текст/сообщение',
      }
    ),
    methods: {
      showAlert() {
        this.$root.$emit(
          'showModal',
          {
            head: this.head,
            text: this.text,
          },
        );
      },
      showConfirm() {
        this.$root.$emit(
          'showModal',
          {
            head: this.head,
            text: this.text,
            onAccept: () => alert('Вы согласились'), // eslint-disable-line no-alert
            onReject: () => alert('Отказано'), // eslint-disable-line no-alert
          },
        );
      },
      showPrompt() {
        this.$root.$emit(
          'showModal',
          {
            head: this.head,
            text: this.text,
            onAccept: mess => alert(`Что-то отправилось: ${mess}`), // eslint-disable-line no-alert
            onReject: () => alert('Вы отказались отправлять данные'), // eslint-disable-line no-alert
            promptValue: 'Текст по-умолчанию',
          },
        );
      },
    },
  }));
