<template>
  <div>
    <div class="profile-section">
      <div class="card">
        <h1 class="m-4 title">البيانات الشخصيه</h1>
        <img
          :src="$store.state.userImg"
          width="150"
          height="150"
          class="rounded-circle"
        />
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
              <div class="field" v-if="$store.state.userType == 'doctors'">
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
              <div class="field" v-if="$store.state.userType == 'doctors'">
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
                <div v-if="$store.state.userType == 'doctors'">
                  <span>العمر : </span>
                  <span>{{ isNaN(age) ? "" : age + " سنه " }}</span>
                </div>
              </div>
              <div class="field">
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
              <!-- Start image-->
              <div class="mb-3">
                <label for="formFile" class="form-label">الصورة الشخصيه</label>
                <template v-if="imgPreview">
                  <img :src="imgPreview" class="img-fluid" height="300" />
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
                    v-model="map"
                    id="map"
                  />
                </div>
              </div>
              <div class="field" v-if="map != ''">
                <iframe
                  :src="GoogleMapsURLToEmbedURL"
                  style="width: 100%"
                  allowfullscreen="fasle"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div class="field">
                <div
                  class="control has-icons-left"
                  v-if="$store.state.userType == 'doctors'"
                >
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
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();
const router = useRouter();
const store = useStore();

const name = ref(store.state.userName);
const fullName = ref(store.state.userFullName);
const userPhone = ref(store.state.userPhone);
const birthday = ref(store.state.userBirthday);
const gender = ref(store.state.userGender);
const address = ref(store.state.userAddress);
const prof = ref(store.state.userProf);
const map = ref(store.state.userMap);
const img = ref(store.state.userImg);

const imgData = reactive([]);
const imgPreview = ref("");
const imgUpload = ref(0);
const isDisabled = ref(false);

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

const GoogleMapsURLToEmbedURL = computed(() => {
  var coords = /\@([0-9\.\,\-a-zA-Z]*)/.exec(map.value);
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

function updateUserData() {
  isDisabled.value = true;
  if (imgPreview.value != "") {
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
          img.value = URL;

          store
            .dispatch("updateUserData", {
              name: name.value,
              fullName: fullName.value,
              address: address.value,
              phone: userPhone.value,
              birthday: birthday.value,
              gender: gender.value,
              prof: prof.value,
              map: map.value,
              img: img.value,
            })
            .then(() => {
              setTimeout(() => {
                isDisabled.value = false;
              }, 3000);
            });
        });
      }
    );
  } else {
    store
      .dispatch("updateUserData", {
        name: name.value,
        fullName: fullName.value,
        address: address.value,
        phone: userPhone.value,
        birthday: birthday.value,
        gender: gender.value,
        prof: prof.value,
        map: map.value,
        img: img.value,
      })
      .then(() => {
        setTimeout(() => {
          isDisabled.value = false;
        }, 3000);
      });
  }
}
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

<style scoped>
.profile-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  text-align: center;
}
h1 {
  text-align: center;
}
.card {
  width: 500px;
}
</style>
