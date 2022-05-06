<template>
  <section class="hero is-fullheight is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-12-tablet is-8-desktop is-8-widescreen">
            <form class="box" @submit.prevent="addUser">
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
              <!-- Start image-->
              <div class="mb-3">
                <label for="formFile" class="form-label">الصورة الشخصيه</label>
                <template v-if="imgPreview">
                  <img
                    :src="imgPreview"
                    class="img-fluid"
                    height="300"
                    width="300"
                  />
                  <p class="mb-0">file name: {{ imgData.value.name }}</p>
                  <p class="mb-0">
                    size: {{ Math.round(imgData.value.size / 1024) }}KB
                  </p>
                </template>
                <div class="flex">
                  <h6 class="mb-3 text-white">
                    حاله رفع الصوره :
                    <span v-if="imgUpload == 100">أكتمل</span>
                  </h6>
                </div>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  accept="image/jpeg"
                  @change="DetectFiles($event.target.files)"
                />
              </div>
              <!-- End image-->
              <div class="field">
                <label for="map" class="label">رابط الخريطه</label>
                <div class="control has-icons-left">
                  <input
                    type="text"
                    class="input"
                    required
                    v-model="form.map"
                    id="map"
                  />
                </div>
              </div>
              <div class="field" v-if="form.map != ''">
                <iframe
                  :src="GoogleMapsURLToEmbedURL"
                  style="width: 100%"
                  allowfullscreen="fasle"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
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

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import app from "@/firebase";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();
const router = useRouter();
const auth = useAuthStore();
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
  map: "",
  img: "",
  type: "doctors",
});
const isDisabled = ref(false);
const imgData = reactive([]);
const imgPreview = ref("");
const imgUpload = ref(0);

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

function addUser() {
  isDisabled.value = false;
  const storageRef = refire(storage, `${imgData.value.name}`);
  const uploadTask = uploadBytesResumable(storageRef, imgData.value);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      imgUpload.value = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
        isDisabled.value = true;
        form.img = URL;
        auth.addUser(form);
        router.push("/");
      });
    }
  );
}

const GoogleMapsURLToEmbedURL = computed(() => {
  var coords = /\@([0-9\.\,\-a-zA-Z]*)/.exec(form.map);
  if (coords != null) {
    var coordsArray = coords[1].split(",");
    return (
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000!2d" +
      coordsArray[1] +
      "!3d" +
      coordsArray[0] +
      "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1486486434098"
    );
  }
});

function DetectFiles(input) {
  imgData.value = input[0];
  if (input) {
    var reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.value = e.target.result;
    };
    reader.readAsDataURL(input[0]);
  }
}
</script>

<style></style>
