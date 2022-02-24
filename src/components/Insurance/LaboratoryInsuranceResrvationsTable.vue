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
                <th>أسم المعمل</th>
                <th>التحليل</th>
                <th>الموافقه على الحجز</th>
                <th>رفض الحجز</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="testRequest in $store.state.testRequest">
                <td>{{ testRequest.userName }}</td>
                <td>{{ testRequest.doctorName }}</td>
                <td>{{ testRequest.laboratory }}</td>
                <td>{{ testRequest.testRequest }}</td>
                <td>
                  <button
                    class="button is-primary"
                    @click="
                      $store.dispatch('updateReservationsStates', {
                        docId: testRequest.docId,
                        states: 1,
                        table: 'testRequest',
                      })
                    "
                  >
                    الموافقه على الحجز
                  </button>
                </td>
                <td>
                  <button
                    class="button is-danger"
                    @click="
                      $store.dispatch('updateReservationsStates', {
                        docId: testRequest.docId,
                        states: 2,
                        table: 'testRequest',
                      })
                    "
                  >
                    رفض الحجز
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

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
