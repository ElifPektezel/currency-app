let UserCreds = JSON.parse(localStorage.getItem("user-creds"));
let UserInfo = JSON.parse(localStorage.getItem("user-info"));

let MsgHead = document.getElementById('msg');
let GreetHead = document.getElementById('greet');
let SignoutBtn = document.getElementById('signoutbutton');

let logoutTimeout;

//  kullanıcının oturumunu sonlandırmak için
let Signout = () => {
    localStorage.removeItem("user-creds");
    localStorage.removeItem("user-info");
    clearInterval(logoutTimeout);
    window.location.href = 'login.html';

}

//  oturum süresini sıfırlamak için
let resetLogoutTimeout = () => {
    clearInterval(logoutTimeout);
    logoutTimeout = setTimeout(() => {
       
        Signout();
    }, 60 * 60 * 1000);
}
let CheckCred = () => {
  if (!localStorage.getItem("user-creds")) {
      window.location.href = 'login.html';
  } else {
      MsgHead.innerText = `${UserCreds.email}`;
      GreetHead.innerText = `${UserInfo.firstname + " " + UserInfo.lastname}`;
    }
}

// Sayfa yüklendiğinde süreyi sıfırla
resetLogoutTimeout();

window.addEventListener('load', CheckCred);
SignoutBtn.addEventListener('click', Signout);


window.addEventListener('beforeunload', () => {
    // Oturum bilgilerini localStorage'a kaydet
    localStorage.setItem("user-creds", JSON.stringify(UserCreds));
    localStorage.setItem("user-info", JSON.stringify(UserInfo));
});
