import { expect } from "chai";
import { mutations } from "@/store";
import { RootState, TaskData } from "@/types";
import { getDate } from "@/date-helper";

const sampleTask: TaskData = {
  id: undefined,
  description: "Active Task",
  date: getDate(),
  order: 1,
  done: false
};

/* tslint:disable:only-arrow-functions */
describe("mutations", function() {
  describe("UPDATE_TASK", function() {
    it("with undefined id should add task to store with new id.", function() {
      const state: RootState = { tasks: [] };

      mutations.updateTask(state, sampleTask);

      expect(state.tasks[0]).to.include({
        description: sampleTask.description,
        date: sampleTask.date,
        order: sampleTask.order,
        done: sampleTask.done
      });

      expect(state.tasks[0].id).to.be.a("number");
    });

    it("with non-existant id should throw error.", function() {
      const state: RootState = { tasks: [] };

      const newTask = { ...sampleTask, id: -1 };

      const invalidUpdate = () => {
        mutations.updateTask(state, newTask);
      };

      expect(invalidUpdate).to.throw(Error, "Task id not found");
      expect(state.tasks).to.have.lengthOf(0);
    });

    it("with existing id should update existing task", function() {
      const state: RootState = { tasks: [sampleTask] };

      const update = { ...sampleTask, done: true };

      mutations.updateTask(state, update);

      expect(state.tasks[0]).to.include({
        description: sampleTask.description,
        date: sampleTask.date,
        order: sampleTask.order,
        done: update.done
      });
    });
  });

  describe("REMOVE_TASK", function() {
    it("should delete task if it exists.", function() {
      const state: RootState = { tasks: [sampleTask] };

      mutations.removeTask(state, sampleTask);

      expect(state.tasks).to.have.lengthOf(0);
    });

    it("should throw error if task does not exist.", function() {
      const state: RootState = { tasks: [sampleTask] };

      const newTask = { ...sampleTask, id: -1000 };

      const invalidRemove = () => {
        mutations.removeTask(state, newTask);
      };

      expect(invalidRemove).to.throw(Error, "Can't delete task: not found");
      expect(state.tasks).to.have.lengthOf(1);
    });
  });

  describe("NORMALIZE_ORDER", function() {
    it("should make sure task order attributes are incremented in steps of 1.", function() {
      const initialTasks = [
        sampleTask,
        { ...sampleTask, id: 2, order: 0.5 },
        { ...sampleTask, id: 3, order: 1.1 },
        { ...sampleTask, id: 4, order: 1.5 }
      ];

      const taskSort = (a: TaskData, b: TaskData) => {
        if (a.order < b.order) {
          return -1;
        } else if (a.order > b.order) {
          return 1;
        } else {
          return 0;
        }
      };

      const state: RootState = { tasks: initialTasks };

      mutations.normalizeOrder(state);

      const sortedTasks = state.tasks.sort(taskSort);
      for (const index of sortedTasks.keys()) {
        const orderValue = sortedTasks[index].order;
        expect(orderValue % 1).to.equal(0);
        expect(orderValue).to.equal(index);
      }
    });
  });

  describe("CLEANUP_OLD_TASKS", function() {
    it("should delete completed tasks from previous days", function() {
      const state = {
        tasks: [{ ...sampleTask, date: getDate(-1), done: true }]
      };

      mutations.cleanupOldTasks(state);

      expect(state.tasks).to.have.lengthOf(0);
    });

    it("should move incomplete tasks from previous days to today", function() {
      const state = {
        tasks: [{ ...sampleTask, date: getDate(-1), done: false }]
      };

      mutations.cleanupOldTasks(state);

      expect(state.tasks).to.have.lengthOf(1);
      expect(state.tasks[0].date.getTime()).to.equal(getDate(0).getTime());
    });

    it("should maintain sort order when moving incomplete tasks", function() {
      const state = {
        tasks: [
          { ...sampleTask, date: getDate(-2), order: 1, done: false },
          { ...sampleTask, date: getDate(-1), order: 1, done: false },
          { ...sampleTask, date: getDate(-1), order: 2, done: false },
          { ...sampleTask, date: getDate(0), order: 1, done: false }
        ]
      };

      mutations.cleanupOldTasks(state);

      for (const index of state.tasks.keys()) {
        const task = state.tasks[index];

        expect(task.date.getTime()).to.equal(getDate(0).getTime());
        expect(task.order).to.equal(index);
      }
    });
  });
});
