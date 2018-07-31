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

const getTasksByDate = (localState: RootState, date: Date) => {
  return localState.tasks.filter((task: TaskData) => task.date.toDateString() === date.toDateString()).sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    } else if (a.order < b.order) {
      return -1;
    } else {
      return 0;
    }
  });
};

const getters = {
  getTasksByDate: (localState: RootState) => (date: Date) => {
    return getTasksByDate(localState, date);
  },
  getTodaysTasks: (localState: RootState) => {
    const date = new Date(Date.now());
    return getTasksByDate(localState, date);
  },
  getTomorrowsTasks: (localState: RootState) => {
    const date = new Date(Date.now());
    date.setDate(date.getDate() + 1);
    return getTasksByDate(localState, date);
  },
  getNextDaysTasks: (localState: RootState) => {
    const date = new Date(Date.now());
    date.setDate(date.getDate() + 2);
    return getTasksByDate(localState, date);
  }
};

const mutations = {
  updateTask(localState: RootState, updatedTask: TaskData) {
    if (updatedTask.id === undefined) {
      updatedTask.id = window.performance.now() + Math.random();
      localState.tasks.push(updatedTask);
    } else {
      let storedTask = localState.tasks.find((task) => task.id === updatedTask.id);
      storedTask = { ...storedTask, ...updatedTask };
    }
  }
};

const store = {
  state,
  getters,
  mutations,
  actions: {}
};

export default new Vuex.Store(store);
