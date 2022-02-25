<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="section">
          <table class="table is-bordered is-striped is-truncated">
            <thead>
              <tr>
                <th>أسم المريض</th>
                <th>أسم الطبيب</th>
                <th>التحليل</th>
                <th>نتائج التحاليل</th>
                <th>إلغاءالحجز</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="testRequest in $store.state.testRequest">
                <td>{{ testRequest.userName }}</td>
                <td>{{ testRequest.doctorName }}</td>
                <td>{{ testRequest.testRequest }}</td>
                <td>
                  <button
                    class="button is-primary"
                    @click="showModel = testRequest.docId"
                  >
                    نتائج التحاليل
                  </button>
                </td>

                <td>
                  <button
                    class="button is-danger"
                    @click="
                      $store.dispatch('updateReservationsStates', {
                        docId: testRequest.docId,
                        states: 4,
                        table: 'testRequest',
                      })
                    "
                  >
                    إلغاءالحجز
                  </button>
                </td>
                <div class="modal" v-if="showModel == testRequest.docId">
                  <div
                    class="modal-background"
                    @click="showModel = ''"
                  ></div>
                  <div class="modal-card">
                    <header class="modal-card-head">
                      <p class="modal-card-title">نتائج التحاليل</p>
                      <button
                        class="delete"
                        aria-label="close"
                        @click="showModel = ''"
                      ></button>
                    </header>
                    <section class="modal-card-body">
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
                          testResult(
                            testRequest.laboratory,
                            testRequest.userName,
                            testRequest.userEmail,
                            testRequest.doctorName,
                            testRequest.doctorEmail,
                            testRequest.insurance,
                            testRequest.testRequest,
                            testRequest.docId
                          )
                        "
                      >
                        إرسال للطبيب
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
    function testResult(
      laboratory,
      userName,
      userEmail,
      doctorName,
      doctorEmail,
      insurance,
      testRequest,
      docId
    ) {
      store.dispatch("addTestResult", {
        laboratory: laboratory,
        doctorName: doctorName,
        doctorEmail: doctorEmail,
        userName: userName,
        userEmail: userEmail,
        insurance: insurance,
        testRequest: testRequest,
        testResult: testData.value,
      });
      showModel.value = false;
      store.dispatch("updateReservationsStates", {
        docId: docId,
        states: 3,
        table: "testRequest",
      });
      testData.value = "";
      alert("تم تسجيل التحليل");
    }

    return { showModel, testData, testResult };
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
</style>
