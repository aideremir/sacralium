<template lang="pug">
transition(name="fade")
  .ModalAlert(v-if="modals.length")
    //- Тень всегда приходит одна
    .ModalAlert__shadow(@click="removeModal()")
    //- А окон может быть много
    .ModalAlert__dialog(v-for="(modal, index) in modals")
      LayoutFrame.ModalAlert__box
        .ModalAlert__head {{ modal.head }}
        .ModalAlert__text {{ modal.text }}

        .ModalAlert__inputWrapper(
          v-if="modal.promptValue !== undefined && modal.onAccept !== undefined"
        )
          BaseInput.ModalAlert__input(v-model="modal.promptValue")

        .ModalAlert__actions
          template(
            v-if="modal.onAccept !== undefined || modal.onReject !== undefined"
          )
            BaseButton(
              @click="accept(index, modal.onAccept)"
              text="Принять"
              class=`
                ModalAlert__action
                ModalAlert__action_accept
              `
            )
            BaseButton(
              @click="reject(index, modal.onReject)"
              light
              text="Отменить"
              class=`
                ModalAlert__action
                ModalAlert__action_reject
              `
            )
          template(v-else)
            BaseButton(
              @click="removeModal(index)"
              text="OK"
            ).ModalAlert__action

      .buttonClose(@click="removeModal(index)")

</template>

<script>
import LayoutFrame from '/imports/client/ui/layouts/LayoutFrame';
import BaseButton from '/imports/client/ui/components/BaseButton';
import BaseInput from '/imports/client/ui/components/BaseInput';

export default {
  components: {
    LayoutFrame,
    BaseButton,
    BaseInput,
  },
  data() {
    return {
      modals: [],
    };
  },
  computed: {
    isTypeConfirm() {
      return this.type === 'confirm';
    },
    isTypePrompt() {
      return this.type === 'prompt';
    },
  },
  mounted() {
    this.$root.$on(
      'showModal',
      obj => this.addModal(obj),
    );
  },
  methods: {
    addModal(obj) {
      this.modals.push(obj);
    },
    removeModal(index) {
      this.modals.splice((index || -1), 1);
    },
    accept(index, acceptCallback) {
      const value = this.modals[index].promptValue;
      // По-умолчанию отправляем значение promptValue, даже когда undefined.
      if (acceptCallback && typeof acceptCallback === 'function') {
        acceptCallback(value);
      }
      this.removeModal(index);
    },
    reject(index, rejectCallback) {
      if (rejectCallback && typeof rejectCallback === 'function') {
        rejectCallback();
      }
      this.removeModal(index);
    },
  },
};

</script>

<style lang="stylus">
@require '~imports/client/ui/styles/variables/all'

.ModalAlert
  position fixed
  left 0
  top 0
  z-index $zindex_modal

  display block
  width 100%
  height 100%

  &__shadow
    position absolute
    left 0
    top 0

    display block
    width 100%
    height 100%
    background rgba(#000,.7)

  &__dialog
    position absolute
    left 50%
    top 50%

    width 400px
    min-width 280px
    max-height 90vh
    max-width 90vw

    background-color $color_background
    box-shadow 0 4px 50px rgba(#000,.4)
    transform translate(-50%,-50%)

  &__box
    padding 10px 30px 30px

  &__head
    margin 0 10px 20px

    text-align center
    font-size 20px
    line-height 110%

  &__text
    text-align center

  &__actions
    display flex
    margin-top 20px
    justify-content center

  &__action
    width 120px

    &_accept
    &_reject
      width 120px
      max-width 40%

    &_reject
      margin-left 20px

</style>

<docs>
## Окно диалога
```js
import ModalAlert from '/imports/client/ui/modals/ModalAlert';
```
#### Использование
Импортируется однократно в App

### Параметры и принцип работы, примеры кода

Вид окна зависит от параметров, которые передаются.

#### Параметры
`head`:String||null - заголовок окна

`text`:String||null - текстовое пояснение

`onAccept`:Function - callback срабатывающий при нажатии на кнопку "Принять"

`onReject`:Function  - callback срабатывающий при нажатии на кнопку "Отмена"

`defaultText`:String - текст выводится в поле для ввода


#### Окно Alert
`head` - заголовок окна

`text` - текстовое пояснение

При указании одного из двух параметров происходит вызов окна Alert

```js
this.$root.$emit(
  'showModal',
  {
    head: "Заголовок окна",
    text: "Текст пояснения",
  },
);
```

#### Окно Confirm
Вызывается по тому же принципу, что и Alert
Вызывается с параметрами `head`, `text`, а так же указаны
`onAccept` и/или `onReject`.

```js
this.$root.$emit(
  'showModal',
  {
    head: "Заголовок окна",
    text: "Текст пояснения",
    onAccept: () => null,
    onReject: () => null,
  },
);
```

#### Oкно Prompt
Имеет те же параметры, что и Confirm: `head`, `text`, `onAccept`, `onReject`,
а так же указывается параметр `defaultText` со значением, или пустой стройкой `""`,

`onAccept` в качестве аргумента получает ввеленный пользователем текст

```js
this.$root.$emit(
  'showModal',
  {
    head: "Заголовок окна",
    text: "Текст пояснения",
    onAccept: (text) => { doSomeWith(text); },
    onReject: () => null,
    defaultText: "email@address",
  },
);
```

</docs>
