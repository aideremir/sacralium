import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';
import routerFactory from '/imports/client/routes';
import Vue2TouchEvents from 'vue2-touch-events';

import App from '/imports/client/ui/App.vue';
import '/imports/modules/Core/lib/validation';

Vue.use(VueMeteorTracker);
Vue.use(Vue2TouchEvents, {
  swipeTolerance: 100,
});

Meteor.startup(() => {
  const router = routerFactory();
  new Vue({
    router,
    ...App,
  }).$mount('#app');
});
