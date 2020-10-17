const clock = document.querySelector("#clock");

function paintTime(hours, minutes, seconds) {
  clock.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  paintTime(hours, minutes, seconds);
}

function init() {
  setInterval(getTime, 1000);
}

init();
