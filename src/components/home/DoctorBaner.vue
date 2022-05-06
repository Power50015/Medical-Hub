<template>
  <article class="tile is-child">
    <div class="content">
      <p class="title">تسجيل دخول لطبيب</p>
      <div class="buttons">
        <RouterLink class="button is-primary" to="/doctor-register">حساب جديد</RouterLink>
        <RouterLink class="button is-link" to="/doctor-login">تسجيل دخول</RouterLink>
      </div>
    </div>
  </article>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<style scoped>
article {
  background: url(../../assets/images/doctorbanar.jpg);
  background-size: cover;
  display: flex;
  flex-direction: column-reverse;
  min-height: 315px;
}
.content {
  background: #5653538c;
  padding: 22px;
}
.title {
  color: #fff !important;
}
</style>
