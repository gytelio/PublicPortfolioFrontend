<template>
  <div
    class="navbar_wrapper"
  >
    <div
      v-for="tab,index of tabs"
      id="navbar"
      :key="index"
    >
      <button>
        <NuxtLink
          :to="tab.page"
          class="link"
          :class="{ active: $route.name != 'index' ? $route.path == tab.page : tab.page == '/' }"
        > 
          <div
            class="d-flex justify-content-start align-items-center flex-row"
          >
            {{ tab.name }}
            <Icon
              v-if="tab.page == '/'"
              name="uil:home-alt"
            />
            <Icon
              v-if="tab.page == '/photos'"
              name="uil:camera"
            />
            <Icon
              v-if="tab.page == '/contact'"
              name="uil:phone"
            />
          </div>
        </NuxtLink>
      </button>
    </div>
  </div>
</template>
    
<script lang="ts">
import { defineComponent } from "vue";    
import "../styles/main.css";
// import HomeIcon from "../icons/Home.vue";
export default defineComponent({
  data() {
    return {
      tabs: [{ name: "Home", page: "/" }, { name: "Photos", page: "/photos" }, { name: "Contact", page: "/contact" }],
    };
  },
});
</script>
  
