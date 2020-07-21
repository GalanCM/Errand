<template>
  <div class="home">
    <div class="color-bar"></div>
    <div class="logo">
      <img src="/logo.svg" />
    </div>
    <Organizer></Organizer>
    <div class="links">
      <router-link to="about">About</router-link>
      <router-link to="sign-in">Sign In</router-link>
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
  background-color: #494959;

  @media screen and (max-width: 800px) {
    grid-column: ~"1 / 3";
    grid-row: ~"1 / 2";
  }
}
.home {
  display: grid;
  grid-template-columns:
    minmax(200px, 1fr)
    minmax(400px, 2fr)
    minmax(140px, 1fr);

  @media screen and (max-width: 800px) {
    grid-template-columns: auto min-content;
    grid-template-rows: repeat(3, min-content);
  }
}

.logo {
  margin: 0 auto;
  height: 49px;
  background-color: rgba(255, 255, 255, 0.4);
}

.links {
  display: flex;
  height: 50px;
  margin-left: auto;
  background-color: #009086;

  a {
    margin: auto 20px;
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
