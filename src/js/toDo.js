const toDoForm = document.querySelector("#toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pendingList = document.querySelector("#pending-list");
const finishedList = document.querySelector("#finished-list");

const PENDING_LS = "pending";
const FINISHED_LS = "finished";

let pending = [];
let finished = [];

function moveToPending(e) {
  const icon = e.target;
  const finishBtn = icon.parentNode;
  const li = finishBtn.parentNode;
  const span = li.childNodes[2];
  const toDo = span.innerHTML;
  li.remove();
  const filteredFinished = finished.filter((toDoObj) => {
    return toDoObj.id !== parseInt(li.id, 10);
  });
  finished = filteredFinished;
  saveFinished();
  paintPending(toDo);
}

function finishToDo(e) {
  const icon = e.target;
  const finishBtn = icon.parentNode;
  const li = finishBtn.parentNode;
  const span = li.childNodes[2];
  const toDo = span.innerHTML;
  li.remove();
  const filteredPending = pending.filter((toDoObj) => {
    return toDoObj.id !== parseInt(li.id, 10);
  });
  pending = filteredPending;
  savePending();
  paintFinished(toDo);
}

function deleteFinished(e) {
  const icon = e.target;
  const delBtn = icon.parentNode;
  const li = delBtn.parentNode;
  li.remove();
  const filteredFinished = finished.filter((toDoObj) => {
    return toDoObj.id !== parseInt(li.id, 10);
  });
  finished = filteredFinished;
  saveFinished();
}

function deletePending(e) {
  const icon = e.target;
  const delBtn = icon.parentNode;
  const li = delBtn.parentNode;
  pending = pending.filter((toDoObj) => {
    return toDoObj.id !== parseInt(li.id, 10);
  });
  li.remove();
  savePending();
}

function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function savePending() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pending));
}

function paintFinished(toDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("span");
  const moveBtn = document.createElement("span");
  const newId = finished.length + 1;
  li.id = newId;
  span.innerHTML = toDo;
  delBtn.innerHTML = `<i class="fas fa-minus-circle"></i>`;
  delBtn.className = "delete-btn";
  moveBtn.innerHTML = `<i class="fas fa-undo-alt"></i>`;
  moveBtn.className = "move-btn";
  delBtn.addEventListener("click", deleteFinished);
  moveBtn.addEventListener("click", moveToPending);
  li.appendChild(moveBtn);
  li.appendChild(delBtn);
  li.appendChild(span);
  finishedList.prepend(li);
  const toDoObj = {
    id: newId,
    toDo,
  };
  finished.push(toDoObj);
  saveFinished();
}

function paintPending(toDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("span");
  const finishBtn = document.createElement("span");
  const newId = pending.length + 1;
  li.id = newId;
  span.innerHTML = toDo;
  delBtn.innerHTML = `<i class="fas fa-minus-circle"></i>`;
  delBtn.className = "delete-btn";
  finishBtn.innerHTML = `<i class="fas fa-check"></i>`;
  finishBtn.className = "finish-btn";
  delBtn.addEventListener("click", deletePending);
  finishBtn.addEventListener("click", finishToDo);
  li.appendChild(finishBtn);
  li.appendChild(delBtn);
  li.appendChild(span);
  pendingList.prepend(li);
  const toDoObj = {
    id: newId,
    toDo,
  };
  pending.push(toDoObj);
  savePending();
}

function handleSubmit(e) {
  e.preventDefault();
  const toDo = toDoInput.value;
  paintPending(toDo);
  toDoInput.value = "";
}

function loadFinished() {
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (!loadedFinished) {
    return;
  }
  const parsedFinished = JSON.parse(loadedFinished);
  parsedFinished.forEach((toDoObj) => {
    paintFinished(toDoObj.toDo);
  });
}

function loadPending() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  if (!loadedPending) {
    return;
  }
  const parsedPending = JSON.parse(loadedPending);
  parsedPending.forEach((toDoObj) => {
    const toDo = toDoObj.toDo;
    paintPending(toDo);
  });
}

function init() {
  toDoForm.addEventListener("submit", handleSubmit);
  loadPending();
  loadFinished();
}

init();
