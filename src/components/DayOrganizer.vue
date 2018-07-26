<template>
  <section class="day">
    <header>Today</header>
    <Task v-for="(plan, index) in dayPlanner" :plan="plan" :key="index"></Task>
  </section>
</template>

<style lang="less" scoped>
.day {
  min-width: 480px;
  width: 50%;
  margin: 20px auto;
  border: 1px solid black;
  padding: 0;
}
header {
  padding: 10px;
  font-size: 25px;
  font-weight: 600;
  background-color: #009086;
  color: white;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator"

import { Plan } from "@/types"

import Task from "@/components/Task.vue"

@Component({ components: { Task } })
export default class DayOrganizer extends Vue {
  @Prop() dayPlanner!: Plan[]
}
</script>


