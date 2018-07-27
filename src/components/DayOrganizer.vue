<template>
  <section class="day">
    <header>
      <span class="name">Today</span>
      <button @click="addTask">+</button>
    </header>
    <main>
      <Task v-for="(task, index) in tasks" :details="task" :key="index"></Task>
    </main>
  </section>
</template>

<style lang="less" scoped>
.day {
  min-width: 280px;
  width: 50%;
  margin: 20px auto;
  padding: 0;
  box-shadow: 2px 2px 13px rgba(0, 0, 0, 0.15);
}

header {
  padding: 10px;
  font-size: 28px;
  font-weight: 600;
  background-color: #009086;
  color: white;
  display: flex;

  .name {
    flex-grow: 1;
  }

  button {
    background-color: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.9);
    font-family: "Work Sans";
    font-size: 28px;
  }
}

main {
  padding: 5px 0;
  border-left: 1px solid #009086;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { TaskData } from "@/types";

import Task from "@/components/Task.vue";

@Component({ components: { Task } })
export default class DayOrganizer extends Vue {
  private tasks: TaskData[] = this.$store.getters.getTasksByDate(new Date());

  private addTask() {
    this.$store.commit("addTask", { date: new Date(), order: this.tasks.length });
    this.refreshTasks();
  }

  private refreshTasks() {
    this.tasks = this.$store.getters.getTasksByDate(new Date());
  }
}
</script>


