<template>
  <LaboratoryInsuranceResrvationsTable v-if="auth.userType == 'insurance'"/>
  <LaboratoryDoctorResrvations v-if="auth.userType == 'doctors'"/>
  <LaboratoryResrvationsTable v-if="auth.userType == 'laboratory'"/>
</template>

<script setup lang="ts">
import LaboratoryInsuranceResrvationsTable from '@/components/laboratory/LaboratoryInsuranceResrvationsTable.vue';
import LaboratoryDoctorResrvations from '@/components/laboratory/LaboratoryDoctorResrvations.vue';
import LaboratoryResrvationsTable from '@/components/laboratory/LaboratoryResrvationsTable.vue';

import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>
