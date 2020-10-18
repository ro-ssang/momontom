const userNameForm = document.querySelector("#userNameForm");
const userNameInput = userNameForm.querySelector("input");
const userName = document.querySelector("#userName");
const userNameWrapper = document.querySelector("#userNameWrapper");
const userNameGreeting = document.querySelector("#userNameGreeting");
const siteName = document.querySelector("#siteName");
const toDoList = document.querySelector("#toDoList");
const editBtn = document.querySelector("#editBtn");
// const toDoForm = document.querySelector("#toDoForm");

const USER_NAME_LS = "userName";

function clickEditBtn() {
  userNameForm.classList.remove("hidden");
  toDoForm.classList.add("hidden");
  userNameInput.placeholder = "Change your name...";
}

function saveUserName(name) {
  localStorage.setItem(USER_NAME_LS, name);
}

function paintUserName(name) {
  userName.innerHTML = `${name}`;
}

function handleSubmit(e) {
  e.preventDefault();
  const name = userNameInput.value;
  paintUserName(name);
  saveUserName(name);
  showUserName();
  userNameInput.value = "";
}

function hideUserName() {
  userNameForm.classList.remove("hidden");
  userNameWrapper.classList.add("hidden");
  siteName.classList.remove("hidden");
  toDoForm.classList.add("hidden");
  toDoList.classList.add("hidden");
  userNameGreeting.innerHTML = "Welcome to";
}

function showUserName() {
  userNameForm.classList.add("hidden");
  userNameWrapper.classList.remove("hidden");
  siteName.classList.add("hidden");
  toDoForm.classList.remove("hidden");
  toDoList.classList.remove("hidden");
  userNameGreeting.innerHTML = "Hello,";
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
  editBtn.addEventListener("click", clickEditBtn);
}

init();
