<template>
  <transition name="corner-slide">
    <drop class="trash"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <span class="label" :class="{ dragOver: isDragOver }">Remove</span>
      <img class="icon" src="/trash.svg">
    </drop>
  </transition>
</template>

<style lang="less" scoped>
.trash {
  display: flex;
  align-content: center;
  position: fixed;
  top: 0;
  right: 0;
  height: 50px;
  border-bottom-left-radius: 10px;
  background-color: rgba(0, 0, 0, 0.8);
}

.label {
  margin: auto 0 auto 10px;
  font-size: 18px;
  color: white;

  &.dragOver {
    color: red;
  }
}

.icon {
  width: 40px;
  margin: auto 5px;
  padding-bottom: 2px;
  padding-left: 3px;
}

// TRANSITIONS
.corner-slide-enter-active,
.corner-slide-leave-active {
  transition: 500ms transform ease-out, 300ms opacity ease-out;
}
.corner-slide-enter, .corner-slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate(100%, -100%);
  opacity: 0;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { TaskData } from "@/types";

@Component
export default class Trash extends Vue {
  private isDragOver = false;

  private handleDragOver(transferData: { details: TaskData }, event: DragEvent) {
    this.isDragOver = true;
  }
  private handleDragLeave(transferData: { details: TaskData }, event: DragEvent) {
    this.isDragOver = false;
  }
  private handleDrop(transferData: { details: TaskData }, event: DragEvent) {
    this.isDragOver = false;
    this.$store.commit("removeTask", transferData.details);
    this.$emit("task-deleted");
  }
}
</script>
