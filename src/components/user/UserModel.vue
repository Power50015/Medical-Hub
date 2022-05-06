<template>
  <div class="modal" v-if="show">
    <div class="modal-background" @click="$emit('closeModel')"></div>
    <div class="modal-content has-background-white" v-if="isload">
      <img :src="data[0].image" alt="" width="250" height="250" />
      <h2>أسم : {{ data[0].name }}</h2>
      <h2>بريد ألكترونى : {{ data[0].email }}</h2>
      <h2>العمر : {{ data[0].age }}</h2>
      <h2>تلفون : {{ data[0].mobile }}</h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

const db = getFirestore();

const props = defineProps({
  showModel: Boolean,
  email: String,
});

const isload = ref(false);
const show = computed(() => {
  getdata();
  return props.showModel;
});

const data = reactive([]);
const map = ref();

async function getdata() {
  data.length = 0;
  const q = query(
    collection(db, "users"),
    where("email", "==", props.email)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
    map.value = doc.data().map;
    isload.value = true;
  });
}

</script>

<style scoped>
h2{
  font-size: 1.8rem;
  padding: 18px 0;
}
.modal-content {
  width: 80%;
}
</style>
