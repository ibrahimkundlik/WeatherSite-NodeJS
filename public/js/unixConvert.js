const unixConvert = (unix) => {
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
	const time = date.toLocaleString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	return [
		`${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`,
		`${time}`,
	];
};

export default unixConvert;
