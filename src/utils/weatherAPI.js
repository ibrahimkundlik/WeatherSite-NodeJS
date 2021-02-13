const request = require("postman-request");

const weatherAPI = (geoData, callback) => {
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${geoData.latitude}&lon=${geoData.longitude}&exclude=hourly,minutely,alerts&appid=e2ed03faf91a3e8a0062d1267a5d2b8c&units=metric`;

	request({ url, json: true }, (error, response) => {
		if (error) {
			callback("Unable to connect to weather service !");
		} else {
			const data = response.body;
			if (data.cod === 401) {
				callback("Invalid API key. Please visit openweathermap for more info.");
			} else {
				callback(undefined, data);
			}
		}
	});
};

module.exports = weatherAPI;
