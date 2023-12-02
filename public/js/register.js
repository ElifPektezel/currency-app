import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

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

  // Hataları tutacak dizi, errors.push ile diziye ekle
  let errors = [];

  // E-posta kontrolü
  if (!isValidEmail(EmailInp.value)) {
    errors.push("Enter a valid email address.");
  }

  // Şifre kontrolü: En az bir büyük harf içermeli
  if (!/[A-Z]/.test(PassInp.value)) {
    errors.push("The password must contain at least one uppercase letter.");
  }

  // Ad ve soyad kontrolü
  if (!FnameInp.value || !LnameInp.value) {
    errors.push("First name and last name are required.");
  }

  // errors dizisi doluysa showinfoda göster 
  if (errors.length > 0) {
    showInfo(errors.join("\n"));
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
      // Kullanıcıya doğrulama e-postası gönder
      sendEmailVerification(credentials.user)
        .then(() => {
          console.log("doğrulama maili gitti");
        })
        .catch((error) => {
          console.error("mail gönderilmedi", error);
        });

      // Kullanıcının bilgilerini database'e kaydet
      set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
        firstname: firstname,
        lastname: lastname
      });

      showAlert("The user has been created successfully. Please check your email for verification.");
    })
    .catch(() => {
      showInfo("Please verify your e-mail address!");
    });
};

MainForm.addEventListener('submit', RegisterUser);
