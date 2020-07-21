import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import SignIn from "./views/SignIn.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/about",
          name: "about",
          component: About
        },
        {
          path: "/sign-in",
          name: "signIn",
          component: SignIn
        }
      ]
    }
  ]
});
