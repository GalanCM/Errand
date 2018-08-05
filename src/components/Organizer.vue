<template>
  <section>
    <h2>Today</h2>
    <Task v-for="task in todaysTasks" :details="task" :key="task.id"></Task>
    <h2>Tomorrow</h2>
      <Task v-for="task in tomorrowsTasks" :details="task" :key="task.id"></Task>
    <h2>Friday</h2>
      <Task v-for="task in nextDaysTasks" :details="task" :key="task.id"></Task>
  </section>
</template>

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

  get todaysTasks() {
    return this.getTasksByDateOffset(0);
  }
  get tomorrowsTasks() {
    return this.getTasksByDateOffset(1);
  }
  get nextDaysTasks() {
    return this.getTasksByDateOffset(2);
  }

  private getTasksByDateOffset(offset: number) {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + offset);
    // date.setDate(date.getDate() + offset);

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

  private createNewTask(date: Date) {
    this.newTask = {
      id: undefined,
      description: "",
      date: date,
      order: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].order + 1 : 0,
      done: false
    };
  }

  private closeNewTask() {
    this.$nextTick(() => {
      this.newTask = null;
    });
  }
}
</script>

