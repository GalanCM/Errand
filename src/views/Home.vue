<template>
  <div class="home">
    <div class="color-bar"></div>
    <div class="left">
      <img src="/logo.svg">
    </div>
    <Organizer></Organizer>
    <div class="links">
      <router-link to="about">About</router-link>
      <a href="https://github.com/GalanCM/FuzzyPlanner">Repo</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
.color-bar {
  position: fixed;
  height: 50px;
  width: 100vw;
  z-index: -100;
  background-color: #009086;
}
.home {
  display: grid;
  grid-template-columns:
    minmax(200px, 1fr)
    minmax(400px, 2fr)
    minmax(140px, 1fr);
}

.left {
  height: 49px;
  width: 200px;
  background-color: rgba(255, 255, 255, 0.4);
}

.links {
  display: flex;
  height: 50px;

  a {
    margin: 17px auto;
    color: white;
    font-size: 18px;
    text-decoration: none;
  }
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
