import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/Auth/Login.vue";
import DashboardView from "../views/Dashboard/Dashboard.vue";
import ProfileView from "../views/profile/profile.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    if (to.name === "login" && token) {
      next({ name: "home" });
    }
    next();
  }
});

export default router;
