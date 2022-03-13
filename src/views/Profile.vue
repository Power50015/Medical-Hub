<template>
  <div class="profile-section">
    <div class="card">
      <h1 class="m-4 title">البيانات الشخصيه</h1>
      <div class="card-content">
        <div class="media">
          <form class="media-content" @submit.prevent="updateUserData">
            <div class="field">
              <div class="control has-icons-left">
                <input
                  type="email"
                  placeholder="البريد الإلكترونى"
                  class="input"
                  required
                  disabled
                  :value="$store.state.userEmail"
                />
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  type="text"
                  placeholder="أسم المستخدم"
                  class="input"
                  required
                  v-model="name"
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
                  v-model="fullName"
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
                  v-model="userPhone"
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
                  v-model="birthday"
                  min="1950-01-01"
                  max="2000-12-31"
                />
              </div>
              <div>
                <span>العمر : </span>
                <span>{{ isNaN(age) ? "" : age + " سنه " }}</span>
              </div>
            </div>
            <div class="field" v-if="$store.state.userType == 'doctors'">
              <div class="control has-icons-left">
                <input
                  type="text"
                  placeholder="العنوان"
                  v-model="address"
                  class="input"
                  required
                />
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <select v-model="gender" class="input" required>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>
            </div>
            <div class="field" v-if="$store.state.userType == 'doctors'">
              <div class="control has-icons-left">
                <select class="input" required v-model="prof">
                  <option value="باطنه">باطنه</option>
                  <option value="عظام">عظام</option>
                  <option value="جراحه">جراحه</option>
                  <option value="رمد">رمد</option>
                </select>
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
                حفظ التعديل
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const name = ref(store.state.userName);
const fullName = ref(store.state.userFullName);
const userPhone = ref(store.state.userPhone);
const birthday = ref(store.state.userBirthday);
const gender = ref(store.state.userGender);
const address = ref(store.state.userAddress);
const prof = ref(store.state.userProf);

const age = computed(() => {
  var today = new Date();
  var birthDate = new Date(birthday.value);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});
const isDisabled = ref(false);
function updateUserData() {
  isDisabled.value = true;
  store
    .dispatch("updateUserData", {
      name: name.value,
      fullName: fullName.value,
      address: address.value,
      phone:userPhone.value,
      birthday:birthday.value,
      gender:gender.value,
      prof: prof.value,
    })
    .then(() => {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    });
}
</script>

<style scoped>
.profile-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
h1 {
  text-align: center;
}
.card {
  width: 500px;
}
</style>
