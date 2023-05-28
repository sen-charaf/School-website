let username = document.getElementById("username-input");
let password = document.getElementById("secret");
let popup = document.getElementById("popup");
let var1, var2;
let tab = [];
tab = (JSON.parse(localStorage.getItem("tasks")));
document.getElementById("loginbutton").onclick = function () {
    if (!localStorage.getItem("tasks")) {
        openPopup();
        return false;
    }
    if (username.value === "" || password.value === "")
        return false;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].username === username.value && tab[i].password === password.value) {
            var1 = tab[i].username;
            var2 = tab[i].email;
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.setItem("username", var1);
            localStorage.setItem("email", var2);
            location.href = "/bulletin/bulletin.html";
            return true;
        }
    }
    openPopup();
    return false;
}
function openPopup() {
    popup.classList.add("open-popup");
}
function closePopup() {
    popup.classList.remove("open-popup");
}