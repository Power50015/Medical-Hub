import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    name: "Home",
    beforeEnter: (to, from) => {
      if (store.state.isLogin === true) {
        return router.push({ name: "Dashbord" });
      }
      const red = setInterval(() => {
        if (store.state.isLogin === true) {//
          clearInterval(red);
          return router.push({ name: "Dashbord" });
        }
      }, 300);
      return true;
    },
  },
  {
    path: "/doctor-register",
    component: () => import("../views/DoctorRegister.vue"),
    beforeEnter: (to, from) => {
      const red = setInterval(() => {
        if (store.state.isLogin === true) {
          clearInterval(red);
          return router.push({ name: "Dashbord" });
        }
      }, 300);
      return true;
    },
  },
  {
    path: "/doctor-login",
    component: () => import("../views/DoctorLogin.vue"),
    beforeEnter: (to, from) => {
      const red = setInterval(() => {
        if (store.state.isLogin === true) {
          clearInterval(red);
          return router.push({ name: "Dashbord" });
        }
      }, 300);
      return true;
    },
  },
  {
    path: "/insurance-register",
    component: () => import("../views/InsuranceRegister.vue"),
    beforeEnter: (to, from) => {
      const red = setInterval(() => {
        if (store.state.isLogin === true) {
          clearInterval(red);
          return router.push({ name: "Dashbord" });
        }
      }, 300);
      return true;
    },
  },
  {
    path: "/insurance-login",
    component: () => import("../views/InsuranceLogin.vue"),
    beforeEnter: (to, from) => {
      const red = setInterval(() => {
        if (store.state.isLogin === true) {
          clearInterval(red);
          return router.push({ name: "Dashbord" });
        }
      }, 300);
      return true;
    },
  },
  {
    path: "/laboratory-register",
    component: () => import("../views/LaboratoryRegister.vue"),
    beforeEnter: (to, from) => {
      const red = setInterval(() => {
        if (store.state.isLogin === true) {
          clearInterval(red);
          return router.push({ name: "Dashbord" });
        }
      }, 300);
      return true;
    },
  },
  {
    path: "/laboratory-login",
    component: () => import("../views/LaboratoryLogin.vue"),
    beforeEnter: (to, from) => {
      const red = setInterval(() => {
        if (store.state.isLogin === true) {
          clearInterval(red);
          return router.push({ name: "Dashbord" });
        }
      }, 300);
      return true;
    },
  },
  {
    path: "/dashbord",
    name: "Dashbord",
    component: () => import("../views/Dashbord.vue"),
    beforeEnter: (to, from) => {
      const red = setInterval(() => {
        if (store.state.isLogin === false) {
          clearInterval(red);
          return router.push({ name: "Home" });
        }
      }, 300);
      return true;
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    beforeEnter: (to, from) => {
      const red = setInterval(() => {
        if (store.state.isLogin === false) {
          clearInterval(red);
          return router.push({ name: "Home" });
        }
      }, 300);
      return true;
    },
  },
  {
    path: "/laboratoryinsuranceresrvations",
    name: "LaboratoryInsuranceResrvations",
    component: () => import("../views/LaboratoryInsuranceResrvations.vue"),
    beforeEnter: (to, from) => {
      const red = setInterval(() => {
        if (store.state.isLogin === false) {
          clearInterval(red);
          return router.push({ name: "Home" });
        }
      }, 300);
      return true;
    },
    
  },
  {
    path: "/testResults",
    name: "TestResults",
    component: () => import("../views/TestResults.vue"),
    beforeEnter: (to, from) => {
      const red = setInterval(() => {
        if (store.state.isLogin === false) {
          clearInterval(red);
          return router.push({ name: "Home" });
        }
      }, 300);
      return true;
    },
    
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
