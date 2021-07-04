const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocodeAPI = require("./utils/geocodeAPI");
const weatherAPI = require("./utils/weatherAPI");
const wakeUpDyno = require("./dyno.js");

const app = express();
const port = process.env.PORT || 3000;

//path variables
const dirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
//static content (html, css, js, images)
app.use(express.static(dirPath));
//dynamic content (hbs files)
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

const APP_URL = "https://weather-site-ik.herokuapp.com/";

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Please provide location in above input box !",
		});
	}
	geocodeAPI(req.query.address, (error, geoData) => {
		if (error) {
			return res.send({ error });
		}
		weatherAPI(geoData, (error, weatherData) => {
			if (error) {
				return res.send({ error });
			}
			const { location } = geoData;
			return res.send({ location, weatherData });
		});
	});
});

app.get("*", (req, res) => {
	res.sendFile(dirPath + "/errorPage.html");
});

app.listen(port, () => {
	console.log("Express server started.");
	wakeUpDyno(APP_URL);
});
