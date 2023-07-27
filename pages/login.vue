<template>
  <div>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="log_email">Username:</label>
        <input
          id="log_email"
          v-model="log_email"
          type="text"
          required
        >
        <br>
        <label for="log_password">Password:</label>
        <input
          id="log_password"
          v-model="log_password"
          type="password"
          required
        >
        <br>
        <button type="submit">
          Login
        </button>
      </form>
      <p
        v-if="loginInfo"
        class="error-message"
      >
        {{ loginInfo }}
      </p>
    </div>
    <div>
      <h2>Register new user</h2>
      <form @submit.prevent="register">
        <label for="reg_email">Email:</label>
        <input
          id="reg_email"
          v-model="reg_email"
          type="text"
          required
        >
        <br>
        <label for="reg_password">Password:</label>
        <input
          id="reg_password"
          v-model="reg_password"
          type="password"
          required
        >
        <br>
        <button type="submit">
          Register
        </button>
      </form>
      <p
        v-if="regInfo"
        class="error-message"
      >
        {{ regInfo }}
      </p>
    </div>
  </div>
  <div @click="logout">
    LOGOUT
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
    };
  },
  mounted() {
    console.log(this.$pinia, "asdsdad");
  },
  methods: {
    async login() {
      try {
        const response = await main().login(this.log_email, this.log_password);
        console.log({ response: await response.json() });
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
          throw new Error("Failed to register");
        } else {
          console.log("Successfully registered");
          const basket = userStore();
          basket.user = null;
          basket.auth = false;
          this.regInfo = "Logged out!";
        }
      } catch (err) {
        this.regInfo = "Failed to logout";
        console.log("Failed to register", err);
      }
    },
  },
};
</script>
