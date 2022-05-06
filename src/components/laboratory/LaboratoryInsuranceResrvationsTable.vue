<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="section">
          <table class="table is-bordered is-striped is-truncated">
            <thead>
              <tr>
                <th>المريض</th>
                <th>الطبيب</th>
                <th>المعمل</th>
                <th>التحليل</th>
                <th>الموافقه على الحجز</th>
                <th>رفض الحجز</th>
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
                <td @click="testRequest.Laboratorymodel = true">
                  {{ testRequest.laboratory }}
                </td>
                <td>{{ testRequest.testRequest }}</td>
                <td>
                  <button
                    class="button is-primary"
                    @click="
                      auth.updateStates({
                        id: testRequest.id,
                        states: 1,
                        table: 'testRequest',
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
                        id: testRequest.id,
                        states: 2,
                        table: 'testRequest',
                      });
                      getresrvationsData();
                    "
                  >
                    رفض الحجز
                  </button>
                </td>
                <LaboratoryModel
                  v-if="testRequest.Laboratorymodel"
                  :showModel="testRequest.Laboratorymodel"
                  :email="testRequest.laboratoryEmail"
                  @close-model="testRequest.Laboratorymodel = false"
                />
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
import LaboratoryModel from "@/components/laboratory/LaboratoryModel.vue";
import UserModel from "@/components/user/UserModel.vue";
import DoctorModel from "@/components/doctor/DoctorModel.vue";

import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
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
    collection(db, "testRequest"),
    where("insurance", "==", auth.userEmail),
    where("states", "==", 0)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    resrvationsData.push({
      id: doc.id,
      ...doc.data(),
      Laboratorymodel: false,
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
