import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

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
const db = getDatabase();
const auth = getAuth(app);

let EmailInp = document.getElementById('emailInp');
let PassInp = document.getElementById('passwordInp');
let FnameInp = document.getElementById('fnameInp');
let LnameInp = document.getElementById('lnameInp');
let MainForm = document.getElementById('MainForm');

let RegisterUser = evt => {
  evt.preventDefault();

  // E-posta kontrolü
  if (!isValidEmail(EmailInp.value)) {
    showInfo("Enter a valid email address.");
    return;
  }

  // Şifre kontrolü: En az bir büyük harf içermeli
  if (!/[A-Z]/.test(PassInp.value)) {
    showInfo("The password must contain at least one uppercase letter.");
    return;
  }
    // Ad ve soyad kontrolü
    if (!FnameInp.value || !LnameInp.value) {
      showInfo("First name and last name are required.");
      return;
    }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // database'e büyük harfle kaydet
  const firstname = FnameInp.value.toUpperCase();
  const lastname = LnameInp.value.toUpperCase();

  // Kullanıcıyı oluştur
  createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then((credentials) => {
      console.log(credentials);
      set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
        firstname: firstname,
        lastname: lastname
      });
      showAlert("The user has been created successfully.");

    })
    .catch(() => {
      showInfo("This user has been registered before.");
    })
}

MainForm.addEventListener('submit', RegisterUser);


