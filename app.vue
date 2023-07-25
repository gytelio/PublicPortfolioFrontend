<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { createPinia } from "pinia";
const pinia = createPinia();

export default {
  name: "App",
  async beforeCreate() {
    this.$pinia = pinia;
  },
};
</script>

<style>
#app {
  text-align: center;
}

h1 {
  color: #2b4137;
}
</style>
