// Kullanıcı bilgilerini tarayıcıdan al
let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));


let MsgHead = document.getElementById('msg');
let GreetHead = document.getElementById('greet');
let SignoutBtn = document.getElementById('signoutbutton');

// user çıkış işlevi
let Signout = () => {
    // Tarayıcıdaki kullanıcı bilgilerini temizle
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    // Giriş sayfasına yönlendir
    window.location.href = 'login.html';
}

// user durumunu kontrol etme
let CheckCred = () => {
    // Eğer kullanıcı bilgileri yoksa, giriş sayfasına yönlendir
    if (!UserCreds) {
        window.location.href = 'login.html';
    } else {
        MsgHead.innerText = `${UserCreds.email}`;
        GreetHead.innerText = `${UserInfo.firstname + " " + UserInfo.lastname}`;
    }
}

window.addEventListener('load', CheckCred);
SignoutBtn.addEventListener('click', Signout);
