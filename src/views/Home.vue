<template>
  <div class="home">
    <Organizer></Organizer>
  </div>
</template>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";

import Organizer from "@/components/Organizer.vue";

@Component({ components: { Organizer } })
export default class Home extends Vue {}
</script>
