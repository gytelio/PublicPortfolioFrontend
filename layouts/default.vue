<template>
  <div>
    <div>
      <Navbar class="right-0 mr-5" />
      <div :style="{ marginLeft: `${40}%` }">
        <slot />
      </div>
    </div>
    <div>
      <side-component
        class="side_component"
        :style="{ width: `${40}%` }"
        :class="{show: showSide}"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSide: true,
    };
  },
  mounted() {
    // Add event listener to the window scroll event
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    // Remove the event listener when the component is destroyed to avoid memory leaks
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    toggleSide(show) {
      this.showSide = show;
    },
    closeSide() {
      this.showSide = false;
    },
    handleScroll() {
      // Log the scrollTop value to the console
    },
  },
};
</script>

<style>
.open_component {
  position: absolute;
}
</style>
