<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import photo from "~/routes/photos/api";
import Cookies from "js-cookie";
import { userStore } from "./pinia/auth";
import { galleryStore } from "./pinia/photos";

export default {
  name: "App",
  async beforeCreate() {
    const store = userStore();
    const photosStore = galleryStore();

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

    try {
      const response = await photo().get();
      photosStore.gallery = await response.json();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
