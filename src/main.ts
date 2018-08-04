import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

import { Drag, Drop } from "vue-drag-drop";
Vue.component("drag", Drag);
Vue.component("drop", Drop);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
