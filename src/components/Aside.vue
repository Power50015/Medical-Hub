<template>
  <aside v-show="asideShow">
    <div class="logo">
      <img src="../assets/logo.png" />
    </div>
    <ul>
      <li>
        <router-link
          to="/profile"
          v-if="$store.state.userType == 'doctors'"
          class="link"
        >
          <img
            src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1646991162~hmac=7c4f43efb0f55f7ebc2b8497e4af18b2"
            width="25"
          />
          الصفحه الشخصيه</router-link
        >
      </li>
      <li>
        <router-link
          to="/"
          v-if="$store.state.userType == 'doctors'"
          class="link"
        >
          <img
            src="https://cdn-icons.flaticon.com/png/512/3369/premium/3369157.png?token=exp=1646991823~hmac=3bce3b400ae97df5bcdf9eb4c05db174"
            width="25"
          />
          حجوزات المرضى</router-link
        >
      </li>
      <li>
        <router-link
          to="/testResults"
          v-if="$store.state.userType == 'doctors'"
          class="link"
        >
          <img
            src="https://cdn-icons.flaticon.com/png/512/2196/premium/2196227.png?token=exp=1646991118~hmac=829dd0f1f7ae8d8ed3a66b350ee7c937"
            width="25"
          />
          نتائج التحاليل
        </router-link>
      </li>
      <li>
        <router-link
          to="/laboratoryinsuranceresrvations"
          v-if="$store.state.userType == 'insurances'"
          class="link"
        >
          <img
            src="../assets/2436779.png"
            width="25"
          />
          طلبات التحليل
        </router-link>
      </li>
      <li>
        <router-link
          to="/"
          v-if="$store.state.userType == 'insurances'"
          class="link"
        >
          <img
            src="../assets/1988856.png"
            width="25"
          />
          طلبات العيادات
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { inject } from "@vue/runtime-core";

const asideShow = inject("aside");
</script>

<style scoped>
aside {
  width: 260px;
  background: #fff;
  height: 100vh;
}
.logo {
  background-color: #7d36c4;
  height: 75px;
  padding: 10px;
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
  background-color: #7d36c4;
  color: #fff;
  transition: all 0.3s;
}
.link img {
  margin: 0px 0px 0px 20px;
}
</style>
