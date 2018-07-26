<template>
  <div class="task">
    <div class="description">
      {{ plan.description }}
    </div>
    <input type="checkbox" class="checkbox" v-model="plan.done">
  </div>
</template>

<style lang="less" scoped>
.task {
  display: flex;
  flex-direction: row;
  padding: 10px;
  font-size: 16px;

  .description {
    flex-grow: 1;
  }
  .checkbox {
    vertical-align: middle;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

// import { Plan } from "@/types";

interface Plan {
  description: string;
  done: boolean;
}

@Component
export default class Task extends Vue {
    @Prop() plan!: Plan
}
</script>