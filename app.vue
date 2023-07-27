<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { onBeforeMount } from "vue";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { userStore } from "./pinia/auth";

export default {
  name: "App",
  setup() {
    const store = userStore();
    onBeforeMount(() => {
      const token = Cookies.get("jwt");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userData = decodedToken;
          store.user = userData.email;
          store.auth = true;
        } catch (error) {
          console.error("Failed to decode the token", error);
        }
      }
    });

    return { store };
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
