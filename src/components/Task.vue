<template>
  <div class="task" :class="!details.done && details.description !== '' ? 'active' : '' ">
    <textarea
      v-model.lazy="details.description" 
      placeholder="Describe your new task." 
      class="description"
      :disabled="details.done" 
      ref="description"
      rows="1"
      @input="onDescriptionChanged()"
    ></textarea>
    <input type="checkbox" class="checkbox" v-model="details.done" v-show="details.description !== ''">
  </div>
</template>

<style lang="less" scoped>
.task {
  display: flex;
  flex-direction: row;
  padding: 2px 10px 2px 6px;
  margin: 2px 0;
  font-size: 16px;
  border-left: 4px solid transparent;

  &.active {
    border-color: #006fc0;
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

@Component
export default class Task extends Vue {
  @Prop() private details!: TaskData;

  @Watch("details.description")
  private onDescriptionChanged() {
    const descriptionElement = this.$refs.description as HTMLElement;
    descriptionElement.style.height = "auto"; // behavioral fix
    descriptionElement.style.height = descriptionElement.scrollHeight - 10 + "px";
  }

  private mounted() {
    this.onDescriptionChanged();
    if (this.details.id === undefined) {
      (this.$refs.description as HTMLElement).focus();
    }
  }

  private updated() {
    this.$store.commit("updateTask", this.details);
  }
}
</script>