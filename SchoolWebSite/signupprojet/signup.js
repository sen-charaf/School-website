let username = document.getElementById("input1");
let email = document.getElementById("input2");
let password = document.getElementById("input3");
let password2 = document.getElementById("input4");
let popup = document.getElementById("popup");
let ErrorPopup = document.getElementById("popup2");
let usernameError = document.getElementById("username-error");
let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");
let password2Error = document.getElementById("password2-error");
let tab = [];
document.getElementById("mybutton").onclick = function () {

    if (!ValidationUsername() || !ValidationEmail() || !validationPassword() || !validationPassword2()) {
        return false;
    }
    if (localStorage.getItem("tasks")) {
        tab = JSON.parse(localStorage.getItem("tasks"));
    }
    let checkvalue = check(tab, username.value, email.value);
    if (checkvalue == 0) {
        openPopup2();
        username.value = "";
        email.value = "";
        password.value = "";
        password2.value = "";
    }
    else if (checkvalue) {
        addTaskToArray(username.value, email.value, password.value, password2.value);
        openPopup();
        username.value = "";
        email.value = "";
        password.value = "";
        password2.value = "";
    }
}
function addTaskToArray(username, email, password, password2) {
    const task = {
        username: username,
        email: email,
        password: password,
        password2: password2,
    };
    tab.push(task);
    addDataToLocalStorage(tab);
}
function addDataToLocalStorage(tab) {
    localStorage.setItem("tasks", JSON.stringify(tab));
}
function check(tab, username, email) {
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].username === username || tab[i].email === email)
            return 0;
    }
    return 1;
}
function ValidationEmail() {
    if (email.value.trim() === "") {
        emailError.innerHTML = "email is required";
        emailError.style.color = "red";
        return false;
    }
    if (!email.value.match((/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/))) {
        emailError.innerHTML = 'please enter a valid email';
        emailError.style.color = "red";
        return false;
    }
    else {
        emailError.innerHTML = '';
        return true;
    }
}
function ValidationUsername() {
    if (username.value.trim() === "") {
        usernameError.innerHTML = "username is required";
        usernameError.style.color = "red";
        return false;
    }
    if ((username.value.trim()).length < 3) {
        usernameError.innerHTML = 'please enter a valid username';
        usernameError.style.color = "red";
        return false;
    }
    else {
        usernameError.innerHTML = '';
        return true;
    }
}
function validationPassword() {
    if (password.value.trim() === "") {
        passwordError.innerHTML = "password is required";
        passwordError.style.color = "red";
        return false;
    }
    if ((password.value.trim()).length < 8) {
        passwordError.innerHTML = 'please enter min 8 caracters';
        passwordError.style.color = "red";
        return false;
    }
    else {
        passwordError.innerHTML = '';
        return true;
    }
}
function validationPassword2() {
    if (password2.value.trim() === "") {
        password2Error.innerHTML = "password is required";
        password2Error.style.color = "red";
        return false;
    }
    if (password.value !== password2.value) {
        password2Error.innerHTML = 'password does not match';
        password2Error.style.color = "red";
        return false;
    }
    else {
        password2Error.innerHTML = '';
        return true;
    }
}
function openPopup() {
    popup.classList.add("open-popup");
}
function closePopup() {
    popup.classList.remove("open-popup");
}
function openPopup2() {
    ErrorPopup.classList.add("open-popup");
}
function closePopup2() {
    ErrorPopup.classList.remove("open-popup");
}