const body = document.querySelector("body");

const IMG_NUMBER = 13;

function paintImage(imgNumber) {
  body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
  url("src/bg/${imgNumber}.jpg")`;
}

function getNumber() {
  const number = Math.floor(Math.random() * IMG_NUMBER) + 1;
  return number;
}

function init() {
  const randomNumber = getNumber();
  paintImage(randomNumber);
}

init();
