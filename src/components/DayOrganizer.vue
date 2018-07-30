<template>
  <section class="day">
    <header>
      <span class="name">{{name}}</span>
    </header>

    <main>
      <Task v-for="(task, index) in tasks" :details="task" :key="index"></Task>
      <div>
        <button @click="createNewTask()" v-if="newTask === null">+ New Task</button>
        <Task v-else :details="newTask"></Task>
      </div>
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
}

main {
  padding: 5px 0;

  button {
    padding: 5px 10px;
    background-color: #e5e5e5;
    border: none;
    color: #006fc0;
    font-size: 16px;
    font-weight: 800;
    font-family: "Work Sans", Arial, sans-serif;
  }
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
  @Prop() private dateModifier!: number;
  private tasks!: TaskData[];
  private newTask: TaskData | null = null;

  created() {
    this.tasks = this.$store.getters.getTasksByDate(this.date);
  }

  get date() {
    let date = new Date();
    date.setDate(date.getDate() + this.dateModifier);

    return date;
  }

  get name() {
    if (this.dateModifier === 0) {
      return "Today";
    } else if (this.dateModifier === 1) {
      return "Tomorrow";
    } else {
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[this.date.getDay()];
    }
  }

  private createNewTask() {
    this.newTask = {
      id: undefined,
      description: "",
      date: this.date,
      order: -1,
      done: false
    };
  }

  private refreshTasks() {
    this.tasks = this.$store.getters.getTasksByDate(this.date);
    this.$forceUpdate();
  }
}
</script>


