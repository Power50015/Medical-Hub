<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="section">
          <table class="table is-bordered is-striped is-truncated">
            <thead>
              <tr>
                <th>أسم المريض</th>
                <th>الموافقه على الحجز</th>
                <th>رفض الحجز</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reservations in $store.state.doctorsReservations">
                <td>{{ reservations.userName }}</td>
                <td>
                  <button
                    class="button is-primary"
                    @click="
                      $store.dispatch('updateReservationsStates', {
                        docId: reservations.docId,
                        states: 1,
                        table: 'doctorsReservations',
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
                        docId: reservations.docId,
                        states: 2,
                        table: 'doctorsReservations',
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
.modal-background {
    background-color: rgb(10 10 10 / 25%);
}
</style>
