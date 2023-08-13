<template>
  <div
    class="navbar_wrapper"
  >
    <div>
      <h1 class="title">
        <Icon name="uil:camera" />
        KamileTography
      </h1>
      <div
        v-if="user"
        class="text-xs text-white"
      >
        <Icon name="uil:user" />
        {{ user }}
      </div>
    </div>
    <div class="flex gap-3">
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
              class="flex justify-center items-center gap-0.5"
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
  </div>
</template>
    
<script lang="ts">
import { defineComponent } from "vue";    
import "../styles/main.css";
import { userStore } from "../pinia/auth";

// import HomeIcon from "../icons/Home.vue";
export default defineComponent({
  data() {
    return {
      tabs: [{ name: "Home", page: "/" }, { name: "Photos", page: "/photos" }, { name: "Contact", page: "/contact" }],
      user: null as string | null,
    };
  },
  mounted() {
    const basket = userStore();
    this.user = basket.user;
  },
});
</script>
  
