const loginPage = async (event) => {

    document.getElementById('login-page').style.display = "block";
    document.getElementById('register-page').style.display = "none";
    document.title = "Login";
};

const registerPage = async (event) => {

    document.getElementById('login-page').style.display = "none";
    document.getElementById('register-page').style.display = "block";
    document.title = "Register";
};

document.getElementsByClassName('tab-login')[0].addEventListener('click', loginPage);
document.getElementsByClassName('tab-register')[0].addEventListener('click', registerPage);
document.getElementsByClassName('tab-login')[1].addEventListener('click', loginPage);
document.getElementsByClassName('tab-register')[1].addEventListener('click', registerPage);
document.addEventListener("DOMContentLoaded", function () {
    loginPage();
});