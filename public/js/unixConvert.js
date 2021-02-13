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
	let hour = date.getUTCHours();
	let mins = date.getUTCMinutes();
	if (hour < 10) hour = "0" + hour;
	if (mins < 10) mins = "0" + mins;

	return [
		`${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`,
		`${hour}:${mins}`,
	];
};

export default unixConvert;
