<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import "/static/assets/normalize.css";
@import "globals.less";

body {
  background-color: #e5e5e5;
  margin: 0;
  .ui-font();
}

h1,
h2,
h3,
h4,
h5,
h6,
header {
  font-family: "Zilla Slab", Helvetica, sans-serif;
  letter-spacing: 0.05em;
}
</style>
