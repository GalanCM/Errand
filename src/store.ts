import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { Planner } from "@/types";

Vue.use(Vuex);

const state: Planner = {
  day_planners: [
    {
      plans: [
        {
          description: "First Task",
          done: false
        },
        {
          description: "Second Task",
          done: true
        }
      ]
    }
  ]
};

const store = {
  state,
  mutations: {},
  actions: {}
};

export default new Vuex.Store(store);
