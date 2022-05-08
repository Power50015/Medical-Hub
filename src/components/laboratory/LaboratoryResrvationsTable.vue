<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="section">
          <table class="table is-bordered is-striped is-truncated">
            <thead>
              <tr>
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
                            testRequest.docId
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
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";

const db = getFirestore();
const auth = useAuthStore();

const showModel = ref(false);
const testData = ref("");

function testResult(
  laboratory,
  userName,
  userEmail,
  doctorName,
  doctorEmail,
  insurance,
  testRequest,
  docId
) {
  auth.addTestResult({
    laboratory: laboratory,
    doctorName: doctorName,
    doctorEmail: doctorEmail,
    userName: userName,
    userEmail: userEmail,
    insurance: insurance,
    testRequest: testRequest,
    testResult: testData.value,
  });
  showModel.value = false;
  auth.updateStates({
    id: docId,
    states: 3,
    table: "testRequest",
  });
  testData.value = "";
  alert("تم تسجيل التحليل");
  getresrvationsData();
}

const resrvationsData = reactive([]);

getresrvationsData();

async function getresrvationsData() {
  resrvationsData.length = 0;
  const q = query(
    collection(db, "testRequest"),
    where("laboratoryEmail", "==", auth.userEmail),
    where("states", "==", 1)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    resrvationsData.push({
      docId: doc.id,
      ...doc.data(),
      Usermodel: false,
      Doctormodel: false,
    });
  });
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
