<template>
  <div class="about-wrapper">
    <div class="about">
      <header>
        About
        <button @click="close">×</button>
      </header>
      <main>
        <p>
          Sadly, most of the web apps that I've written in the past are either locked away behind corporate ethernets, or defunct.
          To make up for this hole in my portfolio, and to prove my ability to write web applications to potential clients and employers, I built this simple organizer. 
          If you're interested in the code, <a href="https://github.com/GalanCM/FuzzyPlanner">it is available on Github</a>.
        </p>
        <p>
          I want to keep this tool simple, but elegant. The current version is a proof of concept, but can already handle five operations:
        </p>
        <ol>
          <li>Creating new tasks</li>
          <li>Editing task descriptions</li>
          <li>Marking tasks completed</li>
          <li>Reordering tasks</li>
          <li>Deleting tasks</li>
        </ol>
        <p>
          There is still work left for me to do, but the sooner I can show this to clients and employers, the better. The following tasks should be completed over the next couple weeks:
        </p>
        <ul>
          <li><strong>Local Saving.</strong> I've not yet implemented any form of saving. If you reload the page, you will lose all of your work. This is a priority.</li>
          <li><strong>User Testing.</strong> I have done very little user testing, and what little I have done has already suggested that I need to make some changes.</li>
          <li><strong>Better Keyboard Navigation.</strong> Currently, you can't really use the app without a mouse.</li>
          <li><strong>Accessibility & Compatibility Pass.</strong> I want to make sure this is usable for as many people as possible.</li>
          <li><strong>Server-side Saving.</strong> This is a lot more work than local saving, but I should probably flex my back-end skills.</li>
          <li><strong>Mobile Browser Support.</strong> I'd intended this to support mobile from the start, but implementing drag-and-drop on mobile is more complicated than desktop.</li>
        </ul>
        <p>
          Hopefully you like what you see. And whether you intend to hire me or not, I'd love to know what you think.
        </p>
      </main>
    </div>
  </div>
</template>

<style lang="less" scoped>
.about-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
}
.about {
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 20px auto;
  overflow: hidden;
  background-color: white;
  min-width: 320px;
}

header {
  display: flex;
  margin: 0;
  padding: 3px 0 3px 10px;
  border-bottom: 1px dashed white;
  background-color: #121;
  color: white;
  font-size: 26px;
  font-weight: 500;

  button {
    line-height: 0;
    height: 32px;
    width: 32px;
    margin: -3px 0 auto auto;
    border: none;
    background-color: transparent;
    color: rgba(255, 255, 255, 0.9);
    font-size: 30px;
    cursor: pointer;
  }
}

main {
  margin: 15px 15px;
  padding: 0 25px;
  height: 100%;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: scroll;

  p {
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    font-weight: 500;
  }
}
</style>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class About extends Vue {
  private close() {
    console.log("cl");
    this.$router.push("/");
  }
}
</script>
