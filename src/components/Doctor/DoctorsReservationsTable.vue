<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="section">
          <table class="table is-bordered is-striped is-truncated">
            <thead>
              <tr>
                <th>أسم المريض</th>
                <th>حجز معمل تحاليل</th>
                <th>تم الحضور</th>
                <th>إلغاءالحجز</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reservations in $store.state.doctorsReservations">
                <td>{{ reservations.userName }}</td>
                <td>
                  <button
                    class="button is-primary"
                    @click="showModel = !showModel"
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
                <div class="modal" v-if="showModel">
                  <div
                    class="modal-background"
                    @click="showModel = fasle"
                  ></div>
                  <div class="modal-card">
                    <header class="modal-card-head">
                      <p class="modal-card-title">حجز تحاليل</p>
                      <button
                        class="delete"
                        aria-label="close"
                        @click="showModel = fasle"
                      ></button>
                    </header>
                    <section class="modal-card-body">
                      <div class="field">
                        <label class="label">Subject</label>
                        <div class="control">
                          <div class="select">
                            <select>
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

                      <textarea
                        name="testData"
                        v-model="testData"
                        rows="10"
                      ></textarea>
                    </section>
                    <footer class="modal-card-foot">
                      <button
                        class="button is-success"
                        @click="
                          laboratoryReservations(
                            laboratory.name,
                            reservations.userName,
                            reservations.userEmail,
                            $store.state.userName,
                            $store.state.userEmail,
                            reservations.insurance
                          )
                        "
                      >
                        إرسال للمعمل
                      </button>
                      <button class="button" @click="showModel = fasle">
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
    const laboratoryName = ref("222");
    function laboratoryReservations(
      laboratory,
      userName,
      userEmail,
      doctorName,
      doctorEmail,
      insurance
    ) {
      store.dispatch("addTestRequest", {
        laboratory: laboratory,
        doctorName: doctorName,
        doctorEmail: doctorEmail,
        userName: userName,
        userEmail: userEmail,
        insurance: insurance,
        test: testData.value,
      });
      showModel.value = false;
      alert("تم تسجيل طلب التحليل");
    }

    return { showModel, testData, laboratoryName, laboratoryReservations };
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
</style>
