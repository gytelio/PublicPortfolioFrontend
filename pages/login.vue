<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md flex items-center justify-center gap-0.5">
      <div>
        <h2 class="text-xl font-semibold mb-4">
          Login
        </h2>
        <form @submit.prevent="login">
          <div class="mb-2">
            <label
              for="log_email"
              class="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              id="log_email"
              v-model="log_email"
              type="text"
              required
              class="mt-1 p-2 border rounded w-full"
            >
          </div>
          <div class="mb-4">
            <label
              for="log_password"
              class="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              id="log_password"
              v-model="log_password"
              type="password"
              required
              class="mt-1 p-2 border rounded w-full"
            >
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
        <p
          v-if="loginInfo"
          class="text-red-500 mt-2"
        >
          {{ loginInfo }}
        </p>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-4">
          Register new user
        </h2>
        <form @submit.prevent="register">
          <div class="mb-2">
            <label
              for="reg_email"
              class="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              id="reg_email"
              v-model="reg_email"
              type="text"
              required
              class="mt-1 p-2 border rounded w-full"
            >
          </div>
          <div class="mb-4">
            <label
              for="reg_password"
              class="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              id="reg_password"
              v-model="reg_password"
              type="password"
              required
              class="mt-1 p-2 border rounded w-full"
            >
          </div>
          <button
            type="submit"
            class="bg-green-500 text-white py-2 px-4 rounded"
          >
            Register
          </button>
        </form>
        <p
          v-if="regInfo"
          class="text-red-500 mt-2"
        >
          {{ regInfo }}
        </p>
      </div>
    </div>
    <div
      class="ml-4 cursor-pointer"
      @click="logout"
    >
      <div
        v-if="user"
      >
        <Icon name="uil:user" />
        {{ user }}
      </div>
      <button class="bg-red-500 text-white py-2 px-4 rounded">
        LOGOUT
      </button>
      <p
        v-if="logoutInfo"
        class="text-red-500 mt-2"
      >
        {{ logoutInfo }}
      </p>
    </div>
  </div>
</template>
  
<script lang="ts">
import main from "../routes/api";
import { userStore } from "../pinia/auth";
export default {
  data() {
    return {
      log_email: "",
      log_password: "",
      reg_email: "",
      reg_password: "",
      loginInfo: "",
      regInfo: "",
      logoutInfo: "",
      user: null as string | null,
    };
  },
  mounted() {
    const userBasket = userStore();
    this.user = userBasket.user;
  },
  methods: {
    async login() {
      try {
        const response = await main().login(this.log_email, this.log_password);
        if (response.status != 200) {
          throw new Error("Failed to login");
        } else {
          console.log("Successfully logged in");
          this.loginInfo = "Success!";
          const basket = userStore();
          basket.user = this.log_email;
          basket.auth = true;
          this.$router.push("/");
        }
      } catch (err) {
        this.loginInfo = "Bad credentials";
        console.log("Failed to login", err);
      }
    },
    async register() {
      try {
        const response = await main().register(this.reg_email, this.reg_password);
        if (response.status != 200) {
          throw new Error("Failed to register");
        } else {
          console.log("Successfully registered");
          this.regInfo = "Success!";
        }
      } catch (err) {
        this.regInfo = "Bad credentials";
        console.log("Failed to register", err);
      }
    },
    async logout() {
      try {
        const response = await main().logout();
        if (response.status != 200) {
          throw new Error("Failed to loggout");
        } else {
          console.log("Successfully logged out");
          const basket = userStore();
          basket.user = null;
          basket.auth = false;
          this.user = null;
          this.logoutInfo = "Logged out!";
        }
      } catch (err) {
        this.logoutInfo = "Failed to logout";
        console.log("Failed to loggout", err);
      }
    },
  },
};
</script>
