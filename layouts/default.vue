<template>
  <div>
    <div>
      <Navbar class="right-0" />
      <slot />
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
};
</script>

<style>
</style>
