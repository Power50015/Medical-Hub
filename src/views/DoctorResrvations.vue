<template>
  <DoctorInsuranceResrvationsTable v-if="auth.userType == 'insurance'"/>
  <DoctorResrvationsTable v-if="auth.userType == 'doctors'"/>
</template>

<script setup lang="ts">
import DoctorInsuranceResrvationsTable from '@/components/doctor/DoctorInsuranceResrvationsTable.vue';
import DoctorResrvationsTable from '@/components/doctor/DoctorResrvationsTable.vue';

import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>
