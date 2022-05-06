<template>
  <section class="hero is-fullheight is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-12-tablet is-8-desktop is-8-widescreen">
            <form @submit.prevent="loginUser" class="box">
              <p class="label has-text-centered is-size-5">
                تسجيل الدخول كشركه تأمين
              </p>
              <p class="has-text-centered is-size-6 has-text-danger"></p>
              <br />
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    type="text"
                    placeholder="البريد الإلكترونى"
                    class="input"
                    v-model="form.email"
                    required
                  />
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="كلمه المرور"
                    v-model="form.password"
                    class="input"
                    required
                  />
                </div>
              </div>
              <div class="field">
                <progress
                  class="progress is-small is-primary"
                  max="100"
                  v-show="isDisabled"
                >
                  15%
                </progress>
                <button
                  type="submit"
                  class="button is-primary is-fullwidth"
                  v-show="!isDisabled"
                >
                  تسجيل
                </button>
              </div>
              <br />
              <p class="has-text-centered">
                <router-link
                  class="label has-text-primary"
                  to="insurance-register"
                >
                  عمل حساب شركه تأمين جديد
                </router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();
const form = reactive({
  email: "ert@ert.com",
  password: "ert@ert.com",
  type: "insurance",
});

const isDisabled = ref(false);
function loginUser() {
  auth.loginUser(form);
  isDisabled.value = true;
  router.push("/");
}
</script>

<style></style>
