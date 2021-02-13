import unixConvert from "./unixConvert.js";

const form = document.querySelector("form");
const input = document.querySelector("#address");
const weatherErr = document.querySelector(".weather-err");
const search = document.querySelector(".search-logo");
const header = document.querySelector(".header-cont");
const currentSection = document.querySelector(".current");
const dailySection = document.querySelector(".daily-cont");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const url = `/weather?address=${input.value}`;
	fetchAPI(url);
});

search.addEventListener("click", () => {
	form.classList.toggle("show-form");
	header.classList.toggle("mb");
	search.classList.toggle("close-form");
});

const fetchAPI = (url) => {
	weatherErr.innerHTML = `<img src="./images/loading.svg" class="loading">`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.error) {
				weatherErr.innerHTML = `<p class="error">${data.error}</p>`;
			} else {
				displayCurrent(
					data.location,
					data.weatherData.current,
					data.weatherData.timezone_offset
				);
				displayDaily(data.weatherData.daily);
				input.value = "";
				weatherErr.innerHTML = "";
				document.documentElement.style.setProperty(
					"--bg-image",
					`url("../images/night${
						Math.floor(Math.random() * (3 - 1 + 1)) + 1
					}.jpg")`
				);
			}
		});
};

const displayCurrent = (location, current, offset) => {
	const otherData = [
		["Feels like", current.feels_like + "°C"],
		["Humidity", current.humidity + "%"],
		["Sunrise", unixConvert(current.sunrise + offset)[1]],
		["Sunset", unixConvert(current.sunset + offset)[1]],
		["Wind speed", current.wind_speed + "m/s"],
		["Dew point", current.dew_point + "°C"],
	];

	let otherDataHTML = "";
	otherData.forEach((each) => {
		otherDataHTML += `
		<div class="l-info">
			<h3 class="info-val">${each[1]}</h3>
			<p class="info-param">${each[0]}</p>
		</div>
		`;
	});

	currentSection.innerHTML = `
	<div class="main-info">
		<div class="temp-info">
			<h2 class="location">${location.split(",")[0]}</h2>
			<p class="date">${unixConvert(current.dt)[0]}</p>
			<p class="temp">${current.temp}°C</p>
		</div>
		<div class="temp-cont">
			<div class="weather-icon-cont">
				<img
					src="http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png"
					alt="icon"
				/>
			</div>
			<p class="temp-desc">${current.weather[0].description}</p>
		</div>
	</div>
	<div class="other-info">${otherDataHTML}</div>
	`;
};

const displayDaily = (daily) => {
	let dailyHTML = "";
	daily.forEach((each) => {
		dailyHTML += `
	<div class="daily">
		<p class="daily-date">${unixConvert(each.dt)[0]}</p>
		<div class="daily-icon">
			<img src="http://openweathermap.org/img/wn/${
				each.weather[0].icon
			}@2x.png" alt="icon" />
		</div>
		<p class="daily-temp">${each.temp.day}°C</p>
		<p class="daily-desc">${each.weather[0].description}</p>
	</div>
	`;
	});
	dailySection.innerHTML = `
	<h3 class="daily-header">8-Day Forecast</h3>
	${dailyHTML}
	`;
};

window.onload = () => {
	input.value = "Mumbai";
	search.click();
	document.querySelector(".submit").click();
};
