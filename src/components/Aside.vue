<template>
  <aside v-show="asideShow">
    <div class="logo">
      <img src="../assets/logo.png" />
    </div>
    <ul>
      <li>
        <router-link to="/" v-if="auth.isLogin" class="link">
          <img :src="auth.userImg" width="90" />
          {{ auth.userName }}</router-link
        >
      </li>
      <li>
        <router-link to="/doctor" v-if="auth.userType == 'doctors'" class="link">
          <img src="../assets/1988856.png" width="25" />
          حجوزات المرضى</router-link
        >
      </li>
      <li>
        <router-link
          to="/laboratory"
          v-if="auth.userType == 'doctors'"
          class="link"
        >
          <img src="../assets/4068568.png" width="25" />
          نتائج التحاليل
        </router-link>
      </li>
      <li>
        <router-link
          to="/laboratory"
          v-if="auth.userType == 'insurance'"
          class="link"
        >
          <img src="../assets/2436779.png" width="25" />
          طلبات التحليل
        </router-link>
      </li>
      <li>
        <router-link
          to="/laboratory"
          v-if="auth.userType == 'laboratory'"
          class="link"
        >
          <img src="../assets/2436779.png" width="25" />
          التحليل
        </router-link>
      </li>
      <li>
        <router-link to="/doctor" v-if="auth.userType == 'insurance'" class="link">
          <img src="../assets/1988856.png" width="25" />
          طلبات العيادات
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { inject } from "@vue/runtime-core";

const auth = useAuthStore();
const asideShow = inject("aside");
</script>

<style scoped>
@media (max-width: 1250px) {
  aside {
    display: none !important;
  }
}
aside {
  width: 260px;
  background: #fff;
  height: 100vh;
  display: block;
}
.logo {
  /* height: 75px; */
  padding: 10px;
  width: 235px;
}
.logo img {
  width: 100%;
  height: 100%;
}
ul {
  margin: 100px 15px 15px;
}
.link {
  background: #eee;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  color: #020202;
  font-weight: bold;
  margin: 50px 0px;
  transition: all 0.3s;
}
.link:hover {
  color: #fff;
}
.link img {
  margin: 0px 0px 0px 20px;
}
</style>
