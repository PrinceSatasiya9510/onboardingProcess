window.addEventListener("load", function () {
  userLoginOrNot();
});

const form = document.querySelector("form");
let name = document.getElementById("name");
let email = document.getElementById("email");

let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");

let name_error = document.getElementById("name_error");
let email_error = document.getElementById("email_error");

let password_error = document.getElementById("password_error");
let confirmPassword_error = document.getElementById("confirmPassword_error");

let loaderPerentDiv = document.getElementById("loaderPerentDiv");

function showLoader() {
  loaderPerentDiv.style.display = "flex";
}
function stopLoader() {
  loaderPerentDiv.style.display = "none";
}

function getUsers() {
  return JSON.parse(localStorage.getItem("adminDetail")) || [];
}

function saveUsers(users) {
  localStorage.setItem("adminDetail", JSON.stringify(users));
}



async function inputFieldErrorMessages() {
  showLoader();
  let isValid = true;

  const fields = [
    { input: name, error: name_error, message: "Name is required" },
    { input: email, error: email_error, message: "Email is required" },
    { input: password, error: password_error, message: "Password is required" },
    { input: confirmPassword, error: confirmPassword_error, message: "Confirm Password is required" },
  ];

  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  fields.forEach(({ input, error, message }) => {
    if (!input.value.trim()) {
      error.innerText = message;
      error.style.display = "block";
      isValid = false;
    } else {
      error.style.display = "none";
    }
  });

  if (!emailRegex.test(email.value)) {
    email_error.innerText = "Enter Valid Email";
    email_error.style.display = "block";
    isValid = false;
  }



  if (password.value !== confirmPassword.value) {
    confirmPassword_error.style.display = "block";
    confirmPassword_error.innerText = "Passwords must match!";
    isValid = false;
  }

  let users = getUsers();
  if (users.some((u) => u.email === email.value)) {
    email_error.innerText = "Email already exists!";
    email_error.style.display = "block";
    isValid = false;
  }


  stopLoader();
  return isValid;
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let valid = await inputFieldErrorMessages();
  if (!valid) return;
  register();
});

function register() {
  showLoader();
  let users = getUsers();

  let newUser = {
    id: Date.now().toString(),
    name: name.value,
    email: email.value,
    password: confirmPassword.value,
    role: "admin",
    status: false,
    companies_id: [],
    timestamp: Date.now().toString()
  };

  users.push(newUser);
  saveUsers(users);

  localStorage.setItem("token", JSON.stringify({ previousUserID: newUser.id, timestamp: newUser.timestamp }));

  stopLoader();
  if (newUser.email === "satasiyaprince9510@gmail.com") {
    window.location.href = "../../Dashboard/superAdmin/super.html";
  } else {
    window.location.href = "../../Dashboard/admin/admin.html";
  }
}

function userLoginOrNot() {
  let token = JSON.parse(localStorage.getItem("token"));
  let users = getUsers();

  if (token) {
    let userObject = users.find((e) => e.id == token.previousUserID);
    if (userObject) {
      let getTime = (Date.now() - userObject.timestamp) / 1000;
      if (getTime < 250) {
        if (userObject.email === "satasiyaprince9510@gmail.com") {
          window.location.href = "../../Dashboard/superAdmin/super.html";
        } else {
          window.location.href = "../../Dashboard/admin/admin.html";
        }
      }
    }
  }
}
