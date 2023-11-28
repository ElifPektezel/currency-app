import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, get, ref, child} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
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
const dbref = ref(db);

let EmailInp = document.getElementById('emailInp');
let PassInp = document.getElementById('passwordInp');
let MainForm = document.getElementById('MainForm');

let SignInUser = evt => {
  evt.preventDefault();
  let currentUser; // Kullanıcının bilgilerini saklamak için bir değişken tanımla

  signInWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then((credentials) => {
      currentUser = credentials.user; // credentials.user'ı sakla
      // Kullanıcı girişi başarılı, JWT token'ını al
      return currentUser.getIdToken();
    })
    .then((idToken) => {
      // JWT token'ını kullan

      sessionStorage.setItem("firebase-id-token", idToken);

      // Ardından, kullanıcı bilgilerini alabilir ve yönlendirme işlemini gerçekleştirebilirsiniz.
      return get(child(dbref, 'UsersAuthList/' + currentUser.uid));
    })
    .then((snapshot) => {
      if (snapshot.exists) {
        sessionStorage.setItem("user-info", JSON.stringify({
          firstname: snapshot.val().firstname,
          lastname: snapshot.val().lastname
        }));

        sessionStorage.setItem("user-creds", JSON.stringify(currentUser));
        window.location.href = 'home.html';
      }
    })
    .catch((error) => {
      alert(error.message);
      console.log(error.code);
      console.log(error.message);
    });
}


MainForm.addEventListener('submit', SignInUser);