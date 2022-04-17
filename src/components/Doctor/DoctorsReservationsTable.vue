<template>
  <div class="container">
    <div class="">
      <div class="">
        <div class="section">
          <table class="table is-bordered is-striped is-truncated">
            <thead>
              <tr>
                <th>أسم المريض</th>
                <th>تاريخ الحجز يوم</th>
                <th>تاريخ الحجز شهر</th>
                <th>معاد الحجز من : إلى</th>
                <th>حجز معمل تحاليل</th>
                <th>تم الحضور</th>
                <th>إلغاءالحجز</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reservations in $store.state.doctorsReservations">
                <td>{{ reservations.userName }}</td>
                <td>{{ reservations.day }}</td>
                <td>{{ reservations.month }}</td>
                <td>{{ reservations.time }}</td>
                <td>
                  <button
                    class="button is-primary"
                    @click="showModel = reservations.docId"
                  >
                    حجز معمل تحاليل
                  </button>
                </td>
                <td>
                  <button
                    class="button is-primary"
                    @click="
                      $store.dispatch('updateReservationsStates', {
                        docId: reservations.docId,
                        states: 3,
                        table: 'doctorsReservations',
                      })
                    "
                  >
                    تم الحضور
                  </button>
                </td>
                <td>
                  <button
                    class="button is-danger"
                    @click="
                      $store.dispatch('updateReservationsStates', {
                        docId: reservations.docId,
                        states: 4,
                        table: 'doctorsReservations',
                      })
                    "
                  >
                    إلغاءالحجز
                  </button>
                </td>
                <div class="modal" v-if="showModel == reservations.docId">
                  <div class="modal-background" @click="showModel = ''"></div>
                  <div class="modal-card">
                    <header class="modal-card-head">
                      <p class="modal-card-title">حجز تحاليل</p>
                      <button
                        class="delete"
                        aria-label="close"
                        @click="showModel = ''"
                      ></button>
                    </header>
                    <section class="modal-card-body">
                      <div class="field">
                        <label class="label">أسم معمل التحاليل</label>
                        <div class="control">
                          <div class="select">
                            <select v-model="laboratoryName">
                              <option
                                v-for="laboratory in $store.state.laboratory"
                                :value="laboratory.name"
                              >
                                {{ laboratory.name }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">يوم الحجز</label>
                        <div class="control">
                          <div class="select">
                            <select v-model="day">
                              <option v-for="i = 1 in 30" :value="i">
                                {{ i }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="field">
                        <label class="label">شهر الحجز</label>
                        <div class="control">
                          <div class="select">
                            <select v-model="month">
                              <option v-for="i = 1 in 12" :value="i">
                                {{ i }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <textarea
                        name="testData"
                        v-model="testData"
                        rows="10"
                      ></textarea>
                    </section>
                    <footer class="modal-card-foot">
                      <button
                        class="button is-primary"
                        @click="
                          laboratoryReservations(
                            laboratoryName,
                            reservations.userName,
                            reservations.userEmail,
                            $store.state.userName,
                            $store.state.userEmail,
                            reservations.insurance,
                            day,
                            month
                          )
                        "
                      >
                        إرسال للمعمل
                      </button>
                      <button class="button" @click="showModel = ''">
                        إلغاء
                      </button>
                    </footer>
                  </div>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const showModel = ref(false);
    const testData = ref("");
    const laboratoryName = ref("");
    const day = ref(1);
    const month = ref(1);
    function laboratoryReservations(
      laboratory,
      userName,
      userEmail,
      doctorName,
      doctorEmail,
      insurance,
      day,
      month
    ) {
      store.dispatch("addTestRequest", {
        laboratory: laboratory,
        doctorName: doctorName,
        doctorEmail: doctorEmail,
        userName: userName,
        userEmail: userEmail,
        insurance: insurance,
        test: testData.value,
        day: day,
        month: month,
      });
      showModel.value = false;
      alert("تم تسجيل طلب التحليل");
    }

    return { showModel, testData, laboratoryName, laboratoryReservations,day,month };
  },
};
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
th {
  background-color: #343b42;
  color: #fff !important;
}
td {
  background-color: #e1e2e6;
}
</style>
