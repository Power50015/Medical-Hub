<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="section">
          <table class="table is-bordered is-striped is-truncated">
            <thead>
              <tr>
                <th>كود المريض</th>
                <th>أسم المريض</th>
                <th>أسم الطبيب</th>
                <th>تاريخ الحجز يوم</th>
                <th>تاريخ الحجز شهر</th>
                <th>التحليل</th>
                <th>نتائج التحاليل</th>
                <th>إلغاءالحجز</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="testRequest in resrvationsData">
                <td>{{ testRequest.userId }}</td>
                <td @click="testRequest.Usermodel = true">
                  {{ testRequest.userName }}
                </td>
                <td @click="testRequest.Doctormodel = true">
                  {{ testRequest.doctorName }}
                </td>
                <td>{{ testRequest.day }}</td>
                <td>{{ testRequest.month }}</td>
                <td>{{ testRequest.testRequest }}</td>
                <td>
                  <button
                    class="button is-primary"
                    @click="showModel = testRequest.docId"
                  >
                    نتائج التحاليل
                  </button>
                </td>

                <td>
                  <button
                    class="button is-danger"
                    @click="
                      auth.updateStates({
                        docId: testRequest.docId,
                        states: 4,
                        table: 'testRequest',
                      })
                    "
                  >
                    إلغاءالحجز
                  </button>
                </td>
                <div class="modal" v-if="showModel == testRequest.docId">
                  <div class="modal-background" @click="showModel = ''"></div>
                  <div class="modal-card">
                    <header class="modal-card-head">
                      <p class="modal-card-title">نتائج التحاليل</p>
                      <button
                        class="delete"
                        aria-label="close"
                        @click="showModel = ''"
                      ></button>
                    </header>
                    <section class="modal-card-body">
                      <textarea
                        name="testData"
                        v-model="testData"
                        rows="10"
                      ></textarea>
                      <!-- Start image-->
                      <div class="mb-3">
                        <label for="formFile" class="form-label">الملف</label>
                        <template v-if="imgPreview">
                          <img
                            :src="imgPreview"
                            class="img-fluid"
                            height="300"
                            width="300"
                          />
                          <p class="mb-0">
                            file name: {{ imgData.value.name }}
                          </p>
                          <p class="mb-0">
                            size: {{ Math.round(imgData.value.size / 1024) }}KB
                          </p>
                        </template>
                        <div class="flex">
                          <h6 class="mb-3 text-white">
                            حاله رفع الملف :
                            <span v-if="imgUpload == 100">أكتمل</span>
                          </h6>
                        </div>
                        <input
                          class="form-control"
                          type="file"
                          id="formFile"
                          @change="DetectFiles($event.target.files)"
                        />
                      </div>
                      <!-- End image-->
                    </section>
                    <footer class="modal-card-foot">
                      <button
                        class="button is-success"
                        @click="
                          testResult(
                            testRequest.laboratory,
                            testRequest.userName,
                            testRequest.userEmail,
                            testRequest.doctorName,
                            testRequest.doctorEmail,
                            testRequest.insurance,
                            testRequest.testRequest,
                            testRequest.docId,
                            testRequest.day,
                            testRequest.month
                          )
                        "
                      >
                        إرسال للطبيب
                      </button>
                      <button class="button" @click="showModel = ''">
                        إلغاء
                      </button>
                    </footer>
                  </div>
                </div>
                <UserModel
                  v-if="testRequest.Usermodel"
                  :showModel="testRequest.Usermodel"
                  :email="testRequest.userEmail"
                  @close-model="testRequest.Usermodel = false"
                />
                <DoctorModel
                  v-if="testRequest.Doctormodel"
                  :showModel="testRequest.Doctormodel"
                  :email="testRequest.doctorEmail"
                  @close-model="testRequest.Doctormodel = false"
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserModel from "@/components/user/UserModel.vue";
import DoctorModel from "@/components/doctor/DoctorModel.vue";

import app from "@/firebase";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";

const db = getFirestore();
const storage = getStorage();
const auth = useAuthStore();

const showModel = ref(false);
const testData = ref("");
const imgData = reactive([]);
const imgPreview = ref("");
const imgUpload = ref(0);

function testResult(
  laboratory,
  userName,
  userEmail,
  doctorName,
  doctorEmail,
  insurance,
  testRequest,
  docId,
  day,
  month
) {
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
        auth.addTestResult({
          laboratory: laboratory,
          doctorName: doctorName,
          doctorEmail: doctorEmail,
          userName: userName,
          userEmail: userEmail,
          insurance: insurance,
          testRequest: testRequest,
          testResult: testData.value,
          day: day,
          month: month,
          attach: URL,
        });
        showModel.value = false;
        auth.updateStates({
          id: docId,
          states: 3,
          table: "testRequest",
        });
        testData.value = "";
        imgPreview.value = "";
        imgUpload.value = 0;
        // imgData.empty();
        alert("تم تسجيل التحليل");
        getresrvationsData();
      });
    }
  );
  /////////////////////////////////
}

const resrvationsData = reactive([]);

getresrvationsData();

async function getresrvationsData() {
  resrvationsData.length = 0;
  const q = query(collection(db, "testRequest"), orderBy("month"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    if (
      doc.data().laboratoryEmail == auth.userEmail &&
      doc.data().states == 1
    ) {
      resrvationsData.push({
        docId: doc.id,
        userId: await getId(doc.data().userEmail),
        ...doc.data(),
        Usermodel: false,
        Doctormodel: false,
      });
    }
  });
}

async function getId(prop) {
  let Xid;
  const q = query(collection(db, "users"), where("email", "==", prop));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    Xid = doc.id;
  });

  return Xid;
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

<style>
.section {
  text-align: center;
}
th,
textarea {
  width: 100%;
}
.modal {
  display: flex;
}
.modal-background {
  background-color: rgb(10 10 10 / 25%);
}
</style>
