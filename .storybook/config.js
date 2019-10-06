import { configure } from '@storybook/vue';
import { configureViewport } from '@storybook/addon-viewport';
import { setOptions } from '@storybook/addon-options';
import viewports from './viewports';
import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';
import '../.storybook/styles.styl';
import '../imports/client/ui/styles/index.styl';

Vue.use(Vue2TouchEvents);

configureViewport({
  viewports,
  defaultViewport: 'Iphone 8'
});

setOptions({
  addonPanelInRight: true,
});

const req = require.context('../imports', true, /\.story\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
