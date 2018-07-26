<template>
  <div class="app">
    <DayOrganizer v-for="(day_planner, index) in planner" :dayPlanner="day_planner.plans" :key="index"></DayOrganizer>
  </div>
</template>

<style lang="less" scoped>
.app {
  display: flex;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";

import { DayPlanner } from "@/types"

import DayOrganizer from "@/components/DayOrganizer.vue";

@Component({ components: { DayOrganizer } })
export default class Organizer extends Vue {
  @State('day_planners') planner!: DayPlanner[];
}
</script>
