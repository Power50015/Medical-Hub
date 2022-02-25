<template>
  <DoctorsReservationsTable v-if="$store.state.userType == 'doctors'" />
  <DoctorsInsuranceReservationsTable
    v-if="$store.state.userType == 'insurances'"
  />
  <LaboratoryReservationsTable  v-if="$store.state.userType == 'laboratorys'"/>
</template>

<script>
import DoctorsReservationsTable from "../components/Doctor/DoctorsReservationsTable.vue";
import DoctorsInsuranceReservationsTable from "../components/Insurance/DoctorsInsuranceReservationsTable.vue";
import LaboratoryInsuranceResrvationsTable from "../components/Insurance/LaboratoryInsuranceResrvationsTable.vue";
import LaboratoryReservationsTable from '../components/Laboratory/LaboratoryReservationsTable.vue';
export default {
  components: {
    DoctorsReservationsTable,
    DoctorsInsuranceReservationsTable,
    LaboratoryReservationsTable,
  },
};
</script>
