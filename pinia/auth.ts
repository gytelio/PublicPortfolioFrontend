import { defineStore } from "pinia";

export const userStore = defineStore("auth", {
  state: () => ({ 
    user: null as string | null,
    auth: false, 
  }),
});
