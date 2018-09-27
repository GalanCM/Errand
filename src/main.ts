import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

import { Drag, Drop } from "vue-drag-drop";
Vue.component("drag", Drag);
Vue.component("drop", Drop);

import { polyfill } from "mobile-drag-drop";
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";
polyfill({
  // use this to make use of the scroll behaviour
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
