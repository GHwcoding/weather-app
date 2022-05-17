let now = new Date();
let dayIndex = now.getDay();
let monthIndex = now.getMonth();
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[dayIndex];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[monthIndex];

let dateElement = document.querySelector("#date");
dateElement.innerHTML = `${day}, ${month} ${date}`;
let timeElement = document.querySelector("#time");
timeElement.innerHTML = `Last Updated: ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        ${formatDay(forecastDay.dt)}
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="80" />
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
   `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let unit = "imperial";
  let apiKey = "88310d11c396b0c7af7be4b1dfda46f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  search(city);
}
function search(city) {
  let unit = "imperial";
  let apiKey = "88310d11c396b0c7af7be4b1dfda46f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeatherConditions);
}
function showWeatherConditions(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  fahrenheitTemperature = response.data.main.temp;
  document.querySelector("#current-temp").innerHTML = Math.round(
    fahrenheitTemperature
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  getForecast(response.data.coord);
}

let form = document.querySelector("#enter-city");
form.addEventListener("submit", handleSubmit);

search("San Francisco");
