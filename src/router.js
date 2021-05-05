import Vue from "vue";
import VueRouter from "vue-router";
import List from "./components/page/List";
import Add from "./components/page/Add";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: List,
  },
  {
    path: "/add",
    component: Add,
  },
];

export const router = new VueRouter({
  mode: "history",
  routes,
});
