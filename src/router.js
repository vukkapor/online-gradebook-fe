import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import HomePage from "./components/HomePage.vue";
import AllProfessors from "./components/AllProfessors.vue";
import SingleProfessor from "./components/SingleProfessor.vue";
import CreateGradebook from "./components/CreateGradebook.vue";
import CreateProfessor from "./components/CreateProfessor.vue";
import SingleGradebook from "./components/SingleGradebook.vue";
import { authService } from "./services/AuthService";

const routes = [
  {
    path: "/login",
    component: Login,
    name: "login"
  },
  {
    path: "/register",
    component: Register,
    name: "register"
  },
  {
    path: "/",
    component: HomePage,
    name: "homepage"
  },
  {
    path: "/teachers",
    component: AllProfessors,
    name: "allProfessors"
  },
  {
    path: "/teachers/:id",
    component: SingleProfessor,
    name: "singleProfessor"
  },
  {
    path: "/gradebook/create",
    component: CreateGradebook,
    name: "createGradebook"
  },
  {
    path: "/professors/create",
    component: CreateProfessor,
    name: "createProfessor"
  },
  {
    path: "/gradebooks/:id",
    component: SingleGradebook,
    name: "singleGradebook"
  },
  {
    path: "/gradebooks/:id/edit",
    component: CreateGradebook
  },
  {
    path: "/my-gradebook",
    component: SingleGradebook,
    name: "my-gradebook"
  }
];

export const router = new VueRouter({
  routes: routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if (
    to.name !== "login" &&
    to.name !== "gradebooks" &&
    to.name !== "register" &&
    !authService.isAuthenticated()
  ) {
    return router.push({ name: "login" });
  } else if (
    (to.name === "login" || to.name === "register") &&
    authService.isAuthenticated()
  ) {
    return router.push({ name: from.name });
  }

  next();
});
