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
                <th>الطبيب</th>
                <th>يوم الحجز</th>
                <th>شهر الحجز</th>
                <th>الموافقه على الحجز</th>
                <th>رفض الحجز</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="doctorsRequest in resrvationsData">
                <td>
                  {{ doctorsRequest.userId }}
                </td>
                <td @click="doctorsRequest.Usermodel = true">
                  {{ doctorsRequest.userName }}
                </td>
                <td @click="doctorsRequest.Doctormodel = true">
                  {{ doctorsRequest.doctorName }}
                </td>
                <td>{{ doctorsRequest.day }}</td>
                <td>{{ doctorsRequest.month }}</td>
                <td>
                  <button
                    class="button is-primary"
                    @click="
                      auth.updateStates({
                        id: doctorsRequest.docId,
                        states: 1,
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
                        states: 2,
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
                <DoctorModel
                  v-if="doctorsRequest.Doctormodel"
                  :showModel="doctorsRequest.Doctormodel"
                  :email="doctorsRequest.doctor"
                  @close-model="doctorsRequest.Doctormodel = false"
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
import { getFirestore, orderBy } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useAuthStore } from "@/stores/auth";
import { reactive } from "@vue/reactivity";

const db = getFirestore();
const auth = useAuthStore();

const resrvationsData = reactive([]);

getresrvationsData();

async function getresrvationsData() {
  resrvationsData.length = 0;
  const q = query(
    collection(db, "doctorsReservations"),
    orderBy("month"),
    orderBy("day"),
    where("insurance", "==", auth.userEmail),
    where("states", "==", 0)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    resrvationsData.push({
      docId: doc.id,
      userId: await getId(doc.data().userEmail),
      ...doc.data(),
      Usermodel: false,
      Doctormodel: false,
    });
  });
}

async function getId(prop) {
  let Xid;
  const q = query(collection(db, "users"), where("email", "==", prop));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    Xid = doc.data().national;
  });

  return Xid;
}
</script>
<style>
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
</style>
