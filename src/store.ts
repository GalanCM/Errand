import Vue from "vue";
import Vuex, { Store } from "vuex";
import { RootState, TaskData } from "@/types";

Vue.use(Vuex);

// restore state from localStorage or create new state if localStorage is empty
let state!: RootState;
const savedTasks = localStorage.getItem("tasks");
if (savedTasks !== null) {
  state = { tasks: JSON.parse(savedTasks) };

  // restore dates as Date()s
  for (const task of state.tasks) {
    task.date = new Date(task.date);
  }

  const todaysDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  // delete old completed tasks
  state.tasks = state.tasks.filter((task) => task.date >= todaysDate || task.done === false);

  // roll over old incomplete tasks to today
  state.tasks
    .filter((task) => task.date <= todaysDate)
    .sort((a, b) => {
      if (a.date < b.date || (a.date === b.date && a.order < b.order)) {
        return -1;
      } else if (a.date > b.date || (a.date === b.date && a.order > b.order)) {
        return 1;
      } else {
        return 0;
      }
    })
    .forEach((task: TaskData, index: number) => {
      task.date = todaysDate;
      task.order = index;
    });
} else {
  state = {
    tasks: [
      {
        id: 0,
        description: "Active Task",
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        order: 1,
        done: false
      },
      {
        id: 1,
        description: "Completed Task",
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        order: 2,
        done: true
      }
    ]
  };
}

const getters = {};

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
  removeTask(localState: RootState, task: TaskData) {
    localState.tasks.splice(localState.tasks.indexOf(task), 1);
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

// Plugin for backing up tasks locally.
// Not the best optimized approach, but the most straightforward.
// Will come back and optimize later if performance is a problem.
const localPeristancePlugin = (localStore: Store<RootState>) => {
  localStore.subscribe((mutation: { type: string; payload: any }, localState: RootState) => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  });
};

const store = {
  state,
  getters,
  mutations,
  actions: {},
  plugins: [localPeristancePlugin]
};

export default new Vuex.Store(store);
