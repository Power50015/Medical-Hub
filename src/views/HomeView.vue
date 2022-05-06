<template>
  <HomePage v-if="!auth.isLogin"/>
  <ProfilePage v-if="auth.isLogin"/>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

import HomePage from '@/components/HomePage.vue';
import ProfilePage from '@/components/ProfilePage.vue';
const auth = useAuthStore();
</script>
