<template>
  <article class="tile is-child">
    <div class="content">
      <p class="title">تسجيل دخول معمل تحايل</p>
      <div class="buttons">
        <router-link class="button is-primary" to="/laboratory-register">حساب جديد</router-link>
        <router-link class="button is-link" to="/laboratory-login">تسجيل دخول</router-link>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  background: url(../../assets/images/laboratoryBanar.jpg);
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
