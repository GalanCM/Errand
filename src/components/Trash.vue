<template>
  <transition name="pop-out">
    <article class="trash-wrapper">
        <button class="trash" @click.prevent="trashTask">
          <img class="icon" src="/trash.svg">
        </button>
    </article>
  </transition>
</template>

<style lang="less" scoped>
.trash-wrapper {
  position: relative;
  right: -10px;
  transform: translateX(100%);
  border-radius: 0 6px 6px 0;
  width: 0; //remove from document flow
  overflow: visible; // "
  clip-path: polygon(0 0, 45px 0, 45px 100%, 0 100%);

  &::before {
    // restore background
    position: absolute;
    width: 10px;
    height: 100%;
    content: "";
    background-color: #222;
  }
}

.trash {
  display: flex;
  padding: 0;
  margin-left: 10px;
  border: none;
  border-radius: inherit;
  background-color: black;
  cursor: pointer;

  &:hover {
    background-color: #a00;
  }
}

img {
  height: 19px;
  padding: 7px 7px;
}

// TRANSITIONS
.pop-out-enter-active {
  transition: 200ms clip-path ease-out 200ms;
}
.pop-out-enter,
.pop-out-leave-to {
  clip-path: polygon(0 0, 10px 0, 10px 100%, 0 100%);
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { TaskData } from "@/types";

@Component({ props: ["task"] })
export default class Trash extends Vue {
  private trashTask() {
    this.$store.commit("removeTask", this.$props.task);
  }
}
</script>
