<template>
  <section class="day">
    <header>Today</header>
    <main>
      <Task v-for="(plan, index) in dayPlanner" :plan="plan" :key="index"></Task>
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
  font-size: 25px;
  font-weight: 600;
  background-color: #009086;
  color: white;
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

import { Plan } from "@/types";

import Task from "@/components/Task.vue";

@Component({ components: { Task } })
export default class DayOrganizer extends Vue {
  @Prop() private dayPlanner!: Plan[];
}
</script>


