const api_key = "add1e0fe278ce63d08a22b04dbcc2d20";
const defaultCity = "Delhi";
// Function to get current weather
async function getCurrentWeather(city) {
  const cityName = city || defaultCity;
  const currentWeatherUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=` +
    api_key;

  try {
    const response = await fetch(currentWeatherUrl);
    const data = await response.json();

    // Process and use current weather data here
    console.log("Current Weather:", data);

    // variable

    let temp = document.getElementById("temp");
    let overcast = document.getElementById("overcast");
    let icon = document.getElementById("icon");
    let sunrise = document.getElementById("sunrise");
    let sunset = document.getElementById("sunset");

    let humidity = document.getElementById("humidity");
    let pressure = document.getElementById("pressure");
    let visibility = document.getElementById("visibility");
    let feelsLike = document.getElementById("feels-like");
    const weatherIcon = document.querySelector(".weather-icon");

    temp.innerHTML = Math.floor(data.main.temp);

    overcast.innerHTML = data.weather[0].description;

    gettime();

    getSunrise(data);
    getSunset(data);

    humidity.innerHTML = data.main.humidity;
    pressure.innerHTML = `<h4 ">${data.main.pressure} <sub>hpa</sub></h3>`;
    visibility.innerHTML = `<h4>${(data.visibility / 1000).toFixed(
      1
    )}<sub>km</sub></h4>`;

    feelsLike.innerHTML = Math.floor(data.main.feels_like);

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./assets/images/weather_icons/04d.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./assets/images/weather_icons/01n.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./assets/images/weather_icons/11d.png";
    } else if (data.weather[0].main == "haze") {
      weatherIcon.src = "./assets/images/weather_icons/50n.png";
    } else if (data.weather[0].main == "snow") {
      weatherIcon.src = "./assets/images/weather_icons/13n.png";
    } else if (data.weather[0].main == "Smoke") {
      weatherIcon.src = "./assets/images/weather_icons/50d.png";
    } else if (data.weather[0].main == "Fog") {
      weatherIcon.src = "./assets/images/weather_icons/50d.png";
    }
  } catch (error) {
    console.error("Error fetching current weather:", error);
  }
}

