<template>
  <DoctorsReservationsTable v-if="$store.state.userType == 'doctors'"/>
  <DoctorsInsuranceReservationsTable v-if="$store.state.userType == 'insurances'"/>
</template>

<script>
import DoctorsReservationsTable from "../components/Doctor/DoctorsReservationsTable.vue";
import DoctorsInsuranceReservationsTable from '../components/Insurance/DoctorsInsuranceReservationsTable.vue';
export default { components: { DoctorsReservationsTable, DoctorsInsuranceReservationsTable } };
</script>