<template>
  <section class="day">
    <header>
      <span class="name">{{name}}</span>
    </header>

    <drop @dragenter="handleDragEnter" @drop="handleDrop">
      <main>
        <div class="tasks">
          <transition-group name="task-transition" tag="div">
            <Task
              v-for="task in tasks" 
              :details="task"
              :key="task.id"
              @order-changed="updateOrder"
            ></Task>
          </transition-group>
        </div>
        <button class="new-button" @click="createNewTask()" v-if="newTask === null">+ New Task</button>
        <Task v-else :details="newTask" @description-blurred="closeNewTask"></Task>
      </main>
    </drop>
  </section>
</template>

<style lang="less" scoped>
.day {
  min-width: 280px;
  width: 50%;
  margin: 10px auto;
  padding: 0;
  box-shadow: 2px 2px 13px rgba(0, 0, 0, 0.15);
}

header {
  padding: 6px 10px;
  font-size: 26px;
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
  background-color: white;

  .tasks {
    display: flex;
    flex-direction: column;
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

  .task {
    &:last-child {
      padding-bottom: 0;
    }
  }
}

// TRANSITIONS
.task-transition-move {
  transition: 300ms transform ease-out;
}
// .task-transition-enter,
// .task-transition-leave-to {
//   opacity: 0;
// }
// .task-transition-enter-active {
//   transition: 700ms opacity ease-in;
// }
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { TaskData } from "@/types";

import Task from "@/components/Task.vue";
import { setTimeout } from "timers";

@Component({ components: { Task } })
export default class DayOrganizer extends Vue {
  @Prop() private dateModifier!: number;
  private newTask: TaskData | null = null;

  get tasks() {
    const tasks: TaskData[] = [];
    if (this.dateModifier === 0) {
      return this.$store.getters.getTodaysTasks;
    } else if (this.dateModifier === 1) {
      return this.$store.getters.getTomorrowsTasks;
    } else if (this.dateModifier === 2) {
      return this.$store.getters.getNextDaysTasks;
    } else {
      return [];
    }
  }

  get date() {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    date.setDate(date.getDate() + this.dateModifier);

    return date;
  }

  get name() {
    if (this.dateModifier === 0) {
      return "Today";
    } else if (this.dateModifier === 1) {
      return "Tomorrow";
    } else {
      const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return DAYS[this.date.getDay()];
    }
  }

  private createNewTask() {
    this.newTask = {
      id: undefined,
      description: "",
      date: this.date,
      order: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].order + 1 : 0,
      done: false
    };
  }

  private closeNewTask() {
    this.$nextTick(() => {
      this.newTask = null;
    });
  }

  private updateOrder() {
    this.$store.commit("normalizeOrder", this.tasks);
  }

  private handleDragEnter(transferData: { details: TaskData }, event: DragEvent) {
    if (this.tasks.length === 0) {
      transferData.details.date = this.date;
      transferData.details.order = 0.5;
    }
  }

  private handleDrop(transferData: any, event: DragEvent) {
    this.updateOrder();

    // hack to force DOM repaint on Firefox
    if (this.tasks.length === 1) {
      (this.$el.querySelector(".task") as HTMLElement).style.opacity = "0.21";
      setTimeout(() => {
        (this.$el.querySelector(".task") as HTMLElement).style.opacity = "1";
      }, 50);
    }
  }
}
</script>


