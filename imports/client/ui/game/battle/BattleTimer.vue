<template lang="pug">
.BattleTimer осталось {{ remainsInSeconds }} с...
</template>

<script>
export default {
  props: {
    end: {
      type: Number,
      required: true,
    },
    notifyBefore: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      remains: 0,
      interval: null,
    };
  },
  computed: {
    remainsInSeconds() {
      return Math.round(this.remains / 1000);
    },
  },
  watch: {
    end() {
      this.startInterval();
    },
    remains(val, oldVal) {
      if (!this.notifyBefore) {
        return;
      }
      if (oldVal > this.notifyBefore && val <= this.notifyBefore) {
        this.$emit('timerNotification', { remains: val });
      }
    },
  },
  created() {
    this.startInterval();
  },
  beforeDestroy() {
    this.clearInterval();
  },
  methods: {
    startInterval() {
      this.clearInterval();
      if (this.end <= Date.now()) {
        return;
      }
      this.interval = setInterval(() => {
        const remains = this.end - Date.now();
        if (remains < 0) {
          this.clearInterval();
          this.remains = 0;
          this.$emit('timeout');
        } else {
          this.remains = remains;
        }
      }, 200);
    },
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
  },
};
</script>

<style lang="stylus">
  .BattleTimer
    text-align center
</style>

<docs>
# Таймер боя
```js
import BattleTimer from '/imports/client/ui/game/battle/BattleTimer.vue';
```

```pug
BattleTimer(
  :end="timestampInMs"
  :notifyBefore="milliseconds"
  @timeout="cb"
  @timerNotification="cb2($event)"
)
```

параметр notifyBefore позволяет получить уведомление (timerNotification) за N миллисекунд до
окончания отсчета. Это будет полезно, если хочется учесть пинг между сервером и клиентом и
отключить возможность отправлять данные об атаке и блоке, когда сервер не успеет их обработать.
</docs>
