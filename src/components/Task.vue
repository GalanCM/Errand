<template>
  <drop @dragenter="handleDragEnter">
    <drag 
      @dragstart="handleDragStart" 
      @dragend="handleDragEnd"
      :transfer-data="{ details }"
      :style="{opacity: this.details.order % 1 !== 0 ? 0.2 : 1}"
      :draggable="draggable"
    >
      <div 
        class="task" 
        :class="!details.done && details.description !== '' ? 'active' : '' " 
        @mouseover="isHovered = true"
        @mouseout="isHovered = false"
        @keydown.shift.delete.prevent="onShiftDelete"
        @keydown.shift.up.prevent="onShiftArrowUp"
        @keydown.shift.down.prevent="onShiftArrowDown"
      >
        <img class="drag-indicator" src="drag_indicator.svg" draggable="false">
        <textarea
          v-model.lazy="details.description" 
          placeholder="empty task" 
          class="description"
          :disabled="details.done" 
          ref="description"
          rows="1"
          @input="onDescriptionInput"
          @blur="onDescriptionBlurred"
          @focus="draggable = false"
          @keydown.enter.exact.prevent="onKeyEnter"
          @keydown.esc="onKeyEsc"
        ></textarea>
        <input type="checkbox" class="checkbox" v-model="details.done" @keydown.enter.exact="details.done = !details.done" v-show="details.description !== ''">
        <Trash v-show="isHovered" :task="details"></Trash>
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
import Trash from "@/components/Trash.vue";

@Component({ components: { Trash } })
export default class Task extends Vue {
  @Prop() private details!: TaskData;

  private isHovered = false;

  private blockReordering = false; // prevent @dragEnter from firing during reordering
  private draggable = true;

  private mounted() {
    this.onDescriptionInput();
    if (this.details.id === undefined) {
      (this.$refs.description as HTMLElement).focus();
    }
  }

  private updated() {
    if (this.details.description !== "") {
      this.$store.commit("updateTask", this.details);
    }
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

    if (this.details.id === undefined) {
      this.$emit("create-new");
    }
  }

  private onKeyEsc() {
    (this.$refs.description as HTMLElement).blur();
  }

  private handleDragStart(transferData: any, event: DragEvent) {
    (this.$refs.description as HTMLElement).blur();
    this.$emit("start-sorting");
  }
  private handleDragEnter(
    transferData: { details: TaskData },
    event: DragEvent
  ) {
    if (
      this.details.id === transferData.details.id ||
      this.blockReordering === true
    ) {
      return;
    }

    if (transferData.details.date > this.details.date) {
      transferData.details.date = this.details.date;
      transferData.details.order = this.details.order + 0.5;
    } else if (transferData.details.date < this.details.date) {
      transferData.details.date = this.details.date;
      transferData.details.order = this.details.order - 0.5;
    } else if (transferData.details.order > this.details.order) {
      transferData.details.order = this.details.order - 0.5;
    } else {
      transferData.details.order = this.details.order + 0.5;
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
    this.details.order -= 1.5;
    this.$store.commit("normalizeOrder");
    this.isHovered = false;
    this.$nextTick(() => {
      (this.$refs.description as HTMLElement).focus();
    });
  }
  private onShiftArrowDown() {
    this.details.order += 1.5;
    this.$store.commit("normalizeOrder");
    this.isHovered = false;
    this.$nextTick(() => {
      (this.$refs.description as HTMLElement).focus();
    });
  }
}
</script>