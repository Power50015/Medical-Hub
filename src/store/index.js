import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isLogin: false,
      userType: "",
      userName: "",
      userEmail: "",
      userCompany: "",
    };
  },
  mutations: {
    authUser(state, payload) {
      state.isLogin = true;
      state.userType = payload.userType;
      state.userName = payload.userName;
      state.userEmail = payload.userEmail;
    },
    authLogout(state) {
      state.isLogin = false;
      state.userType = "";
      state.userName = "";
      state.userEmail = "";    },
  },
  actions: {},
  modules: {},
});
