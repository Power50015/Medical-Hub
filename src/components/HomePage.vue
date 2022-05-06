<template>
    <div class="container mt-5">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <DoctorBaner />
            <LaboratoryBanar />
          </div>
        </div>
      </div>
      <InsuranceBanar />
    </div>
  </div>
</template>

<script setup lang="ts">
import  DoctorBaner from '@/components/home/DoctorBaner.vue';
import  LaboratoryBanar from '@/components/home/LaboratoryBanar.vue';
import  InsuranceBanar from '@/components/home/InsuranceBanar.vue';

</script>

<style scoped>
.is-ancestor {
  height: 95vh;
}
</style>
