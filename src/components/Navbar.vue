<template>
  <nav class="is-flex is-justify-content-space-between py-4 px-3">
    <div class="navbar-item">
      <div class="buttons" v-show="$store.state.isLogin">
        <button class="menu-button" @click="$emit('asideEvent')">
          <img
            src="https://www.projectscreen.co.uk/assets/burger_black.png"
            width="25"
          />
        </button>
      </div>
    </div>
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
    <div class="navbar-item">
      <div class="buttons" v-show="$store.state.isLogin">
        <button
          class="button is-primary"
          @click="$store.dispatch('userLogout')"
        >
          تسجيل خروج
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
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
