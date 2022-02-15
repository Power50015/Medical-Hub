import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/doctor-register",
    component: () => import("../views/DoctorRegister.vue"),
  },
  {
    path: "/doctor-login",
    component: () => import("../views/DoctorLogin.vue"),
  },
  {
    path: "/insurance-register",
    component: () => import("../views/InsuranceRegister.vue"),
  },
  {
    path: "/insurance-login",
    component: () => import("../views/InsuranceLogin.vue"),
  },
  {
    path: "/laboratory-register",
    component: () => import("../views/LaboratoryRegister.vue"),
  },
  {
    path: "/laboratory-login",
    component: () => import("../views/LaboratoryLogin.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
