<template>
  <section class="hero is-fullheight is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-4-widescreen">
            <form class="box" @submit.prevent="saveDoctor">
              <p class="label has-text-centered is-size-5">
                تسجيل حساب جديد كطبيب
              </p>
              <p class="has-text-centered is-size-6 has-text-danger"></p>
              <br />
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    type="text"
                    placeholder="أسم المستخدم"
                    class="input"
                    required
                    v-model="form.name"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    type="text"
                    placeholder="البريد الإلكترونى"
                    class="input"
                    required
                    v-model="form.email"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="كلمه المرور"
                    class="input"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>
              <div class="field">
                <button type="submit" class="button is-primary is-fullwidth">
                  تسجيل جديد
                </button>
              </div>
              <br />
              <p class="has-text-centered">
                <router-link class="label has-text-link" to="doctor-login">
                  لدى حساب بالفعل
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
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const form = reactive({ name: "", email: "", password: "" });
    function saveDoctor() {
      store.dispatch("userRegister", { type: "doctors", form }).then(() => {
        setInterval(() => {
          form.name = "";
          form.email = "";
          form.password = "";
          router.push("/");
        }, 1000);
      });
    }
    return { form, saveDoctor };
  },
};
</script>

<style></style>
