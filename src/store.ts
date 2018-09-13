import Vue from "vue";
import Vuex, { Store } from "vuex";
import { RootState, TaskData } from "@/types";
import { getDate } from "@/date-helper";

Vue.use(Vuex);

// restore state from localStorage or create new state if localStorage is empty
const state: RootState = {
  tasks: [
    {
      id: 0,
      description: "Active Task",
      date: getDate(),
      order: 1,
      done: false
    },
    {
      id: 1,
      description: "Completed Task",
      date: getDate(),
      order: 2,
      done: true
    }
  ]
};

const getters = {};

export const mutations = {
  updateTask(localState: RootState, updatedTask: TaskData) {
    const taskIndex = localState.tasks.findIndex(
      (task) => task.id === updatedTask.id
    );

    if (updatedTask.id === undefined) {
      updatedTask.id = window.performance.now() + Math.random();
      localState.tasks.push(updatedTask);
    } else if (taskIndex !== -1) {
      // not the prettiest way to modify attributes, but necessary to work both with and without Vuex
      for (const key of Object.keys(localState.tasks[taskIndex])) {
        // @ts-ignore: need implict any to loop through keys
        localState.tasks[taskIndex][key] = updatedTask[key];
      }
    } else {
      throw new Error("Task id not found");
    }
  },

  removeTask(localState: RootState, taskToRemove: TaskData) {
    const taskIndex = localState.tasks.findIndex((task) => {
      if (task.id === taskToRemove.id) {
        return true;
      } else {
        return false;
      }
    });

    if (taskIndex !== -1) {
      localState.tasks.splice(taskIndex, 1);
    } else {
      throw new Error("Can't delete task: not found");
    }
  },

  normalizeOrder(localState: RootState) {
    interface MiniTask {
      id: number | undefined;
      order: number;
    }
    const reorderedTasks: MiniTask[] = localState.tasks.map((task) => {
      return {
        id: task.id,
        order: task.order
      };
    });
    reorderedTasks.sort((a: MiniTask, b: MiniTask) => {
      if (a.order < b.order) {
        return -1;
      } else if (a.order > b.order) {
        return 1;
      } else {
        return 0;
      }
    });

    for (const index of reorderedTasks.keys()) {
      const miniTask = reorderedTasks[index];
      const trueTask = localState.tasks.find((task) => task.id === miniTask.id);
      if (trueTask === undefined) {
        throw new Error("Sorted task does not exist");
      }
      trueTask.order = index;
    }
  },

  cleanupOldTasks(localState: RootState) {
    const todaysUpdatedTasks: TaskData[] = [];

    for (let index = localState.tasks.length - 1; index >= 0; index--) {
      const task = localState.tasks[index];

      if (task.date < getDate(0) && task.done === true) {
        localState.tasks.splice(index);
      } else if (task.date.getTime() <= getDate(0).getTime()) {
        todaysUpdatedTasks.push(localState.tasks[index]);
      }
    }

    todaysUpdatedTasks.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else {
        if (a.order < b.order) {
          return -1;
        } else if (a.order > b.order) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    for (const index of todaysUpdatedTasks.keys()) {
      const task = todaysUpdatedTasks[index];
      task.date = getDate(0);
      task.order = index;
    }
  },

  replaceTasks(localStore: RootState, newTasks: TaskData[]) {
    localStore.tasks = newTasks;
  }
};

// Plugin for backing up tasks locally.
// Not the best optimized approach, but the most straightforward.
// Will come back and optimize later if performance is a problem.
const localPeristancePlugin = (localStore: Store<RootState>) => {
  // don't use in test
  if (process.env.NODE_ENV === "test") {
    return;
  }

  // restore state if available.
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks !== null) {
    const savedState = { tasks: JSON.parse(savedTasks) };

    // restore dates as Date()s
    for (const task of savedState.tasks) {
      task.date = new Date(task.date);
    }

    localStore.commit("replaceTasks", savedState.tasks);
    localStore.commit("cleanupOldTasks");
  }

  // watch for mutations and save state
  localStore.subscribe(
    (mutation: { type: string; payload: any }, localState: RootState) => {
      localStorage.setItem("tasks", JSON.stringify(localState.tasks));
    }
  );
};

const store = {
  state,
  getters,
  mutations,
  actions: {},
  plugins: [localPeristancePlugin]
  // strict: process.env.NODE_ENV !== "production"
};

export default new Vuex.Store(store);
