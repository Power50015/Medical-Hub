<template>
  <section class="hero is-fullheight is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-4-widescreen">
            <form @submit.prevent="loginInsurance" class="box">
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

<script>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const form = reactive({
      email: "",
      password: "",
    });
    const isDisabled = ref(false);
    function loginInsurance() {
      isDisabled.value = true;
      store.dispatch("userLogin", { type: "insurance", form }).then(() => {
        setTimeout(() => {
          form.email = "";
          form.password = "";
          router.push("/");
        }, 1500);
      });
    }
    return { form, loginInsurance, isDisabled };
  },
};
</script>

<style></style>
