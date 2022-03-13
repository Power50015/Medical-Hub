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
                    placeholder="الأسم بالكامل"
                    class="input"
                    required
                    v-model="form.fullname"
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
                    placeholder="رقم الهاتف"
                    class="input"
                    required
                    v-model="form.phone"
                  />
                </div>
              </div>
              <div class="field">
                <h6>تاريخ الميلاد</h6>
                <div class="control has-icons-left">
                  <input
                    type="date"
                    class="input"
                    required
                    v-model="form.birthday"
                    min="1950-01-01"
                    max="2000-12-31"
                  />
                </div>
                <div>
                  <span>العمر : </span>
                  <span>{{ isNaN(age) ? "" : age + " سنه " }}</span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <select v-model="form.gender" class="input" required>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
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

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

const router = useRouter();
const store = useStore();
const form = reactive({
  name: "",
  fullname: "",
  email: "",
  phone: "",
  gender: "ذكر",
  password: "",
  address: "",
  birthday: "1990-01-01",
  prof: "باطنه",
});
const age = computed(() => {
  var today = new Date();
  var birthDate = new Date(form.birthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});
const isDisabled = ref(false);
function saveDoctor() {
  isDisabled.value = true;
  store.dispatch("userRegister", { type: "doctors", form }).then(() => {
    setTimeout(() => {
      form.name = "";
      form.fullname = "";
      form.email = "";
      form.phone = "";
      form.gender = "";
      form.password = "";
      form.address = "";
      form.birthday = "";
      form.prof = "";
      router.push("/");
    }, 3000);
  });
}
</script>

<style></style>
