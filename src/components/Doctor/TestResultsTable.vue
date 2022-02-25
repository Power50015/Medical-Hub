<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="section">
          <table class="table is-bordered is-striped is-truncated">
            <thead>
              <tr>
                <th>أسم المريض</th>
                <th>التحليل</th>
                <th>نتائج التحاليل</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="testResult in $store.state.testResult">
                <td>{{ testResult.userName }}</td>
                <td>{{ testResult.testRequest }}</td>
                <td>
                  <button
                    class="button is-primary"
                    @click="showModel = testResult.docId"
                  >
                    نتائج التحاليل
                  </button>
                </td>

                <div class="modal" v-if="showModel == testResult.docId">
                  <div class="modal-background" @click="showModel = ''"></div>
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
                      <p>
                        {{ testResult.testResult }}
                      </p>
                    </section>
                    <footer class="modal-card-foot">
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
export default {
  setup() {
    const showModel = ref(false);

    return { showModel };
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
