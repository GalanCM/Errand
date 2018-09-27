<template>
  <drop @dragenter="handleDragEnter">
    <drag 
      @dragstart="handleDragStart" 
      @dragend="handleDragEnd"
      :transfer-data="{ details }"
      :style="{opacity: this.order % 1 !== 0 ? 0.2 : 1}"
      :draggable="draggable"
    >
      <div 
        class="task" 
        :class="!done && description !== '' ? 'active' : '' " 
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        @keydown.shift.delete.prevent="onShiftDelete"
        @keydown.shift.up.prevent="onShiftArrowUp"
        @keydown.shift.down.prevent="onShiftArrowDown"
      >
        <img class="drag-indicator" src="drag_indicator.svg" draggable="false">
        <textarea
          v-model.lazy="description" 
          placeholder="empty task" 
          class="description"
          :disabled="done" 
          ref="description"
          rows="1"
          @input="onDescriptionInput"
          @blur="onDescriptionBlurred"
          @focus="draggable = false"
          @keydown.enter.exact.prevent="onKeyEnter"
          @keydown.esc="onKeyEsc"
        ></textarea>
        <button class="trash" @click="trash">
            <img class="trash-icon" src="/trash.svg">
        </button>
        <input type="checkbox" class="checkbox" v-model="done" @keydown.enter.exact="done = !done" v-show="description !== ''">

      </div>
    </drag>
  </drop>

</template>

<style lang="less" scoped>
.task {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 10px 2px 6px;
  margin: 2px 0;
  border-left: 4px solid transparent;
  font-size: 16px;
  background-color: white;

  &.active {
    border-color: #006fc0;
  }

  .drag-indicator {
    margin-left: -3px;
    padding-right: 2px;
    opacity: 0;
    cursor: move;
  }
  &:hover .drag-indicator {
    opacity: 0.7;
  }

  .description {
    flex-grow: 1;
    resize: none;
    padding: 5px;
    border: none;
    font-family: inherit;
    font-size: inherit;
    overflow: hidden;
    outline: none !important;
    border: 1px solid transparent;

    &:focus {
      background-color: #e5e5e5;
      border-radius: 2px;
    }

    &:disabled {
      background-color: transparent;
      color: rgba(0, 144, 134, 0.56);
    }
  }

  .trash {
    display: inline-block;
    height: 14px;
    padding: 0;
    margin-left: 10px;
    border: none;
    background: none;
    cursor: pointer;
    opacity: 0.2;
  }
  &:hover .trash {
    opacity: 0.5;
  }

  .checkbox {
    vertical-align: middle;
    margin-left: 10px;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

import { TaskData } from "@/types";

@Component
export default class Task extends Vue {
  @Prop()
  private details!: TaskData;

  private isHovered = false;

  private blockReordering = false; // prevent @dragEnter from firing during reordering
  private draggable = true;

  // map details to getters/setters to prevent mutation of Vuex store
  get id() {
    return this.details.id;
  }
  set id(value) {
    this.$store.commit("updateTask", { ...this.details, id: value });
  }

  get description() {
    return this.details.description;
  }
  set description(value) {
    this.$store.commit("updateTask", { ...this.details, description: value });
  }

  get date() {
    return this.details.date;
  }
  set date(value) {
    this.$store.commit("updateTask", { ...this.details, date: value });
  }

  get order() {
    return this.details.order;
  }
  set order(value) {
    this.$store.commit("updateTask", { ...this.details, order: value });
  }

  get done() {
    return this.details.done;
  }
  set done(value) {
    this.$store.commit("updateTask", { ...this.details, done: value });
  }

  private mounted() {
    this.onDescriptionInput();
    if (this.id === undefined) {
      (this.$refs.description as HTMLElement).focus();
    }
  }

  private updated() {
    if (this.description !== "") {
      this.$store.commit("updateTask", this.details);
    }
  }

  private trash() {
    this.$store.commit("removeTask", this.details);
  }

  private onDescriptionInput() {
    const descriptionElement = this.$refs.description as HTMLElement;
    descriptionElement.style.height = "auto"; // behavioral fix
    descriptionElement.style.height =
      descriptionElement.scrollHeight - 10 + "px";
  }

  private onDescriptionBlurred(newDescription: string, oldDescription: string) {
    this.$emit("description-blurred");
    this.draggable = true;
  }

  private onKeyEnter(event: Event) {
    event.preventDefault();
    (this.$refs.description as HTMLElement).blur();

    if (this.id === undefined) {
      this.$emit("create-new");
    }
  }

  private onKeyEsc() {
    (this.$refs.description as HTMLElement).blur();
  }

  private handleDragStart(transferData: any, event: DragEvent) {
    if (event.target) {
      const dragIndicator = (event.target as HTMLElement).querySelector(
        ".drag-indicator"
      ) as HTMLElement;
      const rightLimit = dragIndicator.getBoundingClientRect().right;
      if (event.clientX > rightLimit) {
        event.preventDefault();
        return;
      }
    }
    (this.$refs.description as HTMLElement).blur();
    this.$emit("start-sorting");
  }
  private handleDragEnter(
    transferData: { details: TaskData },
    event: DragEvent
  ) {
    if (this.id === transferData.details.id || this.blockReordering === true) {
      return;
    }

    if (
      transferData.details.date > this.date ||
      transferData.details.order < this.order
    ) {
      this.$store.commit("updateTask", {
        ...transferData.details,
        date: this.date,
        order: this.order + 0.5
      });
    } else if (
      transferData.details.date < this.date ||
      transferData.details.order > this.order
    ) {
      this.$store.commit("updateTask", {
        ...transferData.details,
        date: this.date,
        order: this.order - 0.5
      });
    }

    this.blockReordering = true;
    setTimeout(() => {
      this.blockReordering = false;
    }, 500);
  }
  private handleDragEnd(transferData: any, event: DragEvent) {
    this.$store.commit("normalizeOrder");
    this.$emit("stop-sorting");
  }
  private onShiftDelete() {
    this.$store.commit("removeTask", this.details);
  }
  private onShiftArrowUp() {
    this.order -= 1.5;
    this.$store.commit("normalizeOrder");
    this.isHovered = false;
    this.$nextTick(() => {
      (this.$refs.description as HTMLElement).focus();
    });
  }
  private onShiftArrowDown() {
    this.order += 1.5;
    this.$store.commit("normalizeOrder");
    this.isHovered = false;
    this.$nextTick(() => {
      (this.$refs.description as HTMLElement).focus();
    });
  }
}
</script>