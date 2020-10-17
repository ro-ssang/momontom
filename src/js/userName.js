const userNameForm = document.querySelector("#userNameForm");
const userNameInput = userNameForm.querySelector("input");
const userName = document.querySelector("#userName");

const USER_NAME_LS = "userName";

function saveUserName(name) {
  localStorage.setItem(USER_NAME_LS, name);
}

function paintUserName(name) {
  userName.innerHTML = `Hello, ${name}`;
}

function handleSubmit(e) {
  e.preventDefault();
  const name = userNameInput.value;
  paintUserName(name);
  saveUserName(name);
  showUserName();
}

function hideUserName() {
  userNameForm.classList.remove("hidden");
  userName.classList.add("hidden");
}

function showUserName() {
  userNameForm.classList.add("hidden");
  userName.classList.remove("hidden");
}

function loadUserName() {
  const loadedUserName = localStorage.getItem(USER_NAME_LS);
  if (loadedUserName) {
    showUserName();
    paintUserName(loadedUserName);
  } else {
    hideUserName();
  }
}

function init() {
  loadUserName();
  userNameForm.addEventListener("submit", handleSubmit);
}

init();
