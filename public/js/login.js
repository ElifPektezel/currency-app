 // Firebase konfigürasyonu
const firebaseConfig = {
  apiKey: "AIzaSyDE9y25K_nWB05mR5Nlfpi-fKfFQkvQfyQ",
  authDomain: "currency-app-dd6be.firebaseapp.com",
  databaseURL: "https://currency-app-dd6be-default-rtdb.firebaseio.com",
  projectId: "currency-app-dd6be",
  storageBucket: "currency-app-dd6be.appspot.com",
  messagingSenderId: "486627485508",
  appId: "1:486627485508:web:7019c0201e363346aad911"
};

// Firebase uygulamasını başlatma
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);

let EmailInp = document.getElementById('emailInp');
let PassInp = document.getElementById('passwordInp');
let MainForm = document.getElementById('MainForm');

// Kullanıcı girişi işlevi
let SignInUser = evt => {
  evt.preventDefault();

  // Firebase Authentication ile kullanıcı girişi
  signInWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then((credentials) => {
      // Kullanıcı giriş yaptığında;

      // Realtime Database'den kullanıcı bilgilerini al
      get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot) => {
        if (snapshot.exists) {
          // Kullanıcı bilgilerini tarayıcıda kaydet
          sessionStorage.setItem("user-info", JSON.stringify({
            firstname: snapshot.val().firstname,
            lastname: snapshot.val().lastname
          }));

          sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
          window.location.href = 'home.html';
        }
      });
    })
    .catch((error) => {
      alert(error.message);
      console.log(error.code);
      console.log(error.message);
    });
};

MainForm.addEventListener('submit', SignInUser);
