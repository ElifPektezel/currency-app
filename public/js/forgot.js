
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
const EmailInp = document.getElementById('emailInp');

// Form gönderildiğinde şifre sıfırlama işlemini başlat
MainForm.addEventListener('submit', function (event) {
  event.preventDefault();


  const userEmail = EmailInp.value;

  //  Auth ile şifre sıfırlama e-postası gönder
  //  mail doğrulama işlemini geri almak zorunda kaldım başka bir yerde hata verdi üstünde çalışıyorum Murat Bey ;)
  sendPasswordResetEmail(auth, userEmail)
    .then(() => {
      alert("Şifre sıfırlama e-postası gönderildi. Lütfen e-postanızı kontrol edin.");
    })
    .catch((error) => {
      console.error("Şifre sıfırlama e-postası gönderilemedi: ", error.message);
      alert("Şifre sıfırlama e-postası gönderilemedi. Lütfen tekrar deneyin.");
    });
});