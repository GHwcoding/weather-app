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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tues", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
        ${day}
        <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="" />
        <span class="weather-forecast-temperature-max">63°</span>
        <span class="weather-forecast-temperature-min">50°</span>
      </div>
   `;
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
function displayCelciusTemp(event) {
  event.preventDefault();
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  document.querySelector("#current-temp").innerHTML =
    Math.round(celciusTemperature);
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  document.querySelector("#current-temp").innerHTML = Math.round(
    fahrenheitTemperature
  );
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
}

let fahrenheitTemperature = null;

let form = document.querySelector("#enter-city");
form.addEventListener("submit", handleSubmit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("San Francisco");
