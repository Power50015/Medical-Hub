<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="../assets/logo.png" width="100" />
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" v-if="$store.state.isLogin"> صفحات </a>
          <div class="navbar-dropdown">
            <router-link
              class="navbar-item"
              to="/"
              v-if="$store.state.userType == 'doctors'"
            >
              نتائج التحاليل
            </router-link>
            <router-link
              class="navbar-item"
              to="/"
              v-if="$store.state.userType == 'insurances'"
            >
              طلبات التحليل
            </router-link>
            <router-link
              class="navbar-item"
              to="/"
              v-if="$store.state.userType == 'insurances'"
            >
              طلبات العيادات
            </router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons" v-show="$store.state.isLogin">
            <button
              class="button is-light"
              @click="$store.dispatch('userLogout')"
            >
              تسجيل خروج
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.navbar {
  background: none;
  display: flex;
  justify-content: space-between;
}
.navbar-menu {
  display: flex;
  background: none;
  box-shadow: none;
}
</style>
