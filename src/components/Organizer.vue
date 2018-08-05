<template>
  <section class="organizer">
    <transition-group :name="isSorting ? 'slide-reorder' : ''" tag="div">
      <h2 class="day-header" key="today">Today</h2>
      <Task v-for="task in todayTasks" :details="task" :key="task.id" @start-sorting="startSorting" @stop-sorting="stopSorting"></Task>
      <button class="new-button"
        @click="createNewTaskWithDateOffeset(0)"
        v-if="newTask === null || newTask.date.getTime() !== getDateWithOffset(0).getTime()"
        key="buttonToday">
        + New Task
      </button>
      <Task v-else class="new-task" :details="newTask" @description-blurred="closeNewTask" key="newTaskToday"></Task>

      <h2 class="day-header" key="tomorrow">Tomorrow</h2>
      <Task v-for="task in tomorrowTasks" :details="task" :key="task.id" @start-sorting="startSorting" @stop-sorting="stopSorting"></Task>
      <button class="new-button"
        @click="createNewTaskWithDateOffeset(1)"
        v-if="newTask === null || newTask.date.getTime() !== getDateWithOffset(1).getTime()"
        key="buttonTomorrow">
        + New Task
      </button>
      <Task v-else class="new-task" :details="newTask" @description-blurred="closeNewTask" key="newTaskTommorrow"></Task>

      <h2 class="day-header" key="nextDay">{{ getDayNameWithOffset(2) }}</h2>
      <Task v-for="task in nextTasks" :details="task" :key="task.id" @start-sorting="startSorting" @stop-sorting="stopSorting"></Task>
      <button class="new-button"
        @click="createNewTaskWithDateOffeset(2)"
        v-if="newTask === null || newTask.date.getTime() !== getDateWithOffset(2).getTime()"
        key="buttonNext">
        + New Task
      </button>
      <Task v-else class="new-task" :details="newTask" @description-blurred="closeNewTask" key="newTaskNext"></Task>
    </transition-group>
  </section>
</template>

<style lang="less" scoped>
.organizer {
  width: 50%;
  min-width: 480px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
}

.day-header {
  margin: 0;
  padding: 3px 0 3px 10px;
  border-bottom: 1px dashed white;
  background-color: #009086;
  color: white;
  font-size: 26px;
  font-weight: 500;

  &:not(:first-child) {
    margin-top: 5px;
    border-top: 7px solid #dbdbdb;
  }
}

.new-button {
  padding: 5px 10px;
  background-color: #e5e5e5;
  border: none;
  color: #006fc0;
  font-size: 16px;
  font-weight: 800;
  font-family: "Work Sans", Arial, sans-serif;

  &:not(:first-child) {
    margin-top: 2px;
  }
}

// TRANSITIONS
.slide-reorder-move {
  transition: 300ms transform ease-in-out;
}
</style>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { State } from "vuex-class";

import { TaskData } from "@/types";

import Task from "@/components/Task.vue";
import { setTimeout } from "timers";

@Component({ components: { Task } })
export default class Organizer extends Vue {
  @State("tasks") private tasks!: TaskData[];
  private newTask: TaskData | null = null;

  private isSorting = false;

  get todayTasks() {
    return this.getTasksByDateOffset(0);
  }
  get tomorrowTasks() {
    return this.getTasksByDateOffset(1);
  }
  get nextTasks() {
    return this.getTasksByDateOffset(2);
  }

  private getDateWithOffset(offset: number) {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + offset);
  }

  private getDayNameWithOffset(offset: number) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[this.getDateWithOffset(2).getDay()];
  }

  private getTasksByDateOffset(offset: number) {
    const date = this.getDateWithOffset(offset);

    return this.tasks.filter((task: TaskData) => task.date.toDateString() === date.toDateString()).sort((a, b) => {
      if (a.order > b.order) {
        return 1;
      } else if (a.order < b.order) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  private createNewTaskWithDateOffeset(offset: number) {
    const daysTasks = this.getTasksByDateOffset(offset);

    this.newTask = {
      id: undefined,
      description: "",
      date: this.getDateWithOffset(offset),
      order: daysTasks.length > 0 ? daysTasks[daysTasks.length - 1].order + 1 : 0,
      done: false
    };
  }

  private closeNewTask() {
    this.$nextTick(() => {
      this.newTask = null;
    });
  }

  private startSorting() {
    this.isSorting = true;
  }
  private stopSorting() {
    this.isSorting = false;
  }
}
</script>

