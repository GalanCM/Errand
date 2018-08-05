import Vue from "vue";
import Vuex from "vuex";
import { RootState, TaskData } from "@/types";

Vue.use(Vuex);

const state: RootState = {
  tasks: [
    {
      id: 0,
      description: "First Task",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      order: 1,
      done: false
    },
    {
      id: 1,
      description: "Second Task",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      order: 2,
      done: true
    },
    {
      id: 2,
      description: "Tommorow Task",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
      order: 2,
      done: false
    },
    {
      id: 3,
      description: "Final Task",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2),
      order: 2,
      done: false
    }
  ]
};

// const getTasksByDate = (localState: RootState, offset: number) => {
//   const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
//   date.setDate(date.getDate() + this.dateModifier);

//   return localState.tasks.filter((task: TaskData) => task.date.toDateString() === date.toDateString()).sort((a, b) => {
//     if (a.order > b.order) {
//       return 1;
//     } else if (a.order < b.order) {
//       return -1;
//     } else {
//       return 0;
//     }
//   });
// };

const getters = {
  //   getTasksByDate: (localState: RootState) => (date: Date) => {
  //     return getTasksByDate(localState, date);
  //   },
  //   getTodaysTasks: (localState: RootState) => {
  //     const date = new Date(Date.now());
  //     return getTasksByDate(localState, date);
  //   },
  //   getTomorrowsTasks: (localState: RootState) => {
  //     const date = new Date(Date.now());
  //     date.setDate(date.getDate() + 1);
  //     return getTasksByDate(localState, date);
  //   },
  //   getNextDaysTasks: (localState: RootState) => {
  //     const date = new Date(Date.now());
  //     date.setDate(date.getDate() + 2);
  //     return getTasksByDate(localState, date);
  //   }
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
  },
  normalizeOrder(localState: RootState) {
    const reorderedTasks = localState.tasks.map((task) => [task.id, task.order]);
    reorderedTasks.sort((a: Array<number | undefined>, b: Array<number | undefined>) => {
      if (a === undefined || b === undefined) {
        return 0;
        // @ts-ignore: a & b cannot be undefined at this point
      } else if (a[1] < b[1]) {
        return -1;
        // @ts-ignore: a & b cannot be undefined at this point
      } else if (a[1] > b[1]) {
        return 1;
      } else {
        return 0;
      }
    });

    for (const i of reorderedTasks.keys()) {
      const sortedTaskId = reorderedTasks[i][0];
      for (const stateTask of localState.tasks) {
        if (sortedTaskId === stateTask.id) {
          stateTask.order = i;
        }
      }
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
