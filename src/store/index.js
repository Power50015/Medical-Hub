import { createStore } from "vuex";
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default createStore({
  state() {
    return {
      isLogin: false,
      userType: "",
      userName: "",
      userEmail: "",
    };
  },
  mutations: {
    userData(state, payload) {
      state.isLogin = true;
      state.userType = payload.type;
      state.userName = payload.name;
      state.userEmail = payload.email;
    },
  },
  actions: {
    userRegister(context, payload) {
      const auth = getAuth();
      const db = getFirestore();
      createUserWithEmailAndPassword(
        auth,
        payload.form.email,
        payload.form.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Add a new document in collection "cities"
          setDoc(doc(db, payload.type, payload.form.email), {
            name: payload.form.name,
            email: payload.form.email,
          });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
      context.commit("userData", {
        type: payload.type,
        name: payload.form.name,
        email: payload.form.email,
      });
    },
  },
  modules: {},
});
