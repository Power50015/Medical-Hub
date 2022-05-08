import { defineStore } from "pinia";
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
  const authState = useAuthStore();
  if (user) {
    const q = query(
      collection(db, "doctors"),
      where("email", "==", user.email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
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
        // user is laboratory
        querySnapshot.forEach((doc) => {
          authState.isLogin = true;
          authState.userId = doc.id;
          authState.userName = doc.data().name;
          authState.userPhone = doc.data().phone;
          authState.userEmail = doc.data().email;
          authState.userAddress = doc.data().address;
          authState.userMap = doc.data().map;
          authState.userImg = doc.data().img;
          authState.userType = "laboratory";
        });
        authState.isLoding = true;
      } else {
        // user is insurance
        querySnapshot.forEach((doc) => {
          authState.isLogin = true;
          authState.userId = doc.id;
          authState.userName = doc.data().name;
          authState.userPhone = doc.data().phone;
          authState.userEmail = doc.data().email;
          authState.userAddress = doc.data().address;
          authState.userMap = doc.data().map;
          authState.userImg = doc.data().img;
          authState.userType = "insurance";
        });
        authState.isLoding = true;
      }
    } else {
      // user is doctor
      querySnapshot.forEach((doc) => {
        authState.isLogin = true;
        authState.userId = doc.id;
        authState.userName = doc.data().name;
        authState.userFullName = doc.data().fullname;
        authState.userPhone = doc.data().phone;
        authState.userGender = doc.data().gender;
        authState.userBirthday = doc.data().birthday;
        authState.userEmail = doc.data().email;
        authState.userAddress = doc.data().address;
        authState.userMap = doc.data().map;
        authState.userImg = doc.data().img;
        authState.userProf = doc.data().prof;
        authState.userType = "doctors";
      });
      authState.isLoding = true;
    }
  } else {
    authState.isLoding = true;
  }
  unsub();
});

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isLogin: false,
    isLoding: false,
    userId: "",
    userType: "",
    userName: "",
    userFullName: "",
    userPhone: "",
    userGender: "",
    userBirthday: "",
    userEmail: "",
    userAddress: "",
    userProf: "",
    userMap: "",
    userImg: "",
  }),
  getters: {},
  actions: {
    addUser(payload: any) {
      this.isLoding = false;
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          const user = userCredential.user;

          if (payload.type == "doctors") {
            addDoc(collection(db, "doctors"), {
              name: payload.name,
              fullname: payload.fullname,
              email: payload.email,
              address: payload.address,
              prof: payload.prof,
              phone: payload.phone,
              gender: payload.gender,
              birthday: payload.birthday,
              map: payload.map,
              img: payload.img,
            }).then(() => {
              this.userName = payload.name;
              this.userFullName = payload.fullname;
              this.userEmail = payload.email;
              this.userAddress = payload.address;
              this.userProf = payload.prof;
              this.userPhone = payload.phone;
              this.userGender = payload.gender;
              this.userBirthday = payload.birthday;
              this.userMap = payload.map;
              this.userImg = payload.img;
              this.isLogin = true;
              this.isLoding = true;
              this.userType = "doctors";
            });
          }
          if (payload.type == "insurance") {
            addDoc(collection(db, "insurance"), {
              name: payload.name,
              email: payload.email,
              address: payload.address,
              phone: payload.phone,
              map: payload.map,
              img: payload.img,
            }).then(() => {
              this.userName = payload.name;
              this.userEmail = payload.email;
              this.userAddress = payload.address;
              this.userPhone = payload.phone;
              this.userMap = payload.map;
              this.userImg = payload.img;
              this.isLogin = true;
              this.isLoding = true;
              this.userType = "insurance";
            });
          }
          if (payload.type == "laboratory") {
            addDoc(collection(db, "laboratory"), {
              name: payload.name,
              email: payload.email,
              address: payload.address,
              phone: payload.phone,
              map: payload.map,
              img: payload.img,
            }).then(() => {
              this.userName = payload.name;
              this.userEmail = payload.email;
              this.userAddress = payload.address;
              this.userPhone = payload.phone;
              this.userMap = payload.map;
              this.userImg = payload.img;
              this.isLogin = true;
              this.isLoding = true;
              this.userType = "laboratory";
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
    logout() {
      signOut(auth).then(() => {
        this.userId = "";
        this.userName = "";
        this.userFullName = "";
        this.userEmail = "";
        this.userAddress = "";
        this.userProf = "";
        this.userPhone = "";
        this.userGender = "";
        this.userBirthday = "";
        this.userMap = "";
        this.userImg = "";
        this.userType = "";
        this.isLogin = false;
      });
    },
    loginUser(payload: any) {
      this.isLoding = false;

      if (payload.type == "doctors") {
        signInWithEmailAndPassword(auth, payload.email, payload.password)
          .then(async () => {
            const q = query(
              collection(db, "doctors"),
              where("email", "==", payload.email)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              this.userId = doc.id;
              this.userName = doc.data().name;
              this.userFullName = doc.data().fullname;
              this.userEmail = doc.data().email;
              this.userAddress = doc.data().address;
              this.userProf = doc.data().prof;
              this.userPhone = doc.data().phone;
              this.userGender = doc.data().gender;
              this.userBirthday = doc.data().birthday;
              this.userMap = doc.data().map;
              this.userImg = doc.data().img;
              this.isLogin = true;
              this.isLoding = true;
              this.userType = "doctors";
            });
          })
          .catch((error) => {
            this.isLoding = true;
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      }

      if (payload.type == "insurance") {
        signInWithEmailAndPassword(auth, payload.email, payload.password)
          .then(async () => {
            const q = query(
              collection(db, "insurance"),
              where("email", "==", payload.email)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              this.userId = doc.id;
              this.userName = doc.data().name;
              this.userEmail = doc.data().email;
              this.userAddress = doc.data().address;
              this.userPhone = doc.data().phone;
              this.userMap = doc.data().map;
              this.userImg = doc.data().img;
              this.isLogin = true;
              this.isLoding = true;
              this.userType = "insurance";
            });
          })
          .catch((error) => {
            this.isLoding = true;
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      }

      if (payload.type == "laboratory") {
        signInWithEmailAndPassword(auth, payload.email, payload.password)
          .then(async () => {
            const q = query(
              collection(db, "laboratory"),
              where("email", "==", payload.email)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              this.userId = doc.id;
              this.userName = doc.data().name;
              this.userEmail = doc.data().email;
              this.userAddress = doc.data().address;
              this.userPhone = doc.data().phone;
              this.userMap = doc.data().map;
              this.userImg = doc.data().img;
              this.isLogin = true;
              this.isLoding = true;
              this.userType = "laboratory";
            });
          })
          .catch((error) => {
            this.isLoding = true;
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      }
    },
    async editUser(payload: any) {
      console.log(payload);
      this.isLoding = false;
      if (payload.type == "doctors") {
        await setDoc(doc(db, "doctors", this.userId), {
          name: payload.name,
          fullname: payload.fullname,
          email: this.userEmail,
          address: payload.address,
          prof: payload.prof,
          phone: payload.phone,
          gender: payload.gender,
          birthday: payload.birthday,
          map: payload.map,
          img: payload.img,
        }).then(() => {
          this.userName = payload.name;
          this.userFullName = payload.fullname;
          this.userAddress = payload.address;
          this.userProf = payload.prof;
          this.userPhone = payload.phone;
          this.userGender = payload.gender;
          this.userBirthday = payload.birthday;
          this.userMap = payload.map;
          this.userImg = payload.img;
          this.isLoding = true;
        });
      }
      if (payload.type == "insurance") {
        await setDoc(doc(db, "insurance", this.userId), {
          name: payload.name,
          email: this.userEmail,
          address: payload.address,
          phone: payload.phone,
          map: payload.map,
          img: payload.img,
        }).then(() => {
          this.userName = payload.name;
          this.userAddress = payload.address;
          this.userPhone = payload.phone;
          this.userMap = payload.map;
          this.userImg = payload.img;
          this.isLoding = true;
        });
      }
      if (payload.type == "laboratory") {
        await setDoc(doc(db, "laboratory", this.userId), {
          name: payload.name,
          email: this.userEmail,
          address: payload.address,
          phone: payload.phone,
          map: payload.map,
          img: payload.img,
        }).then(() => {
          this.userName = payload.name;
          this.userAddress = payload.address;
          this.userPhone = payload.phone;
          this.userMap = payload.map;
          this.userImg = payload.img;
          this.isLoding = true;
        });
      }
      this.isLoding = true;
    },
    async updateStates(payload: any) {    
      await updateDoc(doc(db, payload.table, payload.id), {
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
    async addTestRequest(payload: any) {
      await addDoc(collection(db, "testRequest"), {
        laboratoryEmail: payload.laboratory,
        laboratory: payload.laboratoryname,
        doctorName: payload.doctorName,
        doctorEmail: payload.doctorEmail,
        userName: payload.userName,
        userEmail: payload.userEmail,
        insurance: payload.insurance,
        testRequest: payload.test,
        states: 0,
        day: payload.day,
        month: payload.month,
      });
    },
    async addTestResult(payload: any) {
      await addDoc(collection(db, "testResult"), {
        laboratory: payload.laboratory,
        laboratoryEmail: this.userEmail,
        doctorName: payload.doctorName,
        doctorEmail: payload.doctorEmail,
        userName: payload.userName,
        userEmail: payload.userEmail,
        insurance: payload.insurance,
        testResult: payload.testResult,
        testRequest: payload.testRequest,
      });
    },
  },
});
