const weather = document.querySelector("#weather");

const GEO_LOCATION = "geolocation";
const API_KEY = "4377df83e1b5442e01270e1ccc41bc91";

function savePosition(obj) {
  localStorage.setItem(GEO_LOCATION, JSON.stringify(obj));
}

function getWeatherInfo(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const temp = data.main.temp;
      const city = data.name;
      weather.innerHTML = `${temp}&#8451; @ ${city}`;
    });
}

function handleError(error) {
  console.log("Can not access your location!");
}

function handleSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const geolocationObj = { lat, lon };
  getWeatherInfo(lat, lon);
  savePosition(geolocationObj);
}

function loadPosition() {
  const loadedGeolocation = localStorage.getItem(GEO_LOCATION);
  if (loadedGeolocation) {
    const geolocationObj = JSON.parse(loadedGeolocation);
    getWeatherInfo(geolocationObj.lat, geolocationObj.lon);
  } else {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }
}

function init() {
  loadPosition();
}

init();
