window.addEventListener("load", function () {
  userLoginOrNot();
});

let email = document.getElementById("email");
let loginBTN = document.getElementById("loginBTN");
let password = document.getElementById("password");
let form = document.querySelector("form");

let email_error = document.getElementById("email_error");
let password_error = document.getElementById("password_error");
let loaderPerentDiv = document.getElementById("loaderPerentDiv");

function showLoader() {
  loaderPerentDiv.style.display = "flex";
}
function stopLoader() {
  loaderPerentDiv.style.display = "none";
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function handleError(err, type) {
  if (type === "email") {
    email_error.style.display = "block";
    email_error.innerText = err;
  } else if (type === "password") {
    password_error.style.display = "block";
    password_error.innerText = err;
  }
}

async function login() {
  showLoader();
  let users = getUsers();
  let userObject = users.find((e) => e.email === email.value);

  if (!userObject) {
    handleError("User not found!", "email");
    stopLoader();
    return;
  }
  if (userObject.password !== password.value) {
    handleError("Incorrect password!", "password");
    stopLoader();
    return;
  }

  userObject.timestamp = Date.now().toString();
  localStorage.setItem("users", JSON.stringify(users));

  localStorage.setItem("token", JSON.stringify({ previousUserID: userObject.id, timestamp: userObject.timestamp }));

  stopLoader();
  if (userObject.role === "superAdmin") {
    window.location.href = "../../Dashboard/superAdmin/super.html";
  } else {
    window.location.href = "../../Dashboard/admin/admin.html";
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  login();
});

function userLoginOrNot() {
  let token = JSON.parse(localStorage.getItem("token"));
  let users = getUsers();

  if (token) {
    let userObject = users.find((e) => e.id == token.previousUserID);
    if (userObject) {
      let getTime = (Date.now() - userObject.timestamp) / 1000;
      if (getTime < 250) {
        if (userObject.role === "superAdmin") {
          window.location.href = "../../Dashboard/superAdmin/super.html";
        } else {
          window.location.href = "../../Dashboard/admin/admin.html";
        }
      }
    }
  }
}


email.value = "satasiyaprince9510@gmail.com";
password.value = "Prince@123";
