<template>
  <div class="task">
    <textarea
      v-model="details.description" 
      placeholder="Describe your new task." 
      class="description" 
      :disabled="details.done" 
      ref="description"
      rows="1"
    ></textarea>
    <input type="checkbox" class="checkbox" v-model="details.done">
  </div>
        <!-- ref="description" @input="updateResizeHeight" style="{height: resizeHeight}" -->

</template>

<style lang="less" scoped>
.task {
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  font-size: 16px;

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
      border-color: #ccc;
    }

    &:disabled {
      background-color: transparent;
      color: #709079;
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

  @Watch("plan.description")
  private onDescriptionChanged() {
    const descriptionElement = this.$refs.description as HTMLElement;
    descriptionElement.style.height = "auto"; // behavioral fix
    descriptionElement.style.height = descriptionElement.scrollHeight - 10 + "px";
  }

  private mounted() {
    this.onDescriptionChanged();
  }

  private updated() {
    this.$store.commit("updateTask", this.details);
  }
}
</script>