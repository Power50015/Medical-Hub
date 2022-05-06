<template>
  <div class="modal" v-if="show">
    <div class="modal-background" @click="$emit('closeModel')"></div>
    <div class="modal-content has-background-white" v-if="isload">
      <img :src="data[0].img" alt="" width="250" height="250" />
      <h2>أسم : {{ data[0].name }}</h2>
      <h2>البريدالإلكترونى : {{ data[0].email }}</h2>
      <h2>تلفون : {{ data[0].phone }}</h2>
      <h2>عنوان : {{ data[0].address }}</h2>
      <div class="field">
        <iframe
          :src="GoogleMapsURLToEmbedURL"
          style="width: 100%"
          allowfullscreen="fasle"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
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
    collection(db, "laboratory"),
    where("email", "==", props.email)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
    map.value = doc.data().map;
    isload.value = true;
  });
}

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
