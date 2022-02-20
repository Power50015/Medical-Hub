import { createStore } from "vuex";
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth();
const db = getFirestore();

// wait until auth is ready
const unsub = await onAuthStateChanged(auth, async (user) => {
  if (user) {
    const q = query(
      collection(db, "insurances"),
      where("email", "==", user.email)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const q = query(
        collection(db, "laboratorys"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        const q = query(
          collection(db, "doctors"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
        } else {
          querySnapshot.forEach((doc) => {
            store.commit("userData", {
              type: "doctors",
              name: doc.data().name,
              email: doc.data().email,
              login: true,
            });
          });
        }
      } else {
        querySnapshot.forEach((doc) => {
          store.commit("laboratorys", {
            type: "doctors",
            name: doc.data().name,
            email: doc.data().email,
            login: true,
          });
        });
      }
    } else {
      querySnapshot.forEach((doc) => {
        store.commit("insurances", {
          type: "doctors",
          name: doc.data().name,
          email: doc.data().email,
          login: true,
        });
      });
    }
  }
  unsub();
});
const store = createStore({
  state() {
    return {
      isLogin: false,
      userType: "",
      userName: "",
      userEmail: "",
      doctorsReservations: [],
      laboratory: [],
    };
  },
  mutations: {
    userData(state, payload) {
      state.isLogin = payload.login;
      state.userType = payload.type;
      state.userName = payload.name;
      state.userEmail = payload.email;
    },
    doctorsReservationsData(state, payload) {
      if (state.doctorsReservations.includes(payload) === false) {
        state.doctorsReservations.push(payload);
      }
    },
    laboratoryData(state, payload) {
      if (state.laboratory.includes(payload) === false) {
        state.laboratory.push(payload);
      }
    },
  },
  actions: {
    userRegister(context, payload) {
      createUserWithEmailAndPassword(
        auth,
        payload.form.email,
        payload.form.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Add a new document in collection "cities"
          setDoc(
            doc(db, payload.type, payload.form.email),
            payload.type === "doctors"
              ? {
                  name: payload.form.name,
                  email: payload.form.email,
                  address: payload.form.address,
                  prof: payload.form.prof,
                }
              : {
                  name: payload.form.name,
                  email: payload.form.email,
                }
          ).then(() => {
            context.commit("userData", {
              type: payload.type,
              name: payload.form.name,
              email: payload.form.email,
              login: true,
            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    userLogin(context, payload) {
      signInWithEmailAndPassword(
        auth,
        payload.form.email,
        payload.form.password
      )
        .then(async () => {
          const q = query(
            collection(db, payload.type),
            where("email", "==", payload.form.email)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            context.commit("userData", {
              type: payload.type,
              name: doc.data().name,
              email: doc.data().email,
              login: true,
            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    userLogout(context) {
      signOut(auth).then(() => {
        context.commit("userData", {
          type: "",
          name: "",
          email: "",
          login: false,
        });
      });
    },
    async featchDoctorsReservationsData(context) {
      const q = query(
        collection(db, "doctorsReservations"),
        where("doctor", "==", context.state.userEmail),
        where("states", "==", 1)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        context.commit("doctorsReservationsData", {
          ...doc.data(),
          docId: doc.id,
        });
      });
    },
    async updateReservationsStates(context, payload) {
      await updateDoc(doc(db, payload.table, payload.docId), {
        states: payload.states,
        /**
        - 0 - before Insurance
        - 1 - Insurance accsepted
        - 2 - Insurance refuse
        - 3 - Doctor accsepted
        - 4 - Doctor refuse
        **/
      });
    },
    async laboratoryData(context) {
      const querySnapshot = await getDocs(collection(db, "laboratory"));
      querySnapshot.forEach((doc) => {
        context.commit("laboratoryData", {
          name: doc.data().name,
          email: doc.data().email,
        });
      });
    },
    async addTestRequest(context, payload) {
      await setDoc(doc(db, "testRequest", payload.doctorEmail), {
        laboratory: payload.laboratory,
        doctorName: payload.doctorName,
        doctorEmail: payload.doctorEmail,
        userName: payload.userName,
        userEmail: payload.userEmail,
        insurance: payload.insurance,
        testRequest: payload.test,
        states: 0,
      });
    },
  },
});
export default store;
