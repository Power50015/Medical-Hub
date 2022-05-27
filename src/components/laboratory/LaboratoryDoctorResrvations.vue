<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="section">
          <table class="table is-bordered is-striped is-truncated">
            <thead>
              <tr>
                <th>كود المريض</th>
                <th>المريض</th>
                <th>المعمل</th>
                <th>التحليل</th>
                <th>النتائج</th>
                <th>يوم التحليل</th>
                <th>شهر التحليل</th>
                <th>تحميل الملف</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="testRequest in resrvationsData">
                <td>{{ testRequest.userId }}</td>
                <td @click="testRequest.Usermodel = true">
                  {{ testRequest.userName }}
                </td>
                <td @click="testRequest.Laboratorymodel = true">
                  {{ testRequest.laboratory }}
                </td>
                <td>{{ testRequest.testRequest }}</td>
                <td>{{ testRequest.testResult }}</td>
                <UserModel
                  v-if="testRequest.Usermodel"
                  :showModel="testRequest.Usermodel"
                  :email="testRequest.userEmail"
                  @close-model="testRequest.Usermodel = false"
                />
                <LaboratoryModel
                  v-if="testRequest.Laboratorymodel"
                  :showModel="testRequest.Laboratorymodel"
                  :email="testRequest.laboratoryEmail"
                  @close-model="testRequest.Laboratorymodel = false"
                />
                <td>{{ testRequest.day }}</td>
                <td>{{ testRequest.month }}</td>
                <td>
                  <a
                    :href="testRequest.attach"
                    download
                    class="button is-success"
                    target="_blank"
                    >الملف</a
                  >
                </td>
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
import LaboratoryModel from "@/components/laboratory/LaboratoryModel.vue";

import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";

const db = getFirestore();
const auth = useAuthStore();

const resrvationsData = reactive([]);

getresrvationsData();

async function getresrvationsData() {
  resrvationsData.length = 0;
  const q = query(
    collection(db, "testResult"),
    orderBy("month"),
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    if (doc.data().doctor == auth.doctorEmail) {
      resrvationsData.push({
        docId: doc.id,
        userId: await getId(doc.data().userEmail),
        ...doc.data(),
        Usermodel: false,
        Laboratorymodel: false,
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
