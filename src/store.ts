import Vue from "vue";
import Vuex from "vuex";
import { RootState, TaskData } from "@/types";

Vue.use(Vuex);

const state: RootState = {
  tasks: [
    {
      id: 0,
      description: "First Task",
      date: new Date(),
      order: 1,
      done: false
    },
    {
      id: 1,
      description: "Second Task",
      date: new Date(),
      order: 1,
      done: true
    }
  ]
};

const getters = {
  getTasksByDate: (state_: RootState) => (date: Date) => {
    return state_.tasks.filter((task: TaskData) => task.date.toDateString() === date.toDateString()).sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      } else if (a.order < b.order) {
        return -1;
      } else {
        return 0;
      }
    });
  }
};

const mutations = {
  addTask(state_: RootState, payload: any) {
    const newTask: TaskData = {
      id: window.performance.now(),
      description: "",
      date: payload.date,
      order: payload.order,
      done: false
    };

    state_.tasks.push(newTask);
    return newTask;
  },
  updateTask(state_: RootState, updatedTask: TaskData) {
    let storedTask = state_.tasks.find((task) => task.id === updatedTask.id);
    storedTask = { ...storedTask, ...updatedTask };
  }
};

const store = {
  state,
  getters,
  mutations,
  actions: {}
};

export default new Vuex.Store(store);
