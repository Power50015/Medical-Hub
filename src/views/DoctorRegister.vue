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
                    type="email"
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
                    type="text"
                    placeholder="العنوان"
                    class="input"
                    required
                    v-model="form.address"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <select v-model="form.prof" class="input" required>
                    <option value="باطنه">باطنه</option>
                    <option value="عظام">عظام</option>
                    <option value="جراحه">جراحه</option>
                    <option value="رمد">رمد</option>
                  </select>
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
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const form = reactive({
      name: "",
      email: "",
      password: "",
      address: "",
      prof: "باطنه",
    });
    const isDisabled = ref(false);
    function saveDoctor() {
      isDisabled.value = true;
      store.dispatch("userRegister", { type: "doctors", form }).then(() => {
        setTimeout(() => {
          form.name = "";
          form.email = "";
          form.password = "";
          form.address = "";
          form.prof = "";
          router.push('/');
        }, 3000);
      });
    }
    return { form, saveDoctor, isDisabled };
  },
};
</script>

<style></style>
