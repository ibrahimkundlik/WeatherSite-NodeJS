const form = document.querySelector("form");
const input = document.querySelector("#address");
const weatherErr = document.querySelector(".weather-err");
const search = document.querySelector(".search-logo");
const header = document.querySelector(".header-cont");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const url = `/weather?address=${input.value}`;
	weatherErr.innerHTML = `<img src="./images/loading.svg">`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.error) {
				weatherErr.innerHTML = `<p class="error">${data.error}</p>`;
			} else {
				console.log(data);
				displayCurrent(data.location, data.weatherData.current);
				displayDaily(data.weatherData.daily);
			}
		});
});

search.addEventListener("click", () => {
	form.classList.toggle("show-form");
	header.classList.toggle("mb");
	search.classList.toggle("close-form");
});

const displayCurrent = (current) => {};

const displayDaily = (daily) => {};

const convertUNIX = (unix) => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const date = new Date(unix * 1000);
	return {
		dayN: date.getDate(),
		month: months[date.getMonth()],
		dayW: days[date.getDay()],
	};
};
