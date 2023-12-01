
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDE9y25K_nWB05mR5Nlfpi-fKfFQkvQfyQ",
  authDomain: "currency-app-dd6be.firebaseapp.com",
  databaseURL: "https://currency-app-dd6be-default-rtdb.firebaseio.com",
  projectId: "currency-app-dd6be",
  storageBucket: "currency-app-dd6be.appspot.com",
  messagingSenderId: "486627485508",
  appId: "1:486627485508:web:7019c0201e363346aad911"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const MainForm = document.getElementById('MainForm');

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

MainForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const userEmail = emailInp.value;

  // malili adresini kontrol et
  if (validateEmail(userEmail)) {
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        showAlert("A password reset email has been sent. Please check your email.");
      })
    //.catch(() => {
    // showAlert("The password reset email could not be sent. Please try again.");
    // });
  } else {
    showInfo("Please enter a valid e-mail address.");
  }
});
