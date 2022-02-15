import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_ApiKey,
  authDomain: import.meta.env.VITE_APP_AuthDomain,
  projectId: import.meta.env.VITE_APP_ProjectId,
  storageBucket: import.meta.env.VITE_APP_StorageBucket,
  messagingSenderId: import.meta.env.VITE_APP_MessagingSenderId,
  appId: import.meta.env.VITE_APP_AppId,
  measurementId: import.meta.env.VITE_APP_MeasurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;