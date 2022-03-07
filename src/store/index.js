import { createStore } from "vuex";
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  addDoc,
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
      collection(db, "insurance"),
      where("email", "==", user.email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const q = query(
        collection(db, "laboratory"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        const q = query(
          collection(db, "doctors"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            store.commit("userData", {
              type: "doctors",
              docId: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              address: doc.data().address,
              prof: doc.data().prof,
              login: true,
            });
          });
        }
      } else {
        querySnapshot.forEach((doc) => {
          store.commit("userData", {
            type: "laboratorys",
            docId: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            login: true,
          });
        });
      }
    } else {
      querySnapshot.forEach((doc) => {
        store.commit("userData", {
          type: "insurances",
          docId: doc.id,
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
      docId: "",
      userType: "",
      userName: "",
      userEmail: "",
      userAddress: "",
      userProf: "",
      doctorsReservations: [],
      laboratory: [],
      testRequest: [],
      testResult: [],
    };
  },
  mutations: {
    userData(state, payload) {
      state.isLogin = payload.login;
      state.docId = payload.docId;
      state.userType = payload.type;
      state.userName = payload.name;
      state.userEmail = payload.email;
      if (payload.type === "doctors") {
        state.userAddress = payload.address;
        state.userProf = payload.prof;
      }
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
    testRequestData(state, payload) {
      if (state.testRequest.includes(payload) === false) {
        state.testRequest.push(payload);
      }
    },
    testResultData(state, payload) {
      if (state.testResult.includes(payload) === false) {
        state.testResult.push(payload);
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
          addDoc(
            collection(db, payload.type),
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
              address: payload.form.address,
              prof: payload.form.prof,
              login: true,
            });
            unsub();
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
            collection(db, "insurance"),
            where("email", "==", payload.form.email)
          );
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            const q = query(
              collection(db, "laboratory"),
              where("email", "==", payload.form.email)
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
              const q = query(
                collection(db, "doctors"),
                where("email", "==", payload.form.email)
              );
              const querySnapshot = await getDocs(q);
              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  context.commit("userData", {
                    type: "doctors",
                    docId: doc.id,
                    name: doc.data().name,
                    email: doc.data().email,
                    address: doc.data().address,
                    prof: doc.data().prof,
                    login: true,
                  });
                });
              }
            } else {
              querySnapshot.forEach((doc) => {
                context.commit("userData", {
                  type: "laboratorys",
                  docId: doc.id,
                  name: doc.data().name,
                  email: doc.data().email,
                  login: true,
                });
              });
            }
          } else {
            querySnapshot.forEach((doc) => {
              context.commit("userData", {
                type: "insurances",
                docId: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                login: true,
              });
            });
          }
          context.dispatch("featchDoctorsReservationsData");
          context.dispatch("featchTestRequestData");
          context.dispatch("laboratoryData");
          // const q = query(
          //   collection(db, payload.type),
          //   where("email", "==", payload.form.email)
          // );

          // const querySnapshot = await getDocs(q);
          // querySnapshot.forEach((doc) => {
          //   context.commit("userData", {
          //     type: payload.type,
          //     name: doc.data().name,
          //     email: doc.data().email,
          //     login: true,
          //   });
          // });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    async updateUserData(context, payload) {
      if (context.state.userType == "doctors") {
        await updateDoc(doc(db, context.state.userType, context.state.docId), {
          name: payload.name,
          address: payload.address,
          prof: payload.prof,
        });
      } else {
        await updateDoc(doc(db, context.state.userType, context.state.docId), {
          name: payload.name,
        });
      }
      context.state.userName = payload.name;
      context.state.userAddress = payload.address;
      context.state.userProf = payload.prof;
    },
    userLogout(context) {
      signOut(auth).then(() => {
        context.commit("userData", {
          type: "",
          name: "",
          email: "",
          login: false,
        });
        context.state.doctorsReservations = [];
        context.state.laboratory = [];
      });
    },
    async featchDoctorsReservationsData(context) {
      context.state.doctorsReservations = [];
      if (context.state.userType == "doctors") {
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
      } else {
        const q = query(
          collection(db, "doctorsReservations"),
          where("states", "==", 0)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          context.commit("doctorsReservationsData", {
            ...doc.data(),
            docId: doc.id,
          });
        });
      }
    },
    async featchTestRequestData(context) {
      context.state.testRequest = [];
      if (context.state.userType == "laboratorys") {
        const q = query(
          collection(db, "testRequest"),
          where("laboratory", "==", context.state.userName),
          where("states", "==", 1)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          context.commit("testRequestData", {
            ...doc.data(),
            docId: doc.id,
          });
        });
      } else {
        const q = query(
          collection(db, "testRequest"),
          where("states", "==", 0)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          context.commit("testRequestData", {
            ...doc.data(),
            docId: doc.id,
          });
        });
      }
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
      context.dispatch("featchDoctorsReservationsData");
      context.dispatch("featchTestRequestData");
      context.dispatch("laboratoryData");
    },
    async laboratoryData(context) {
      context.state.laboratory = [];
      const querySnapshot = await getDocs(collection(db, "laboratory"));
      querySnapshot.forEach((doc) => {
        context.commit("laboratoryData", {
          name: doc.data().name,
          email: doc.data().email,
        });
      });
    },
    async addTestRequest(context, payload) {
      await addDoc(collection(db, "testRequest"), {
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
    async addTestResult(context, payload) {
      await addDoc(collection(db, "testResult"), {
        laboratory: payload.laboratory,
        doctorName: payload.doctorName,
        doctorEmail: payload.doctorEmail,
        userName: payload.userName,
        userEmail: payload.userEmail,
        insurance: payload.insurance,
        testResult: payload.testResult,
        testRequest: payload.testRequest,
      });
    },
    async featchTestResult(context) {
      context.state.testResult = [];

      const q = query(
        collection(db, "testResult"),
        where("doctorEmail", "==", context.state.userEmail)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        context.commit("testResultData", {
          ...doc.data(),
          docId: doc.id,
        });
      });
    },
  },
});
export default store;
