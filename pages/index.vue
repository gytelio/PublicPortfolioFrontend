<template>
  <div>
    <NuxtLayout>
      <div
        ref="container"
        class="block_container"
        @scroll="handleContainerScroll"
      >
        <div class="d-flex flex-column snap_wrapper">
          <Home
            ref="home"
            class="h-screen block"
            style="background: rgb(0, 0, 0);"
            data-route="/"
          />
          <Photos
            ref="photos"
            class="h-screen block"
            style="background: rgb(53, 53, 53);"
            data-route="/photos"
          />
          <Contact
            ref="contact"
            class="h-screen block"
            style="background: rgb(105, 105, 105);"
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

export default defineComponent({
  data() {
    return {
      tabs: [
        { name: "Home", page: "/" },
        { name: "Photos", page: "/photos" },
        { name: "Contact", page: "/contact" },
      ],
      isHomeVisible: true,
    };
  },
  methods: {
    handleContainerScroll(_event: Event) {
      setTimeout(() => {
        const container = this.$refs.container as HTMLElement;
        const scrollTop = container.scrollTop;
        this.isHomeVisible = scrollTop <= 10;
      }, 300);
    },
  },
});
</script>
