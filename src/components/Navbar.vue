<template>
  <nav class="is-flex is-justify-content-space-between py-4 px-3">
    <div class="navbar-item">
      <div class="buttons" v-show="auth.isLogin">
        <button class="menu-button" @click="$emit('asideEvent')">
          <img
            src="https://www.projectscreen.co.uk/assets/burger_black.png"
            width="25"
          />
        </button>
      </div>
    </div>
    <div class="navbar-brand">
      <router-link to="/">
        <img src="../assets/logo.png" width="100" />
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        v-if="auth.isLogin"
        @click="nav = !nav"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" v-if="nav">
      <div class="navbar-start">
        <router-link to="/profile" class="navbar-item" v-if="auth.isLogin">
          <img src="../assets/user.png" width="25" />
          الصفحه الشخصيه
        </router-link>

        <router-link
          to="/"
          v-if="auth.userType == 'doctors'"
          class="navbar-item"
        >
          <img src="../assets/1988856.png" width="25" />
          حجوزات المرضى
        </router-link>
        <router-link
          to="/testResults"
          v-if="auth.userType == 'doctors'"
          class="navbar-item"
        >
          <img src="../assets/4068568.png" width="25" />
          نتائج التحاليل
        </router-link>
        <router-link
          to="/laboratoryinsuranceresrvations"
          v-if="auth.userType == 'insurances'"
          class="link"
        >
          <img src="../assets/2436779.png" width="25" />
          طلبات التحليل
        </router-link>
        <router-link to="/" v-if="auth.userType == 'insurances'" class="link">
          <img src="../assets/1988856.png" width="25" />
          طلبات العيادات
        </router-link>
      </div>
    </div>
    <div class="navbar-item">
      <div class="buttons" v-show="auth.isLogin">
        <button class="button is-primary" @click="logout">تسجيل خروج</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const nav = ref(false);
function logout() {
  auth.logout();
  router.push("/");
}
</script>

<style scoped>
@media (max-width: 1023px) {
  .navbar-menu {
    display: block !important;
  }
}

.navbar-menu {
  display: none;
  position: absolute;
  z-index: 999;
  right: 0;
  left: 0;
  top: 66px;
}

nav {
  background-color: #fff;
  width: 100%;
  height: 75px;
}

.menu-button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}
</style>