// Function to get 5-day forecast
async function get5DayForecast(city) {
  const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=` +
    api_key;

  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();

    // Process and use 5-day forecast data here
    console.log("5-Day Forecast:", data);

    for (let i = 0; i < 5; i++) {
      const temp = Math.floor(data.list[i].main.temp);

      // Update temperature directly in the existing div container
      document.getElementById(`day${i + 1}temp`).innerHTML = `<p>${temp}°C</p>`;
    }

    const dateContainer = document.querySelectorAll(".date");
    const weekday = document.querySelectorAll(".week");
    for (let i = 0; i < dateContainer.length; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const formattedWeekday = currentDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
      // Update date elements with the formatted dates
      dateContainer[i].textContent = formattedDate;
      weekday[i].textContent = formattedWeekday;
    }

    const weatherImg = document.querySelectorAll(".weather-img");

    for (let i = 0; i < weatherImg.length; i++) {
      if (data.list[0].weather[0].main == "Clouds") {
        weatherImg[i].src = "./assets/images/weather_icons/04d.png";
      } else if (data.list[0].weather[0].main == "Clear") {
        weatherImg.src = "./assets/images/weather_icons/01d.png";
      } else if (data.list[0].weather[0].main == "Rain") {
        weatherImg[i].src = "./assets/images/weather_icons/11d.png";
      } else if (data.list[0].weather[0].main == "haze") {
        weatherImg[i].src = "./assets/images/weather_icons/50n.png";
      } else if (data.list[0].weather[0].main == "snow") {
        weatherImg[i].src = "./assets/images/weather_icons/13n.png";
      } else if (data.list[0].weather[0].main == "Smoke") {
        weatherImg[i].src = "./assets/images/weather_icons/50d.png";
      } else if (data.list[0].weather[0].main == "Fog") {
        weatherImg[i].src = "./assets/images/weather_icons/50d.png";
      }

      // hourrly
      function getHourlyData(data) {
        const currentTimestamp = Math.floor(Date.now() / 1000);

        for (let i = 1; i <= 6; i++) {
          const targetTimestamp = currentTimestamp + i * 3600;
          const index = data.list.findIndex(
            (entry) => entry.dt >= targetTimestamp
          );

          if (index !== -1) {
            const temperature = Math.floor(data.list[index].main.temp);
            const windSpeed = data.list[index].wind.speed;

            const date = new Date(targetTimestamp * 1000);

            const options = {
              hour: "numeric",
              hour12: true,
            };
            const formattedTime = new Intl.DateTimeFormat(
              "en-US",
              options
            ).format(date);
            const secondTime = new Intl.DateTimeFormat("en-US", options).format(
              date
            );

            // Update existing hour elements
            document.getElementById(
              `hour${i}`
            ).innerHTML = `<p>${temperature}°C</p>`;
            document.getElementById(`timesec${i}`).innerHTML = formattedTime;
            document.getElementById(`windtime${i}`).innerHTML = secondTime;
            document.getElementById(
              `wind${i}`
            ).innerHTML = `<p>${windSpeed.toFixed(1)}km/h</p>`;
          }
        }

        // for displaying img
        function displayimg() {
          const currentHour = new Date().getHours();

          // Assuming daytime is from 6 AM to 6 PM (adjust as needed)
          const isDaytime = currentHour >= 6 && currentHour < 18;

          // Set your image paths or URLs

          // Display images based on the time of day
          for (let i = 1; i <= 6; i++) {
            const imageElement = document.getElementById(`image${i}`);

            if (isDaytime) {
              imageElement.src = "./assets/images/weather_icons/01d.png";
            } else {
              imageElement.src = "./assets/images/weather_icons/01n.png";
            }
          }
        }
        displayimg();
      }

      getHourlyData(data);
    }
  } catch (error) {
    console.error("Error fetching 5-day forecast:", error);
  }
}

// date
function gettime() {
  // Create a new Date object representing the current date and time
  const currentDate = new Date();

  // Get the day (returns a number where 0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const day = currentDate.getDay();

  // Get the date (returns the day of the month)
  const date = currentDate.getDate();

  // Get the month (returns a number where 0 = January, 1 = February, ..., 11 = December)
  const month = currentDate.getMonth();

  // Create an array of month names for better readability
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Convert the numerical day and month values to strings
  const dayString = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][day];
  const monthString = monthNames[month];

  let dates = document.getElementById("time");
  dates.innerHTML = dayString + " " + date + "," + monthString;
}

function getSunrise(sun) {
  //  console.log(sun.sys)
  let sunrise = document.getElementById("sunrise");

  var sunriseDate = new Date(sun.sys.sunrise * 1000);

  var hours = sunriseDate.getHours();
  var minutes = sunriseDate.getMinutes();
  var seconds = sunriseDate.getSeconds();

  // Determine AM/PM
  var ampm = hours >= 12 ? "PM" : "AM";
  // var sampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  sunrise.innerHTML =
    hours + ":" + (minutes < 10 ? "0" : "") + minutes + "" + ampm;
}

function getSunset(set) {
  let sunset = document.getElementById("sunset");

  var sunsetDate = new Date(set.sys.sunset * 1000);

  var hours = sunsetDate.getHours();
  var minutes = sunsetDate.getMinutes();
  var seconds = sunsetDate.getSeconds();

  // Determine AM/PM
  var ampm = hours >= 12 ? "PM" : "AM";
  // var sampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  sunset.innerHTML =
    hours + ":" + (minutes < 10 ? "0" : "") + minutes + "" + ampm;
}

// handle city

function handleCityInput() {
  const cityInput = document.getElementById("cityInput");
  const cityname = document.getElementById("cityname");
  const city = cityInput.value;

  if (city) {
    getCurrentWeather(city);
    get5DayForecast(city);
    cityname.innerHTML = city;
  } else {
    alert("Please enter a city name");
  }
}

// Example usage with a button click
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", handleCityInput);

document.addEventListener("DOMContentLoaded", function () {
  getCurrentWeather(defaultCity);
  get5DayForecast(defaultCity);
});

// ---------------------->------------//

function togllerRap() {
  const searchView = document.querySelector(".search-view ");
  const btn = document.querySelector(".btn");
  const arrowBtn = document.querySelector("[ arrow-btn]");
  const searchButton = document.querySelector(".searchbutton");
  btn.addEventListener("click", () => {
    searchView.classList.toggle("active");
  });
  arrowBtn.addEventListener("click", () => {
    searchView.classList.toggle("active");
  });
  searchButton.addEventListener("click", () => {
    searchView.classList.toggle("active");
  });
}

togllerRap();
