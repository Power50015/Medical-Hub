<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="section">
          <table class="table is-bordered is-striped is-truncated">
            <thead>
              <tr>
                <th>كود المريض</th>
                <th>المريض</th>
                <th>تاريخ الحجز يوم</th>
                <th>تاريخ الحجز شهر</th>
                <th>معاد الحجز من : إلى</th>
                <th>حجز معمل تحاليل</th>
                <th>تم الحضور</th>
                <th>إلغاءالحجز</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="doctorsRequest in resrvationsData">
                <td>{{ doctorsRequest.userId }}</td>
                <td @click="doctorsRequest.Usermodel = true">
                  {{ doctorsRequest.userName }}
                </td>
                <td>{{ doctorsRequest.day }}</td>
                <td>{{ doctorsRequest.month }}</td>
                <td>{{ doctorsRequest.time }}</td>
                <td>
                  <button
                    class="button is-primary"
                    @click="showModel = doctorsRequest.docId"
                  >
                    حجز معمل تحاليل
                  </button>
                </td>
                <td>
                  <button
                    class="button is-primary"
                    @click="
                      auth.updateStates({
                        id: doctorsRequest.docId,
                        states: 3,
                        table: 'doctorsReservations',
                      });
                      getresrvationsData();
                    "
                  >
                    الموافقه على الحجز
                  </button>
                </td>
                <td>
                  <button
                    class="button is-danger"
                    @click="
                      auth.updateStates({
                        id: doctorsRequest.docId,
                        states: 4,
                        table: 'doctorsReservations',
                      });
                      getresrvationsData();
                    "
                  >
                    رفض الحجز
                  </button>
                </td>
                <UserModel
                  v-if="doctorsRequest.Usermodel"
                  :showModel="doctorsRequest.Usermodel"
                  :email="doctorsRequest.userEmail"
                  @close-model="doctorsRequest.Usermodel = false"
                />
                <div class="modal" v-if="showModel == doctorsRequest.docId">
                  <div class="modal-background" @click="showModel = ''"></div>
                  <div class="modal-card">
                    <header class="modal-card-head">
                      <p class="modal-card-title">حجز تحاليل</p>
                      <button
                        class="delete"
                        aria-label="close"
                        @click="showModel = ''"
                      ></button>
                    </header>
                    <section class="modal-card-body">
                      <div class="field">
                        <label class="label">أسم معمل التحاليل</label>
                        <div class="control">
                          <div class="select">
                            <select v-model="laboratoryName">
                              <option
                                v-for="laboratory in laboratoryData"
                                :value="laboratory.email"
                              >
                                {{ laboratory.name }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">يوم الحجز</label>
                        <div class="control">
                          <div class="select">
                            <select v-model="day">
                              <option v-for="i = 1 in 30" :value="i">
                                {{ i }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">شهر الحجز</label>
                        <div class="control">
                          <div class="select">
                            <select v-model="month">
                              <option v-for="i = 1 in 12" :value="i">
                                {{ i }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <textarea
                        name="testData"
                        v-model="testData"
                        rows="10"
                      ></textarea>
                    </section>
                    <footer class="modal-card-foot">
                      <button
                        class="button is-primary"
                        @click="
                          laboratoryReservations(
                            laboratoryName,
                            doctorsRequest.userName,
                            doctorsRequest.userEmail,
                            auth.userName,
                            auth.userEmail,
                            doctorsRequest.insurance,
                            day,
                            month
                          )
                        "
                      >
                        إرسال للمعمل
                      </button>
                      <button class="button" @click="showModel = ''">
                        إلغاء
                      </button>
                    </footer>
                  </div>
                </div>
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
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";

const db = getFirestore();
const auth = useAuthStore();

const resrvationsData = reactive([]);

// Start laboratoryReservations
const showModel = ref(false);
const testData = ref("");
const laboratoryData = reactive([]);
const laboratoryName = ref("");
const day = ref(1);
const month = ref(1);

async function laboratoryReservations(
  laboratory,
  userName,
  userEmail,
  doctorName,
  doctorEmail,
  insurance,
  day,
  month
) {
  const laboratoryname = ref("");
  /////
  const q = query(
    collection(db, "laboratory"),
    where("email", "==", laboratory)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    laboratoryname.value = doc.data().name;
  });
  ////////

  auth.addTestRequest({
    laboratory: laboratory,
    laboratoryname: laboratoryname.value,
    doctorName: doctorName,
    doctorEmail: doctorEmail,
    userName: userName,
    userEmail: userEmail,
    insurance: insurance,
    test: testData.value,
    day: day,
    month: month,
  });
  showModel.value = false;
  alert("تم تسجيل طلب التحليل");
}
//End laboratoryReservations
getresrvationsData();

async function getresrvationsData() {
  resrvationsData.length = 0;
  const q = query(
    collection(db, "doctorsReservations"),
    orderBy("month")
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    if (doc.data().doctor == auth.userEmail && doc.data().states == 1) {
      resrvationsData.push({
        docId: doc.id,
        ...doc.data(),
        Usermodel: false,
        userId: await getId(doc.data().userEmail),
      });
    }
  });
}

getLaboratoryData();

async function getLaboratoryData() {
  laboratoryData.length = 0;

  const querySnapshot = await getDocs(collection(db, "laboratory"));

  querySnapshot.forEach((doc) => {
    laboratoryData.push({
      docId: doc.id,
      ...doc.data(),
    });
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
</script>
<style scoped>
.section {
  text-align: center;
}
.container {
  overflow-x: scroll;
  overflow-y: hidden;
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
th {
  background-color: #343b42;
  color: #fff !important;
}
td {
  background-color: #e1e2e6;
}
</style>
