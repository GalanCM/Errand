<template>
  <div>
    <section class="organizer">
      <transition-group :name="isSorting ? 'slide-reorder' : ''" tag="div">
        <template v-for="offset in [0,1,2]">
          <h2 class="day-header" :key="'day' + offset">{{getDayNameFromOffset(offset)}}</h2>
          <Task v-for="task in getTasksByDateOffset(offset)" :details="task" :key="task.id" @start-sorting="startSorting" @stop-sorting="stopSorting"></Task>
          <drop
            v-if="getTasksByDateOffset(offset).length === 0 && ( newTask === null || newTask.date.getTime() !== getDateWithOffset( offset ).getTime() )"
            class="drop"
            :key="'drop' + offset"
            @dragenter="handleDropEnter(offset, ...arguments)"
          ></drop>
          <button class="new-button"
            @click="createNewTaskWithDateOffset(offset)"
            v-if="newTask === null || newTask.date.getTime() !== getDateWithOffset(offset).getTime()"
            :key="'button' + offset"
          >
            + New Task
          </button>
          <Task v-else class="new-task" :details="newTask" @description-blurred="closeNewTask" @create-new="$nextTick( () => $nextTick( () => createNewTaskWithDateOffset(offset) ) )" :key="'newTaskDay' + offset"></Task>
        </template>
      </transition-group>
    </section>
  </div>
</template>

<style lang="less" scoped>
.organizer {
  width: 50%;
  min-width: 320px;
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
  transition: 200ms transform ease-in-out;
}

.drop {
  height: 36px;
  width: calc(100% - 10px);
  margin: 2px 10px 2px 0;
}
</style>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { State } from "vuex-class";

import { TaskData } from "@/types";

import Task from "@/components/Task.vue";
import { getDate } from "@/date-helper";
import { setTimeout } from "timers";

@Component({ components: { Task } })
export default class Organizer extends Vue {
  @State("tasks") private tasks!: TaskData[];
  private newTask: TaskData | null = null;

  private isSorting = false;

  private getDateWithOffset(offset: number) {
    return getDate(offset);
  }

  private getDayNameFromOffset(offset: number) {
    if (offset === 0) {
      return "Today";
    } else if (offset === 1) {
      return "Tomorrow";
    } else {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      return days[this.getDateWithOffset(offset).getDay()];
    }
  }

  private getTasksByDateOffset(offset: number) {
    const date = this.getDateWithOffset(offset);

    return this.tasks
      .filter(
        (task: TaskData) => task.date.toDateString() === date.toDateString()
      )
      .sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        } else if (a.order < b.order) {
          return -1;
        } else {
          return 0;
        }
      });
  }

  private createNewTaskWithDateOffset(offset: number) {
    const daysTasks = this.getTasksByDateOffset(offset);

    this.newTask = {
      id: undefined,
      description: "",
      date: this.getDateWithOffset(offset),
      order:
        daysTasks.length > 0 ? daysTasks[daysTasks.length - 1].order + 1 : 0,
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

  private handleDropEnter(
    offset: number,
    transferData: { details: TaskData },
    event: DragEvent
  ) {
    this.$store.commit("updateTask", {
      ...transferData.details,
      date: this.getDateWithOffset(offset),
      order: 0.5
    });
  }
}
</script>

