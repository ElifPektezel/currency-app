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

  createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
  .then((credentials)=>{
    console.log(credentials);
    set(ref(db, 'UsersAuthList/' + credentials.user.uid),{
      firstname: FnameInp.value,
      lastname: LnameInp.value
    })
   
  })
  .catch((error)=>{
    alert(error.message);
    console.log(error.code);
    console.log(error.message);
  })
}
MainForm.addEventListener('submit', RegisterUser);