<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="../assets/logo.png" width="100" />
      </router-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons" v-show="$store.state.isLogin">
            <a class="button is-light" @click="$store.dispatch('userLogout')"> تسجيل خروج </a>
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
