<template>
  <div class="tile is-parent">
    <article class="tile is-child notification is-success">
      <div class="content">
        <p class="title">تسجيل دخول شركه تأمين</p>
        <div class="buttons">
          <router-link class="button is-primary" to="/insurance-register"
            >حساب جديد</router-link
          >
          <router-link class="button is-link" to="/insurance-login">تسجيل دخول</router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
article {
  background: url(../../assets/images/insuranceBanar.jpg);
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
