<template>
  <div class="main_wrapper">
    <NuxtLayout>
      <div class="block_container">
        <div class="d-flex flex-column snap_wrapper">
          <Home
            ref="home"
            class="h-screen block"
            style="background: rgb(71, 64, 72);"
            data-route="/"
          />
          <Photos
            ref="photos"
            class="h-screen block"
            style="background: rgb(36, 37, 54);"
            data-route="/photos"
          />
          <Contact
            ref="contact"
            class="h-screen block"
            style="background: rgb(71, 49, 39);"
            data-route="/contact"
          />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../styles/main.css";
// import HomeIcon from "../icons/Home.vue";
export default defineComponent({
  data() {
    return {
      tabs: [
        { name: "Home", page: "/" },
        { name: "Photos", page: "/photos" },
        { name: "Contact", page: "/contact" },
      ],
    };
  },

  mounted() {

  },

  methods: {
  
  },
});
</script>

<style>
  #app {
    text-align: center;
  }

  h1 {
    color: #2b4137;
  }
</style>
