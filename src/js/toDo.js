const toDoForm = document.querySelector("#toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(e) {
  const delBtn = e.target;
  const li = delBtn.parentNode;
  toDos = toDos.filter((toDoObj) => {
    return toDoObj.id !== parseInt(li.id, 10);
  });
  li.remove();
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(toDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  li.id = newId;
  span.innerHTML = toDo;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  const toDoObj = {
    id: newId,
    toDo,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(e) {
  e.preventDefault();
  const toDo = toDoInput.value;
  paintToDo(toDo);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (!loadedToDos) {
    return;
  }
  const parsedToDos = JSON.parse(loadedToDos);
  parsedToDos.forEach((toDoObj) => {
    const toDo = toDoObj.toDo;
    paintToDo(toDo);
  });
}

function init() {
  toDoForm.addEventListener("submit", handleSubmit);
  loadToDos();
}

init();
