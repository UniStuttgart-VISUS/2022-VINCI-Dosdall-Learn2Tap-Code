import React from "react";
import Axios from "axios";

export function clearCookie(arrayCurr) {
	var resultsArr = [];
	var currVal = "";
	for (var i = 0; i < arrayCurr.length; i++) {
		if (arrayCurr[i] != "[" && arrayCurr[i] != '"') {
			if (arrayCurr[i] == "," || arrayCurr[i] == "]") {
				resultsArr.push(currVal);
				currVal = "";
			} else {
				currVal = currVal + arrayCurr[i];
			}
		}
		if (arrayCurr[i] === arrayCurr[i + 1] && currVal === "") {
			resultsArr.push(arrayCurr[i]);
			i++;
		}
	}

	for (var i = 0; i < resultsArr.length; i++) {
		if (resultsArr[i] === "") {
			resultsArr.splice(i, 1);
			i--;
		}
	}

	if (resultsArr.indexOf("\\\\") !== -1) {
		var currIn = resultsArr.indexOf("\\\\");
		var modify = resultsArr[currIn];
		modify = modify[0];
		resultsArr[currIn] = modify;
	}
	if (resultsArr.indexOf("<br>") !== -1) {
		var currIn2 = resultsArr.indexOf("<br>");
		var modify2 = ",";

		resultsArr[currIn2] = modify2;
	}
	if (resultsArr.indexOf(";<br>") !== -1) {
		var currIn3 = resultsArr.indexOf(";<br>");
		var modify3 = ";";

		resultsArr[currIn3] = modify3;
	}
	return resultsArr;
}

export function clearCookieShift(arrayCurr) {
	var resultsArr = [];
	var currVal = "";
	var countBR = 0;

	for (var i = 0; i < arrayCurr.length; i++) {
		if (arrayCurr[i] != "[" && arrayCurr[i] != '"') {
			if ((arrayCurr[i] == "," || arrayCurr[i] == "]") && currVal !== "") {
				resultsArr.push(currVal + ",");
				currVal = "";
			} else {
				currVal = currVal + arrayCurr[i];
				if (currVal.indexOf("<br>") !== -1) {
					countBR = countBR + 1;
					if (countBR === 1) {
						currVal = ",";
					} else if (countBR === 2) {
						currVal = ";";
					}
				}
			}
		}
	}

	return resultsArr;
}

export function addStatisticToDatabase(
	userID,
	symbols,
	statistic,
	unitLevelID,
	stars,
	typinmode
) {
	if (typinmode === "singleTap") {
		Axios.post(
			"http://localhost:3001/statisticSingleTap",

			{
				id: userID,
				symbols: symbols,
				statistic: statistic,
				unitLevelID: unitLevelID,
				stars: stars,
			}
		).then((response) => {
			return true;
		});
	} else if (typinmode === "doubleTap") {
		Axios.post(
			"http://localhost:3001/statisticDoubleTap",

			{
				id: userID,
				symbols: symbols,
				statistic: statistic,
				unitLevelID: unitLevelID,
				stars: stars,
			}
		).then((response) => {
			return true;
		});
	} else if (typinmode === "tripleTap") {
		Axios.post(
			"http://localhost:3001/statisticTripleTap",

			{
				id: userID,
				symbols: symbols,
				statistic: statistic,
				unitLevelID: unitLevelID,
				stars: stars,
			}
		).then((response) => {
			return true;
		});
	} else if (typinmode === "switch") {
		Axios.post(
			"http://localhost:3001/statisticSwitch",

			{
				id: userID,
				symbols: symbols,
				statistic: statistic,
				unitLevelID: unitLevelID,
				stars: stars,
			}
		).then((response) => {
			return true;
		});
	} else if (typinmode === "shift") {
		Axios.post(
			"http://localhost:3001/statisticShift",

			{
				id: userID,
				symbols: symbols,
				statistic: statistic,
				unitLevelID: unitLevelID,
				stars: stars,
			}
		).then((response) => {
			return true;
		});
	}
}

export function sendUserTracking(userID, event, eventName, location) {
	Axios.post(
		"http://localhost:3001/userTracking",

		{
			id: userID,
			event: event,
			eventName: eventName,
			location: location,
		}
	);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	clearCookie,
	clearCookieShift,
	addStatisticToDatabase,
	sendUserTracking,
};
