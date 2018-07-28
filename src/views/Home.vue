<template>
  <div class="app">
    <DayOrganizer v-for="dateModifier in 3" :dateModifier=" dateModifier - 1 " :key="dateModifier"></DayOrganizer>
  </div>
</template>

<style lang="less" scoped>
.app {
  display: flex;
  flex-direction: column;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";

import DayOrganizer from "@/components/DayOrganizer.vue";

@Component({ components: { DayOrganizer } })
export default class Organizer extends Vue {}
</script>
