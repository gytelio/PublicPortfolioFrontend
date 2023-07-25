import { createRouter, createWebHistory } from "vue-router";
import Test from "../components/Test.vue";

const routes = [
  {
    path: "/test",
    component: Test,
  },
  // Other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
