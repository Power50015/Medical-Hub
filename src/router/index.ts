import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
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
    {
      path: "/laboratory",
      component: () => import("../views/LaboratoryResrvations.vue"),
    },
    {
      path: "/doctor",
      component: () => import("../views/DoctorResrvations.vue"),
    },
  ],
});

export default router;
