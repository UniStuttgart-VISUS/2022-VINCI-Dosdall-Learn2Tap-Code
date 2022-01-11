const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

/** --------------- simple Functions-------------------------------------------------------------------------------- */

//Help function to format array
function createArray(arrayCurr) {
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
	}
	return resultsArr;
}

//Database connection --> Here adjust the data to own database
const dbUser = mysql.createConnection({
	host: "localhost",
	user: "root", //'tap_user',
	password: "password", //'tapstraplogin',
	database: "tapstrapapp",
});
/**----------------------------------Overview------------------------------------------------------------------------ */

//GET - Glossary
app.get("/getGlossary/:currHand", (req, res) => {
	const hand = req.params.currHand;
	var registerdID = 0;
	dbUser.query(
		"SELECT id, righthand, lefthand, single, doubletap, triple, switch, shift FROM levels ",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)));

				res.send([resultJson]);
			}
		}
	);
});

/** -------------------------------- User Administration ----------------------------------------------------------------- */
//Create a new user if the name  doesn't alread exist
app.get("/createUser/:name/:hand", (req, res) => {
	const name = req.params.name;
	const hand = req.params.hand;
	var registerdID = 0;
	dbUser.query("SELECT * FROM user WHERE name = ?", name, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			if (result[0] == undefined) {
				console.log("Create User");
				dbUser.query(
					"INSERT INTO user (name, hand) VALUES(?,?)",
					[name, hand],
					(err, result) => {
						if (err) {
							console.log(err);
						} else {
							registerdID = result.insertId;
							dbUser.query(
								"INSERT INTO singletab (userID) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);
							dbUser.query(
								"INSERT INTO singletabstars (id) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);

							dbUser.query(
								"INSERT INTO doubletapstars (userID) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);

							dbUser.query(
								"INSERT INTO doubletap (userID) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);

							dbUser.query(
								"INSERT INTO tripletapstars (userID) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);
							dbUser.query(
								"INSERT INTO shiftstars (userID) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);
							dbUser.query(
								"INSERT INTO switchstars (userID) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);

							dbUser.query(
								"INSERT INTO tripletap (userID) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);

							dbUser.query(
								"INSERT INTO shift (userID) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);

							dbUser.query(
								"INSERT INTO switch (userID) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);

							dbUser.query(
								"INSERT INTO timetohitscore (userID) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);
							dbUser.query(
								"INSERT INTO fivetimes (userID) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);
							dbUser.query(
								"INSERT INTO codinggame (userID) VALUES(?);",
								registerdID,
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);

							res.send(result);
						}
					}
				);
			} else {
				console.log("User exist");
				res.send(false);
			}
		}
	});
});

// forwards user Tracking infromation to Database
app.post("/userTracking", (req, res) => {
	const id = req.body.id;
	const event = req.body.event;
	const eventName = req.body.eventName;
	const location = req.body.location;
	if (id != -1) {
		dbUser.query(
			"INSERT INTO usertracking (userID, event, eventName, location) VALUES(?,?,?,?)",
			[id, event, eventName, location],
			(err, result) => {
				if (err) {
					console.log(err);
				} else {
					res.send(["Done User Tracking"]);
				}
			}
		);
	}
});

//GET all possible users
app.get("/Users/:initialize", (req, res) => {
	dbUser.query("SELECT * FROM user", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

// GET a specific user
app.get("/specificUser/:name", (req, res) => {
	const name = req.params.name;
	dbUser.query("SELECT * FROM user WHERE name = ? ", name, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

//GET username by id
app.get("/getSpecificUserName/:currCookieID", (req, res) => {
	const userID = req.params.currCookieID;

	dbUser.query("SELECT name FROM user WHERE id = ? ", userID, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send([result[0].name]);
		}
	});
});

/**---------------------------Single Tap------------------------------------------------------------------------------------------- */

//GET - Single Tap Menu
app.get("/getSingleTabMenu", (req, res) => {
	dbUser.query(
		"SELECT nameModus,singletap FROM overviewmenu",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)));
				var moduArr = [];
				var levelsArr = [];

				for (var i = 0; i < resultJson.length; i++) {
					moduArr.push(resultJson[i].nameModus);
					levelsArr.push(resultJson[i].singletap);
				}

				res.send([moduArr, levelsArr]);
			}
		}
	);
});

//GET - Single Tap Stars for Single Tap menu view
app.get("/getSingleTabStar/:userID", (req, res) => {
	const id = req.params.userID;

	dbUser.query("SELECT * FROM singletabstars WHERE id=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];
			var starsTotal = 0;
			var starsTotalArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
			const keys = Object.keys(resultJson);
			// iterate over object
			keys.forEach((key, index) => {
				if (key != "id") {
					starsTotal = starsTotal + resultJson[key];
				}
				if (key.includes("U1")) {
					starsTotalArray[0] = starsTotalArray[0] + resultJson[key];
				} else if (key.includes("U2")) {
					starsTotalArray[1] = starsTotalArray[1] + resultJson[key];
				} else if (key.includes("U3")) {
					starsTotalArray[2] = starsTotalArray[2] + resultJson[key];
				} else if (key.includes("U4")) {
					starsTotalArray[3] = starsTotalArray[3] + resultJson[key];
				} else if (key.includes("U5")) {
					starsTotalArray[4] = starsTotalArray[4] + resultJson[key];
				} else if (key.includes("U6")) {
					starsTotalArray[5] = starsTotalArray[5] + resultJson[key];
				} else if (key.includes("U7")) {
					starsTotalArray[6] = starsTotalArray[6] + resultJson[key];
				} else if (key.includes("U8")) {
					starsTotalArray[7] = starsTotalArray[7] + resultJson[key];
				} else if (key.includes("U9")) {
					starsTotalArray[8] = starsTotalArray[8] + resultJson[key];
				}
			});
			res.send([0, starsTotal, starsTotalArray]);
		}
	});
});

//GET - Statistic about particular learning Uni from Single Tap
app.get("/getSingleTapStatistic/:value/:symbols", (req, res) => {
	const id = req.params.value;
	const symbols = createArray(req.params.symbols + ",");

	dbUser.query("SELECT * FROM singletab WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			// print all keys
			var statisticArr = [];
			// [ 'java', 'javascript', 'nodejs', 'php' ]
			for (var i = 0; i < symbols.length; i++) {
				// iterate over object
				keys.forEach((key, index) => {
					if (symbols[i] === key) {
						statisticArr.push(resultJson[key]);
					}
				});
			}

			res.send([statisticArr]);
		}
	});
});

// GET - stars for a prticualr Learning Unit inside Single Tap
app.get("/getSingleTapStarsUnit/:value/:unitID", (req, res) => {
	const id = req.params.value;
	const unitId = req.params.unitID;

	dbUser.query("SELECT * FROM singletabstars WHERE id=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			var starsTotalArray = [];
			const keys = Object.keys(resultJson);
			// iterate over object
			keys.forEach((key, index) => {
				if (key.includes(unitId)) {
					starsTotalArray.push(resultJson[key]);
				}
			});

			res.send([starsTotalArray]);
		}
	});
});

//GET - symbols whit Tap Combination for Single Tap
app.get("/getSymbolArraySingleTab/:symbolIds/:rightHand/:value", (req, res) => {
	const symbolIds = req.params.symbolIds;
	const rightHand = req.params.rightHand;
	const userID = req.params.value;

	dbUser.query(
		"SELECT id, righthand, lefthand, single FROM levels",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)));
				var symbolArray = [];
				var combinationArray = [];
				var allSymbolArray = [];
				var allCombinationArray = [];
				var smallestNum = symbolIds[0] + symbolIds[1];

				if (smallestNum.includes(",")) {
					smallestNum = symbolIds[0];
				}

				const keys = Object.keys(resultJson);

				for (var i = 0; i < resultJson.length; i++) {
					if (resultJson[i].id < smallestNum) {
						allSymbolArray.push(resultJson[i].single);
						if (rightHand === "true") {
							allCombinationArray.push(resultJson[i].righthand);
						} else {
							allCombinationArray.push(resultJson[i].lefthand);
						}
					}

					if (
						symbolIds.includes(resultJson[i].id) &&
						resultJson[i].id >= smallestNum
					) {
						symbolArray.push(resultJson[i].single);
						allSymbolArray.push(resultJson[i].single);
						if (rightHand === "true") {
							combinationArray.push(resultJson[i].righthand);
							allCombinationArray.push(resultJson[i].righthand);
						} else {
							combinationArray.push(resultJson[i].lefthand);
							allCombinationArray.push(resultJson[i].lefthand);
						}
					}
				}

				res.send([
					symbolArray,
					combinationArray,
					allSymbolArray,
					allCombinationArray,
				]);
			}
		}
	);
});

//POST - reached points/ new statistic for Single Tap
app.post("/statisticSingleTap", (req, res) => {
	const id = req.body.id;
	const letter = req.body.symbols;
	const resultStat = req.body.statistic;
	const unitLevelID = req.body.unitLevelID;
	const stars = req.body.stars;

	var update = [];
	var updateStars = [];

	//for(var i = 0; i < letter.length; i++){
	dbUser.query("SELECT * FROM singletab WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			// print all keys

			// [ 'java', 'javascript', 'nodejs', 'php' ]

			// iterate over object
			keys.forEach((key, index) => {
				if (letter.indexOf(key) > -1) {
					var currIndex = letter.indexOf(key);

					if (resultStat[currIndex] !== -1) {
						if (resultJson[key] != 0) {
							resultJson[key] =
								(resultJson[key] + 2 * resultStat[letter.indexOf(key)]) / 3;
						} else {
							resultJson[key] = resultStat[letter.indexOf(key)];
						}
					}
				}
			});

			update = Object.values(resultJson);

			update.shift();

			dbUser.query(
				"UPDATE singletab SET a=?, b=?, c=?, d=?, e=?, f=?, g=?, h=?, i=?, j=?, k=?, l=?, m=?, n=?, o=?, p=?, q=?, r=?, s=?, t=?, u=?, v=?, w=?, x=?, y=?, z=?, Enter = ?, Backspace = ? WHERE userID = ?",
				[
					update[0],
					update[1],
					update[2],
					update[3],
					update[4],
					update[5],
					update[6],
					update[7],
					update[8],
					update[9],
					update[10],
					update[11],
					update[12],
					update[13],
					update[14],
					update[15],
					update[16],
					update[17],
					update[18],
					update[19],
					update[20],
					update[21],
					update[22],
					update[23],
					update[24],
					update[25],
					update[26],
					update[27],
					id,
				],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						console.log("success");
						if (unitLevelID == "U0_L0") {
							res.send(["Done"]);
						}
					}
				}
			);
		}
	});

	dbUser.query("SELECT * FROM singletabstars WHERE id=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJsonStars = Object.values(
				JSON.parse(JSON.stringify(result))
			)[0];

			const keys = Object.keys(resultJsonStars);

			keys.forEach((key, index) => {
				if (key == unitLevelID) {
					if (resultJsonStars[key] < stars) {
						resultJsonStars[key] = stars;
						updateStars = Object.values(resultJsonStars);
						updateStars.shift();

						dbUser.query(
							"UPDATE singletabstars SET U1_L1=?, U1_L2=?, U2_L1=?,  U2_L2=?,  U2_L3=?, U3_L1=?, U3_L2=?, U3_L3=?, U4_L1=?, U4_L2=?, U4_L3=?, U5_L1=?, U5_L2=?, U5_L3=?, U6_L1=?, U6_L2=?, U6_L3=?, U7_L1=?, U7_L2=?, U7_L3=?, U8_L1=?, U8_L2=?, U8_L3=?, U9_L1=?, U9_L2=?, U9_L3=?  WHERE id = ?",
							[
								updateStars[0],
								updateStars[1],
								updateStars[2],
								updateStars[3],
								updateStars[4],
								updateStars[5],
								updateStars[6],
								updateStars[7],
								updateStars[8],
								updateStars[9],
								updateStars[10],
								updateStars[11],
								updateStars[12],
								updateStars[13],
								updateStars[14],
								updateStars[15],
								updateStars[16],
								updateStars[17],
								updateStars[18],
								updateStars[19],
								updateStars[20],
								updateStars[21],
								updateStars[22],
								updateStars[23],
								updateStars[24],
								updateStars[25],
								id,
							],
							(err, result) => {
								if (err) {
									console.log(err);
								} else {
									console.log("success");
								}
							}
						);
					}
				}
			});
		}
	});
});

//POST - reached points/ new statistic for Single Tap with reponse form server side
app.post("/statisticSingleTapWReponse", (req, res) => {
	const id = req.body.id;
	const letter = req.body.symbols;
	const resultStat = req.body.statistic;
	const unitLevelID = req.body.unitLevelID;
	const stars = req.body.stars;

	var update = [];
	var updateStars = [];

	//for(var i = 0; i < letter.length; i++){
	dbUser.query("SELECT * FROM singletab WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			// print all keys

			// [ 'java', 'javascript', 'nodejs', 'php' ]

			// iterate over object
			keys.forEach((key, index) => {
				if (letter.indexOf(key) > -1) {
					var currIndex = letter.indexOf(key);

					if (resultStat[currIndex] !== -1) {
						if (resultJson[key] != 0) {
							resultJson[key] =
								(resultJson[key] + 2 * resultStat[letter.indexOf(key)]) / 3;
						} else {
							resultJson[key] = resultStat[letter.indexOf(key)];
						}
					}
				}
			});

			update = Object.values(resultJson);

			update.shift();

			dbUser.query(
				"UPDATE singletab SET a=?, b=?, c=?, d=?, e=?, f=?, g=?, h=?, i=?, j=?, k=?, l=?, m=?, n=?, o=?, p=?, q=?, r=?, s=?, t=?, u=?, v=?, w=?, x=?, y=?, z=?, Enter = ?, Backspace = ? WHERE userID = ?",
				[
					update[0],
					update[1],
					update[2],
					update[3],
					update[4],
					update[5],
					update[6],
					update[7],
					update[8],
					update[9],
					update[10],
					update[11],
					update[12],
					update[13],
					update[14],
					update[15],
					update[16],
					update[17],
					update[18],
					update[19],
					update[20],
					update[21],
					update[22],
					update[23],
					update[24],
					update[25],
					update[26],
					update[27],
					id,
				],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						if (unitLevelID == "U0_L0") {
							res.send(["Done"]);
						}
					}
				}
			);
		}
	});

	dbUser.query("SELECT * FROM singletabstars WHERE id=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJsonStars = Object.values(
				JSON.parse(JSON.stringify(result))
			)[0];

			const keys = Object.keys(resultJsonStars);

			keys.forEach((key, index) => {
				if (key == unitLevelID) {
					if (resultJsonStars[key] < stars) {
						resultJsonStars[key] = stars;
						updateStars = Object.values(resultJsonStars);
						updateStars.shift();

						dbUser.query(
							"UPDATE singletabstars SET U1_L1=?, U1_L2=?, U2_L1=?,  U2_L2=?,  U2_L3=?, U3_L1=?, U3_L2=?, U3_L3=?, U4_L1=?, U4_L2=?, U4_L3=?, U5_L1=?, U5_L2=?, U5_L3=?, U6_L1=?, U6_L2=?, U6_L3=?, U7_L1=?, U7_L2=?, U7_L3=?, U8_L1=?, U8_L2=?, U8_L3=?, U9_L1=?, U9_L2=?, U9_L3=?  WHERE id = ?",
							[
								updateStars[0],
								updateStars[1],
								updateStars[2],
								updateStars[3],
								updateStars[4],
								updateStars[5],
								updateStars[6],
								updateStars[7],
								updateStars[8],
								updateStars[9],
								updateStars[10],
								updateStars[11],
								updateStars[12],
								updateStars[13],
								updateStars[14],
								updateStars[15],
								updateStars[16],
								updateStars[17],
								updateStars[18],
								updateStars[19],
								updateStars[20],
								updateStars[21],
								updateStars[22],
								updateStars[23],
								updateStars[24],
								updateStars[25],
								id,
							],
							(err, result) => {
								if (err) {
									console.log(err);
								} else {
									res.send(["Done2"]);
								}
							}
						);
					}
				}
			});
		}
	});
});

//GET - whole statistic of Single Tap
app.get("/getAllStatisticSingle/:value", (req, res) => {
	const id = req.params.value;

	dbUser.query("SELECT * FROM singletab WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			var statisticArr = [];
			var keyArr = [];

			// iterate over object
			keys.forEach((key, index) => {
				if (key !== "userID") {
					keyArr.push(key);
					statisticArr.push(resultJson[key]);
				}
			});

			res.send([statisticArr, keyArr]);
		}
	});
});

/**----------------------Double Tap----------------------------------------------------------------------------------------- */

//GET - Double Tap Menu
app.get("/getDoubleTabMenu", (req, res) => {
	dbUser.query(
		"SELECT nameModus,doubletap FROM overviewmenu",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)));
				var moduArr = [];
				var levelsArr = [];

				for (var i = 0; i < resultJson.length; i++) {
					if (resultJson[i].doubletap != null) {
						levelsArr.push(resultJson[i].doubletap);
					}
				}

				res.send([moduArr, levelsArr]);
			}
		}
	);
});

//GET - Statistic about particular learning Unit from Double Tap
app.get("/getDoubleTapStatistic/:value/:symbolIds", (req, res) => {
	const id = req.params.value;
	const symbols = createArray(req.params.symbolIds + ",");

	dbUser.query("SELECT * FROM doubletap WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			// print all keys
			var statisticArr = [];

			for (var i = 0; i < symbols.length; i++) {
				var currSymId = "sid_" + symbols[i];

				// iterate over object

				keys.forEach((key, index) => {
					if (currSymId === key) {
						statisticArr.push(resultJson[key]);
					}
				});
			}

			res.send([statisticArr]);
		}
	});
});

//GET - Double Tap Stars for Double Tap menu view
app.get("/getDoubleTapStar/:userID", (req, res) => {
	const id = req.params.userID;

	dbUser.query(
		"SELECT * FROM doubletapstars WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];
				var starsTotal = 0;
				var starsTotalArray = [0, 0, 0, 0, 0, 0];
				const keys = Object.keys(resultJson);
				// iterate over object
				keys.forEach((key, index) => {
					if (key != "userID") {
						starsTotal = starsTotal + resultJson[key];
					}
					if (key.includes("U1")) {
						starsTotalArray[0] = starsTotalArray[0] + resultJson[key];
					} else if (key.includes("U2")) {
						starsTotalArray[1] = starsTotalArray[1] + resultJson[key];
					} else if (key.includes("U3")) {
						starsTotalArray[2] = starsTotalArray[2] + resultJson[key];
					} else if (key.includes("U4")) {
						starsTotalArray[3] = starsTotalArray[3] + resultJson[key];
					} else if (key.includes("U5")) {
						starsTotalArray[4] = starsTotalArray[4] + resultJson[key];
					} else if (key.includes("U6")) {
						starsTotalArray[5] = starsTotalArray[5] + resultJson[key];
					}
				});
				res.send([0, starsTotal, starsTotalArray]);
			}
		}
	);
});

app.get("/getDoubleTapStarsUnit/:value/:unitID", (req, res) => {
	const id = req.params.value;
	const unitId = req.params.unitID;

	dbUser.query(
		"SELECT * FROM doubletapstars WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

				var starsTotalArray = [];
				const keys = Object.keys(resultJson);
				// iterate over object
				keys.forEach((key, index) => {
					if (key.includes(unitId)) {
						starsTotalArray.push(resultJson[key]);
					}
				});

				res.send([starsTotalArray]);
			}
		}
	);
});

app.get("/getSymbolArrayDoubleTap/:symbolIds/:rightHand/:value", (req, res) => {
	const symbolIds = req.params.symbolIds;
	const rightHand = req.params.rightHand;
	const userID = req.params.value;
	var symbolIdsDouble = [
		3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 26, 27, 31,
	];

	dbUser.query(
		"SELECT id, righthand, lefthand, doubletap, doublekeycombi FROM levels",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)));
				var doubleKeyCombi = [];
				var doubleKeyCombiAll = [];
				var symbolArray = [];
				var combinationArray = [];
				var allSymbolArray = [];
				var allCombinationArray = [];
				var smallestNum = symbolIds[0] + symbolIds[1];

				if (smallestNum.includes(",")) {
					smallestNum = symbolIds[0];
				}

				const keys = Object.keys(resultJson);

				for (var i = 0; i < resultJson.length; i++) {
					if (
						resultJson[i].id < smallestNum &&
						symbolIdsDouble.includes(resultJson[i].id)
					) {
						doubleKeyCombiAll.push(resultJson[i].doublekeycombi);
						allSymbolArray.push(resultJson[i].doubletap);
						if (rightHand === "true") {
							allCombinationArray.push("2× " + resultJson[i].righthand);
						} else {
							allCombinationArray.push("2× " + resultJson[i].lefthand);
						}
					}

					if (
						symbolIds.includes(resultJson[i].id) &&
						resultJson[i].id >= smallestNum &&
						symbolIdsDouble.includes(resultJson[i].id)
					) {
						doubleKeyCombi.push(resultJson[i].doublekeycombi);
						symbolArray.push(resultJson[i].doubletap);
						doubleKeyCombiAll.push(resultJson[i].doublekeycombi);
						allSymbolArray.push(resultJson[i].doubletap);
						if (rightHand === "true") {
							combinationArray.push("2× " + resultJson[i].righthand);
							allCombinationArray.push("2× " + resultJson[i].righthand);
						} else {
							combinationArray.push("2× " + resultJson[i].lefthand);
							allCombinationArray.push("2× " + resultJson[i].lefthand);
						}
					}
				}

				res.send([
					symbolArray,
					combinationArray,
					allSymbolArray,
					allCombinationArray,
					doubleKeyCombi,
					doubleKeyCombiAll,
				]);
			}
		}
	);
});

app.post("/statisticDoubleTap", (req, res) => {
	const id = req.body.id;
	const letter = req.body.symbols;
	const resultStat = req.body.statistic;
	const unitLevelID = req.body.unitLevelID;
	const stars = req.body.stars;

	var update = [];
	var updateStars = [];

	//for(var i = 0; i < letter.length; i++){
	dbUser.query("SELECT * FROM doubletap WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			var valSids = [];

			// iterate over object
			keys.forEach((key, index) => {
				if (key !== "userID") {
					valSids.push(resultJson[key]);
				}
			});

			for (var i = 0; i < letter.length; i++) {
				if (resultStat[i] !== -1) {
					if (valSids[i] === 0) {
						valSids[i] = resultStat[i];
					} else {
						valSids[i] = (valSids[i] + 2 * resultStat[i]) / 3;
					}
				}
			}

			dbUser.query(
				"UPDATE doubletap SET sid_3=?, sid_4=?, sid_5=?,sid_7=?, sid_8=?, sid_9=?, sid_10=?, sid_11=?, sid_13=?, sid_14=?, sid_15=?, sid_17=?, sid_18=?, sid_19=?, sid_21=?, sid_22=?, sid_23=?, sid_26=?, sid_27=?, sid_31=? WHERE userID = ?",
				[
					valSids[0],
					valSids[1],
					valSids[2],
					valSids[3],
					valSids[4],
					valSids[5],
					valSids[6],
					valSids[7],
					valSids[8],
					valSids[9],
					valSids[10],
					valSids[11],
					valSids[12],
					valSids[13],
					valSids[14],
					valSids[15],
					valSids[16],
					valSids[17],
					valSids[18],
					valSids[19],
					id,
				],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						if (unitLevelID == "U0_L0") {
							res.send(["Done"]);
						}
					}
				}
			);
		}
	});

	dbUser.query(
		"SELECT * FROM doubletapstars WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJsonStars = Object.values(
					JSON.parse(JSON.stringify(result))
				)[0];

				const keys = Object.keys(resultJsonStars);

				keys.forEach((key, index) => {
					if (key == unitLevelID) {
						if (resultJsonStars[key] < stars) {
							resultJsonStars[key] = stars;
							updateStars = Object.values(resultJsonStars);
							updateStars.shift();

							dbUser.query(
								"UPDATE doubletapstars SET U1_L1=?, U1_L2=?, U2_L1=?,  U2_L2=?,  U2_L3=?, U3_L1=?, U3_L2=?, U3_L3=?, U4_L1=?, U4_L2=?, U4_L3=?, U5_L1=?, U5_L2=?, U5_L3=?, U6_L1=?, U6_L2=?, U6_L3=?  WHERE userID = ?",
								[
									updateStars[0],
									updateStars[1],
									updateStars[2],
									updateStars[3],
									updateStars[4],
									updateStars[5],
									updateStars[6],
									updateStars[7],
									updateStars[8],
									updateStars[9],
									updateStars[10],
									updateStars[11],
									updateStars[12],
									updateStars[13],
									updateStars[14],
									updateStars[15],
									updateStars[16],
									id,
								],
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);
						}
					}
				});
			}
		}
	);
});

app.get("/getAllStatisticDouble/:value", (req, res) => {
	const id = req.params.value;
	var symbolIdsDouble = [
		3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 26, 27, 31,
	];

	dbUser.query("SELECT id,doubletap FROM levels", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)));
			const keys = Object.keys(resultJson);
			var statisticArr = [];
			var keyArr = [];

			// iterate over object
			for (var i = 0; i < resultJson.length; i++) {
				if (symbolIdsDouble.indexOf(resultJson[i].id) !== -1) {
					keyArr.push(resultJson[i].doubletap);
				}
			}

			dbUser.query(
				"SELECT * FROM doubletap WHERE userID=?",
				id,
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						const resultJsonStat = Object.values(
							JSON.parse(JSON.stringify(result))
						)[0];

						const keysStat = Object.keys(resultJsonStat);

						// iterate over object
						keysStat.forEach((key, index) => {
							if (key !== "userID") {
								statisticArr.push(resultJsonStat[key]);
							}
						});

						res.send([statisticArr, keyArr]);
					}
				}
			);
		}
	});
});
/**----------------------------------Triple Tap------------------------------------------------------------------------------- */
app.get("/getTripleTabMenu", (req, res) => {
	dbUser.query(
		"SELECT nameModus,tripletap FROM overviewmenu",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)));
				var moduArr = [];
				var levelsArr = [];

				for (var i = 0; i < resultJson.length; i++) {
					moduArr.push(resultJson[i].nameModus);
					levelsArr.push(resultJson[i].tripletap);
				}

				res.send([moduArr, levelsArr]);
			}
		}
	);
});

app.get("/getTripleTapStar/:userID", (req, res) => {
	const id = req.params.userID;

	dbUser.query(
		"SELECT * FROM tripletapstars WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];
				var starsTotal = 0;
				var starsTotalArray = [0, 0, 0, 0];
				const keys = Object.keys(resultJson);
				// iterate over object
				keys.forEach((key, index) => {
					if (key != "userID") {
						starsTotal = starsTotal + resultJson[key];
					}
					if (key.includes("U1")) {
						starsTotalArray[0] = starsTotalArray[0] + resultJson[key];
					} else if (key.includes("U2")) {
						starsTotalArray[1] = starsTotalArray[1] + resultJson[key];
					} else if (key.includes("U3")) {
						starsTotalArray[2] = starsTotalArray[2] + resultJson[key];
					} else if (key.includes("U4")) {
						starsTotalArray[3] = starsTotalArray[3] + resultJson[key];
					}
				});

				res.send([0, starsTotal, starsTotalArray]);
			}
		}
	);
});

app.get("/getSymbolArrayTripleTap/:symbolIds/:rightHand/:value", (req, res) => {
	const symbolIds = req.params.symbolIds;
	const rightHand = req.params.rightHand;
	const userID = req.params.value;
	var symbolIdsTriple = [5, 7, 8, 10, 11, 13, 14, 15, 18, 19, 21, 22, 27];

	dbUser.query(
		"SELECT id, righthand, lefthand, triple, triplekeycombi  FROM levels",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)));
				var tripleKeyCombi = [];
				var tripleKeyCombiAll = [];
				var symbolArray = [];
				var combinationArray = [];
				var allSymbolArray = [];
				var allCombinationArray = [];
				var smallestNum = symbolIds[0] + symbolIds[1];

				if (smallestNum.includes(",")) {
					smallestNum = symbolIds[0];
				}

				const keys = Object.keys(resultJson);

				for (var i = 0; i < resultJson.length; i++) {
					if (
						resultJson[i].id < smallestNum &&
						symbolIdsTriple.includes(resultJson[i].id)
					) {
						tripleKeyCombiAll.push(resultJson[i].triplekeycombi);
						allSymbolArray.push(resultJson[i].triple);
						if (rightHand === "true") {
							allCombinationArray.push("3× " + resultJson[i].righthand);
						} else {
							allCombinationArray.push("3× " + resultJson[i].lefthand);
						}
					}

					if (
						symbolIds.includes(resultJson[i].id) &&
						resultJson[i].id >= smallestNum &&
						symbolIdsTriple.includes(resultJson[i].id)
					) {
						tripleKeyCombi.push(resultJson[i].triplekeycombi);
						symbolArray.push(resultJson[i].triple);
						tripleKeyCombiAll.push(resultJson[i].triplekeycombi);
						allSymbolArray.push(resultJson[i].triple);
						if (rightHand === "true") {
							combinationArray.push("3× " + resultJson[i].righthand);
							allCombinationArray.push(resultJson[i].righthand);
						} else {
							combinationArray.push("3× " + resultJson[i].lefthand);
							allCombinationArray.push("3× " + resultJson[i].lefthand);
						}
					}
				}

				res.send([
					symbolArray,
					combinationArray,
					allSymbolArray,
					allCombinationArray,
					tripleKeyCombi,
					tripleKeyCombiAll,
				]);
			}
		}
	);
});

app.get("/getTripleTapStatistic/:value/:symbolIds", (req, res) => {
	const id = req.params.value;
	const symbols = createArray(req.params.symbolIds + ",");

	dbUser.query("SELECT * FROM tripletap WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			// print all keys
			var statisticArr = [];

			for (var i = 0; i < symbols.length; i++) {
				var currSymId = "sid_" + symbols[i];
				// iterate over object
				keys.forEach((key, index) => {
					if (currSymId === key) {
						statisticArr.push(resultJson[key]);
					}
				});
			}

			res.send([statisticArr]);
		}
	});
});

app.get("/getTripleTapStarsUnit/:value/:unitID", (req, res) => {
	const id = req.params.value;
	const unitId = req.params.unitID;

	dbUser.query(
		"SELECT * FROM tripletapstars WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

				var starsTotalArray = [];
				const keys = Object.keys(resultJson);
				// iterate over object
				keys.forEach((key, index) => {
					if (key.includes(unitId)) {
						starsTotalArray.push(resultJson[key]);
					}
				});

				res.send([starsTotalArray]);
			}
		}
	);
});

app.post("/statisticTripleTap", (req, res) => {
	const id = req.body.id;
	const letter = req.body.symbols;
	const resultStat = req.body.statistic;
	const unitLevelID = req.body.unitLevelID;
	const stars = req.body.stars;

	var update = [];
	var updateStars = [];

	dbUser.query("SELECT * FROM tripletap WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			var valSids = [];

			// iterate over object
			keys.forEach((key, index) => {
				if (key !== "userID") {
					valSids.push(resultJson[key]);
				}
			});

			for (var i = 0; i < letter.length; i++) {
				if (resultStat[i] !== -1) {
					if (valSids[i] === 0) {
						valSids[i] = resultStat[i];
					} else {
						valSids[i] = (valSids[i] + 2 * resultStat[i]) / 3;
					}
				}
			}

			dbUser.query(
				"UPDATE tripletap SET sid_5=?, sid_7=?, sid_8=?, sid_10=?, sid_11=?, sid_13=?, sid_14=?, sid_15=?, sid_18=?, sid_19=?, sid_21=?, sid_22=?, sid_23=?, sid_26=?, sid_27=? WHERE userID = ?",
				[
					valSids[0],
					valSids[1],
					valSids[2],
					valSids[3],
					valSids[4],
					valSids[5],
					valSids[6],
					valSids[7],
					valSids[8],
					valSids[9],
					valSids[10],
					valSids[11],
					valSids[12],
					valSids[13],
					valSids[14],
					id,
				],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						if (unitLevelID == "U0_L0") {
							res.send(["Done"]);
						}
					}
				}
			);
		}
	});

	dbUser.query(
		"SELECT * FROM tripletapstars WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJsonStars = Object.values(
					JSON.parse(JSON.stringify(result))
				)[0];
				const keys = Object.keys(resultJsonStars);

				keys.forEach((key, index) => {
					if (key == unitLevelID) {
						if (resultJsonStars[key] < stars) {
							resultJsonStars[key] = stars;
							updateStars = Object.values(resultJsonStars);
							updateStars.shift();

							dbUser.query(
								"UPDATE tripletapstars SET U1_L1=?, U1_L2=?, U2_L1=?,  U2_L2=?,  U2_L3=?, U3_L1=?, U3_L2=?, U3_L3=?, U4_L1=?, U4_L2=?, U4_L3=?  WHERE userID = ?",
								[
									updateStars[0],
									updateStars[1],
									updateStars[2],
									updateStars[3],
									updateStars[4],
									updateStars[5],
									updateStars[6],
									updateStars[7],
									updateStars[8],
									updateStars[9],
									updateStars[10],
									updateStars[11],
									id,
								],
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);
						}
					}
				});
			}
		}
	);
});

app.get("/getAllStatisticTriple/:value", (req, res) => {
	const id = req.params.value;
	var symbolIdsTriple = [
		5, 7, 8, 10, 11, 13, 14, 15, 18, 19, 21, 22, 23, 26, 27,
	];

	dbUser.query("SELECT id,triple FROM levels", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)));

			const keys = Object.keys(resultJson);

			// print all keys
			var statisticArr = [];
			var keyArr = [];

			// iterate over object
			for (var i = 0; i < resultJson.length; i++) {
				if (symbolIdsTriple.indexOf(resultJson[i].id) !== -1) {
					keyArr.push(resultJson[i].triple);
				}
			}

			dbUser.query(
				"SELECT * FROM tripletap WHERE userID=?",
				id,
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						const resultJsonStat = Object.values(
							JSON.parse(JSON.stringify(result))
						)[0];

						const keysStat = Object.keys(resultJsonStat);

						// print all keys

						// iterate over object
						keysStat.forEach((key, index) => {
							if (key !== "userID") {
								statisticArr.push(resultJsonStat[key]);
							}
						});

						res.send([statisticArr, keyArr]);
					}
				}
			);
		}
	});
});

/**-------------------------------------------------Shift-------------------------------------------------------------------- */
app.get("/getShiftMenu", (req, res) => {
	dbUser.query("SELECT nameModus,shift FROM overviewmenu", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)));
			var moduArr = [];
			var levelsArr = [];

			for (var i = 0; i < resultJson.length; i++) {
				moduArr.push(resultJson[i].nameModus);
				levelsArr.push(resultJson[i].shift);
			}

			res.send([moduArr, levelsArr]);
		}
	});
});

app.get("/getShiftStar/:userID", (req, res) => {
	const id = req.params.userID;

	dbUser.query("SELECT * FROM shiftstars WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];
			var starsTotal = 0;
			var starsTotalArray = [0, 0, 0, 0, 0, 0, 0, 0];
			const keys = Object.keys(resultJson);
			// iterate over object
			keys.forEach((key, index) => {
				if (key != "userID") {
					starsTotal = starsTotal + resultJson[key];
				}
				if (key.includes("U1")) {
					starsTotalArray[0] = starsTotalArray[0] + resultJson[key];
				} else if (key.includes("U2")) {
					starsTotalArray[1] = starsTotalArray[1] + resultJson[key];
				} else if (key.includes("U3")) {
					starsTotalArray[2] = starsTotalArray[2] + resultJson[key];
				} else if (key.includes("U4")) {
					starsTotalArray[3] = starsTotalArray[3] + resultJson[key];
				} else if (key.includes("U5")) {
					starsTotalArray[4] = starsTotalArray[4] + resultJson[key];
				} else if (key.includes("U6")) {
					starsTotalArray[5] = starsTotalArray[5] + resultJson[key];
				} else if (key.includes("U7")) {
					starsTotalArray[6] = starsTotalArray[6] + resultJson[key];
				}
			});
			res.send([0, starsTotal, starsTotalArray]);
		}
	});
});

app.get("/getSymbolArrayShift/:symbolIds/:rightHand/:value", (req, res) => {
	const symbolIds = req.params.symbolIds;
	const rightHand = req.params.rightHand;
	const userID = req.params.value;
	var symbolIdsShift = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 24,
		26, 27,
	];

	dbUser.query(
		"SELECT id, righthand, lefthand, shift, shiftkeycombi FROM levels",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)));
				var shiftKeyCombi = [];
				var shiftKeyCombiAll = [];
				var symbolArray = [];
				var combinationArray = [];
				var allSymbolArray = [];
				var allCombinationArray = [];
				var smallestNum = symbolIds[0] + symbolIds[1];

				if (smallestNum.includes(",")) {
					smallestNum = symbolIds[0];
				}

				const keys = Object.keys(resultJson);
				for (var i = 0; i < resultJson.length; i++) {
					if (
						resultJson[i].id < smallestNum &&
						symbolIdsShift.includes(resultJson[i].id)
					) {
						shiftKeyCombiAll.push(resultJson[i].shiftkeycombi);
						allSymbolArray.push(resultJson[i].shift);
						if (rightHand === "true") {
							allCombinationArray.push(
								"ShiftMode +" + " " + resultJson[i].righthand
							);
						} else {
							allCombinationArray.push(
								"ShiftMode +" + " " + resultJson[i].lefthand
							);
						}
					}

					if (
						symbolIds.includes(resultJson[i].id) &&
						resultJson[i].id >= smallestNum &&
						symbolIdsShift.includes(resultJson[i].id)
					) {
						shiftKeyCombi.push(resultJson[i].shiftkeycombi);
						symbolArray.push(resultJson[i].shift);
						shiftKeyCombiAll.push(resultJson[i].shiftkeycombi);
						allSymbolArray.push(resultJson[i].shift);
						if (rightHand === "true") {
							combinationArray.push(
								"ShiftMode +" + " " + resultJson[i].righthand
							);
							allCombinationArray.push(
								"ShiftMode +" + " " + resultJson[i].righthand
							);
						} else {
							combinationArray.push(
								"ShiftMode +" + " " + resultJson[i].lefthand
							);
							allCombinationArray.push(
								"ShiftMode +" + " " + resultJson[i].lefthand
							);
						}
					}
				}

				res.send([
					symbolArray,
					combinationArray,
					allSymbolArray,
					allCombinationArray,
					shiftKeyCombi,
					shiftKeyCombiAll,
				]);
			}
		}
	);
});

app.get("/getShiftStatistic/:value/:symbolIds", (req, res) => {
	const id = req.params.value;
	const symbols = createArray(req.params.symbolIds + ",");

	dbUser.query("SELECT * FROM shift WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			var statisticArr = [];
			for (var i = 0; i < symbols.length; i++) {
				var currSymId = "sid_" + symbols[i];
				// iterate over object
				keys.forEach((key, index) => {
					if (currSymId === key) {
						statisticArr.push(resultJson[key]);
					}
				});
			}

			res.send([statisticArr]);
		}
	});
});

app.get("/getShiftStarsUnit/:value/:unitID", (req, res) => {
	const id = req.params.value;
	const unitId = req.params.unitID;

	dbUser.query("SELECT * FROM shiftstars WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			var starsTotalArray = [];
			const keys = Object.keys(resultJson);
			// iterate over object
			keys.forEach((key, index) => {
				if (key.includes(unitId)) {
					starsTotalArray.push(resultJson[key]);
				}
			});

			res.send([starsTotalArray]);
		}
	});
});

app.post("/statisticShift", (req, res) => {
	const id = req.body.id;
	const letter = req.body.symbols;
	const resultStat = req.body.statistic;
	const unitLevelID = req.body.unitLevelID;
	const stars = req.body.stars;

	var update = [];
	var updateStars = [];

	dbUser.query("SELECT * FROM shift WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			var valSids = [];

			// iterate over object
			keys.forEach((key, index) => {
				if (key !== "userID") {
					valSids.push(resultJson[key]);
				}
			});

			for (var i = 0; i < letter.length; i++) {
				if (resultStat[i] !== -1) {
					if (valSids[i] === 0) {
						valSids[i] = resultStat[i];
					} else {
						valSids[i] = (valSids[i] + 2 * resultStat[i]) / 3;
					}
				}
			}

			dbUser.query(
				"UPDATE shift SET sid_1=?, sid_2=?, sid_3=?, sid_4=?, sid_5=?,sid_6=?, sid_7=?,sid_8=?, sid_9=?, sid_10=?, sid_11=?, sid_13=?, sid_14=?, sid_15=?, sid_17=?, sid_18=?, sid_19=?, sid_21=?, sid_22=?, sid_23=?,sid_24=?, sid_26=?, sid_27=? WHERE userID = ?",
				[
					valSids[0],
					valSids[1],
					valSids[2],
					valSids[3],
					valSids[4],
					valSids[5],
					valSids[6],
					valSids[7],
					valSids[8],
					valSids[9],
					valSids[10],
					valSids[11],
					valSids[12],
					valSids[13],
					valSids[14],
					valSids[15],
					valSids[16],
					valSids[17],
					valSids[18],
					valSids[19],
					valSids[20],
					valSids[21],
					valSids[22],
					id,
				],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						if (unitLevelID == "U0_L0") {
							res.send(["Done"]);
						}
					}
				}
			);
		}
	});

	dbUser.query("SELECT * FROM shiftstars WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJsonStars = Object.values(
				JSON.parse(JSON.stringify(result))
			)[0];

			const keys = Object.keys(resultJsonStars);

			keys.forEach((key, index) => {
				if (key == unitLevelID) {
					if (resultJsonStars[key] < stars) {
						resultJsonStars[key] = stars;
						updateStars = Object.values(resultJsonStars);
						updateStars.shift();

						dbUser.query(
							"UPDATE shiftstars SET U1_L1=?, U1_L2=?, U2_L1=?,  U2_L2=?,  U2_L3=?, U3_L1=?, U3_L2=?, U3_L3=?, U4_L1=?, U4_L2=?, U4_L3=?, U5_L1=?, U5_L2=?, U5_L3=?, U6_L1=?, U6_L2=?, U6_L3=? ,  U7_L1=?, U7_L2=?, U7_L3=?,  U8_L1=?, U8_L2=?, U8_L3=? WHERE userID = ?",
							[
								updateStars[0],
								updateStars[1],
								updateStars[2],
								updateStars[3],
								updateStars[4],
								updateStars[5],
								updateStars[6],
								updateStars[7],
								updateStars[8],
								updateStars[9],
								updateStars[10],
								updateStars[11],
								updateStars[12],
								updateStars[13],
								updateStars[14],
								updateStars[15],
								updateStars[16],
								updateStars[17],
								updateStars[18],
								updateStars[19],
								updateStars[20],
								updateStars[21],
								updateStars[22],
								id,
							],
							(err, result) => {
								if (err) {
									console.log(err);
								} else {
									console.log("success");
								}
							}
						);
					}
				}
			});
		}
	});
});

app.get("/getAllStatisticShift/:value", (req, res) => {
	const id = req.params.value;
	var symbolIdsShift = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 24,
		26, 27,
	];

	dbUser.query("SELECT id,shift FROM levels", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)));

			const keys = Object.keys(resultJson);

			var statisticArr = [];
			var keyArr = [];

			// iterate over object
			for (var i = 0; i < resultJson.length; i++) {
				if (symbolIdsShift.indexOf(resultJson[i].id) !== -1) {
					keyArr.push(resultJson[i].shift);
				}
			}

			dbUser.query("SELECT * FROM shift WHERE userID=?", id, (err, result) => {
				if (err) {
					console.log(err);
				} else {
					const resultJsonStat = Object.values(
						JSON.parse(JSON.stringify(result))
					)[0];

					const keysStat = Object.keys(resultJsonStat);

					// iterate over object
					keysStat.forEach((key, index) => {
						if (key !== "userID") {
							statisticArr.push(resultJsonStat[key]);
						}
					});

					res.send([statisticArr, keyArr]);
				}
			});
		}
	});
});

/**----------------------------------------switch---------------------------------------------------------------------------------- */
app.get("/getSwitchMenu", (req, res) => {
	dbUser.query("SELECT nameModus,switch FROM overviewmenu", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)));
			var moduArr = [];
			var levelsArr = [];

			for (var i = 0; i < resultJson.length; i++) {
				moduArr.push(resultJson[i].nameModus);
				if (resultJson[i].switch != null) {
					levelsArr.push(resultJson[i].switch);
				}
			}

			res.send([moduArr, levelsArr]);
		}
	});
});

app.get("/getSwitchStar/:userID", (req, res) => {
	const id = req.params.userID;

	dbUser.query(
		"SELECT * FROM switchstars WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];
				var starsTotal = 0;
				var starsTotalArray = [0, 0, 0, 0, 0, 0];
				const keys = Object.keys(resultJson);
				// iterate over object
				keys.forEach((key, index) => {
					if (key != "userID") {
						starsTotal = starsTotal + resultJson[key];
					}
					if (key.includes("U1")) {
						starsTotalArray[0] = starsTotalArray[0] + resultJson[key];
					} else if (key.includes("U2")) {
						starsTotalArray[1] = starsTotalArray[1] + resultJson[key];
					} else if (key.includes("U3")) {
						starsTotalArray[2] = starsTotalArray[2] + resultJson[key];
					} else if (key.includes("U4")) {
						starsTotalArray[3] = starsTotalArray[3] + resultJson[key];
					} else if (key.includes("U5")) {
						starsTotalArray[4] = starsTotalArray[4] + resultJson[key];
					} else if (key.includes("U6")) {
						starsTotalArray[5] = starsTotalArray[5] + resultJson[key];
					}
				});
				res.send([0, starsTotal, starsTotalArray]);
			}
		}
	);
});

app.get("/getSymbolArraySwitch/:symbolIds/:rightHand/:value", (req, res) => {
	const symbolIds = req.params.symbolIds;
	const rightHand = req.params.rightHand;
	const userID = req.params.value;
	var symbolIdsSwitch = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 14, 12, 13, 17, 19, 21, 22, 23, 24, 26, 27,
		29,
	];

	dbUser.query(
		"SELECT id, righthand, lefthand, switch, switchkeycombi FROM levels",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)));
				var symbolArray = [];
				var combinationArray = [];
				var allSymbolArray = [];
				var allCombinationArray = [];
				var keyCombi = [];
				var allKeyCombis = [];
				var smallestNum = symbolIds[0] + symbolIds[1];

				if (smallestNum.includes(",")) {
					smallestNum = symbolIds[0];
				} else if (smallestNum == "15") {
					smallestNum = 12;
				}

				const keys = Object.keys(resultJson);

				for (var i = 0; i < resultJson.length; i++) {
					if (
						resultJson[i].id < smallestNum &&
						symbolIdsSwitch.includes(resultJson[i].id)
					) {
						if (resultJson[i].switchkeycombi !== null) {
							allKeyCombis.push(resultJson[i].switchkeycombi);
						} else {
							allKeyCombis.push(resultJson[i].switch);
						}
						allSymbolArray.push(resultJson[i].switch);
						if (rightHand === "true") {
							allCombinationArray.push(
								"SwitchMode +" + " " + resultJson[i].righthand
							);
						} else {
							allCombinationArray.push(
								"SwitchMode +" + " " + resultJson[i].lefthand
							);
						}
					}

					if (
						symbolIds.includes(resultJson[i].id) &&
						resultJson[i].id >= smallestNum &&
						symbolIdsSwitch.includes(resultJson[i].id)
					) {
						if (resultJson[i].switchkeycombi !== null) {
							allKeyCombis.push(resultJson[i].switchkeycombi);
							keyCombi.push(resultJson[i].switchkeycombi);
						} else {
							keyCombi.push(resultJson[i].switch);
							allKeyCombis.push(resultJson[i].switch);
						}

						symbolArray.push(resultJson[i].switch);
						allSymbolArray.push(resultJson[i].switch);
						if (rightHand === "true") {
							combinationArray.push(
								"SwitchMode +" + " " + resultJson[i].righthand
							);
							allCombinationArray.push(
								"SwitchMode +" + " " + resultJson[i].righthand
							);
						} else {
							combinationArray.push(
								"SwitchMode +" + " " + resultJson[i].lefthand
							);
							allCombinationArray.push(
								"SwitchMode +" + " " + resultJson[i].lefthand
							);
						}
					}
				}

				res.send([
					symbolArray,
					combinationArray,
					allSymbolArray,
					allCombinationArray,
					keyCombi,
					allKeyCombis,
				]);
			}
		}
	);
});

app.get("/getSwitchStatistic/:value/:symbolIds", (req, res) => {
	const id = req.params.value;
	const symbols = createArray(req.params.symbolIds + ",");

	dbUser.query("SELECT * FROM switch WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			// print all keys
			var statisticArr = [];

			for (var i = 0; i < symbols.length; i++) {
				var currSymId = "sid_" + symbols[i];
				// iterate over object
				keys.forEach((key, index) => {
					if (currSymId === key) {
						statisticArr.push(resultJson[key]);
					}
				});
			}

			res.send([statisticArr]);
		}
	});
});

app.get("/getSwitchStarsUnit/:value/:unitID", (req, res) => {
	const id = req.params.value;
	const unitId = req.params.unitID;

	dbUser.query(
		"SELECT * FROM switchstars WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

				var starsTotalArray = [];
				const keys = Object.keys(resultJson);
				// iterate over object
				keys.forEach((key, index) => {
					if (key.includes(unitId)) {
						starsTotalArray.push(resultJson[key]);
					}
				});

				res.send([starsTotalArray]);
			}
		}
	);
});

app.post("/statisticSwitch", (req, res) => {
	const id = req.body.id;
	const letter = req.body.symbols;
	const resultStat = req.body.statistic;
	const unitLevelID = req.body.unitLevelID;
	const stars = req.body.stars;

	var update = [];
	var updateStars = [];

	//for(var i = 0; i < letter.length; i++){
	dbUser.query("SELECT * FROM switch WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			var valSids = [];
			// print all keys
			// iterate over object
			keys.forEach((key, index) => {
				if (key !== "userID") {
					valSids.push(resultJson[key]);
				}
			});

			for (var i = 0; i < letter.length; i++) {
				if (resultStat[i] !== -1) {
					if (valSids[i] === 0) {
						valSids[i] = resultStat[i];
					} else {
						valSids[i] = (valSids[i] + 2 * resultStat[i]) / 3;
					}
				}
			}

			dbUser.query(
				"UPDATE switch SET sid_1=?, sid_2=?, sid_3=?, sid_4=?, sid_5=?,sid_6=?, sid_7=?,sid_8=?, sid_9=?, sid_15=?, sid_14=?, sid_12=?, sid_13=?, sid_17=?, sid_19=?, sid_21=?, sid_22=?, sid_23=?, sid_24=?, sid_26=?,sid_27=?, sid_29=? WHERE userID = ?",
				[
					valSids[0],
					valSids[1],
					valSids[2],
					valSids[3],
					valSids[4],
					valSids[5],
					valSids[6],
					valSids[7],
					valSids[8],
					valSids[9],
					valSids[10],
					valSids[11],
					valSids[12],
					valSids[13],
					valSids[14],
					valSids[15],
					valSids[16],
					valSids[17],
					valSids[18],
					valSids[19],
					valSids[20],
					valSids[21],
					id,
				],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						if (unitLevelID == "U0_L0") {
							res.send(["Done"]);
						}
					}
				}
			);
		}
	});

	dbUser.query(
		"SELECT * FROM switchstars WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJsonStars = Object.values(
					JSON.parse(JSON.stringify(result))
				)[0];

				const keys = Object.keys(resultJsonStars);

				keys.forEach((key, index) => {
					if (key == unitLevelID) {
						if (resultJsonStars[key] < stars) {
							resultJsonStars[key] = stars;
							updateStars = Object.values(resultJsonStars);
							updateStars.shift();

							dbUser.query(
								"UPDATE switchstars SET U1_L1=?, U1_L2=?, U2_L1=?,  U2_L2=?,  U2_L3=?, U3_L1=?, U3_L2=?, U3_L3=?, U4_L1=?, U4_L2=?, U4_L3=?, U5_L1=?, U5_L2=?, U5_L3=?, U6_L1=?, U6_L2=?, U6_L3=?  WHERE userID = ?",
								[
									updateStars[0],
									updateStars[1],
									updateStars[2],
									updateStars[3],
									updateStars[4],
									updateStars[5],
									updateStars[6],
									updateStars[7],
									updateStars[8],
									updateStars[9],
									updateStars[10],
									updateStars[11],
									updateStars[12],
									updateStars[13],
									updateStars[14],
									updateStars[15],
									updateStars[16],
									id,
								],
								(err, result) => {
									if (err) {
										console.log(err);
									} else {
										console.log("success");
									}
								}
							);
						}
					}
				});
			}
		}
	);
});

app.get("/getAllStatisticSwitch/:value", (req, res) => {
	const id = req.params.value;
	var symbolIdsSwitch = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 14, 12, 13, 17, 19, 21, 22, 23, 24, 26, 27,
		29,
	];

	dbUser.query("SELECT id,switch FROM levels", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)));

			const keys = Object.keys(resultJson);

			// print all keys
			var statisticArr = [];
			var keyArr = [];

			for (var x = 0; x < symbolIdsSwitch.length; x++) {
				// iterate over object
				for (var i = 0; i < resultJson.length; i++) {
					if (symbolIdsSwitch[x] === resultJson[i].id) {
						keyArr.push(resultJson[i].switch);
						break;
					}
				}
			}

			dbUser.query("SELECT * FROM switch WHERE userID=?", id, (err, result) => {
				if (err) {
					console.log(err);
				} else {
					const resultJsonStat = Object.values(
						JSON.parse(JSON.stringify(result))
					)[0];

					const keysStat = Object.keys(resultJsonStat);

					// print all keys

					// iterate over object
					keysStat.forEach((key, index) => {
						if (key !== "userID") {
							statisticArr.push(resultJsonStat[key]);
						}
					});

					res.send([statisticArr, keyArr]);
				}
			});
		}
	});
});

/**------------------------------------Games---------------------------------------------------------------------------------- */
app.post("/TimeToTapResult", (req, res) => {
	const id = req.body.id;
	const accuracy = req.body.accuracy;
	const hitCounter = req.body.hit;
	const score = req.body.score;

	var update = [];
	var updateStars = [];

	dbUser.query(
		"SELECT * FROM timetohitscore WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

				const keys = Object.keys(resultJson);

				var insertArr = [];

				keys.forEach((key, index) => {
					if (key !== "userID") {
						insertArr.push(resultJson[key]);
					}
				});

				var nextVal = 0;

				if (insertArr[0] < hitCounter) {
					insertArr[0] = hitCounter;
				}
				if (insertArr[1] < accuracy) {
					insertArr[1] = accuracy;
				}

				insertArr.splice(2, 0, score);
				insertArr.pop();

				dbUser.query(
					"UPDATE timetohitscore SET recordeHit=?, recordeAccuracy = ?, G1=?, G2=?, G3=?, G4=?, G5=?, G6=?, G7=?, G8=?, G9=?, G10=?, G11=?, G12=?, G13=?, G14=?, G15=?, G16=?, G17=?, G18=?, G19=?, G20=? WHERE userID = ?",
					[
						insertArr[0],
						insertArr[1],
						insertArr[2],
						insertArr[3],
						insertArr[4],
						insertArr[5],
						insertArr[6],
						insertArr[7],
						insertArr[8],
						insertArr[9],
						insertArr[10],
						insertArr[11],
						insertArr[12],
						insertArr[13],
						insertArr[14],
						insertArr[15],
						insertArr[16],
						insertArr[17],
						insertArr[18],
						insertArr[19],
						insertArr[20],
						insertArr[21],
						id,
					],
					(err, result) => {
						if (err) {
							console.log(err);
						} else {
							res.send(["Done"]);
						}
					}
				);
			}
		}
	);
});

app.get("/getTimeToHitRecords/:value", (req, res) => {
	const id = req.params.value;

	dbUser.query(
		"SELECT recordeHit, recordeAccuracy FROM timetohitscore WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];
				const keys = Object.keys(resultJson);

				var accuracy = [];
				var streak = [];
				// iterate over object
				keys.forEach((key, index) => {
					if (key === "recordeHit") {
						streak.push(resultJson[key]);
					} else {
						accuracy.push(resultJson[key]);
					}
				});

				res.send([streak, accuracy]);
			}
		}
	);
});

app.get("/getAllStatisticTimeToTap/:value", (req, res) => {
	const id = req.params.value;

	dbUser.query(
		"SELECT * FROM timetohitscore WHERE userID= ?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

				const keys = Object.keys(resultJson);

				var statRes = [];
				var recorde =
					(resultJson["recordeHit"] + resultJson["recordeAccuracy"]) / 2;
				statRes.push(recorde);
				keys.forEach((key, index) => {
					if (
						key !== "userID" &&
						key !== "recordeHit" &&
						key !== "recordeAccuracy"
					) {
						statRes.push(resultJson[key]);
					}
				});

				res.send([statRes]);
			}
		}
	);
});

app.post("/FiveTimesResult", (req, res) => {
	const id = req.body.id;
	const accuracy = req.body.accuracy;
	const score = req.body.score;

	var update = [];
	var updateStars = [];

	dbUser.query("SELECT * FROM fivetimes WHERE userID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			var insertArr = [];

			keys.forEach((key, index) => {
				if (key !== "userID") {
					insertArr.push(resultJson[key]);
				}
			});

			var nextVal = 0;

			if (insertArr[0] < score) {
				insertArr[0] = score;
			}
			if (insertArr[1] < accuracy) {
				insertArr[1] = accuracy;
			}
			var newScore = (score + accuracy) / 2;
			insertArr.splice(2, 0, newScore);
			insertArr.pop();

			dbUser.query(
				"UPDATE fivetimes SET recordeScore=?, recordeAccuracy = ?, G1=?, G2=?, G3=?, G4=?, G5=?, G6=?, G7=?, G8=?, G9=?, G10=?, G11=?, G12=?, G13=?, G14=?, G15=?, G16=?, G17=?, G18=?, G19=?, G20=? WHERE userID = ?",
				[
					insertArr[0],
					insertArr[1],
					insertArr[2],
					insertArr[3],
					insertArr[4],
					insertArr[5],
					insertArr[6],
					insertArr[7],
					insertArr[8],
					insertArr[9],
					insertArr[10],
					insertArr[11],
					insertArr[12],
					insertArr[13],
					insertArr[14],
					insertArr[15],
					insertArr[16],
					insertArr[17],
					insertArr[18],
					insertArr[19],
					insertArr[20],
					insertArr[21],
					id,
				],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						console.log("success");
						res.send(["DONE"]);
					}
				}
			);
		}
	});
});

app.get("/getFiveTimeRecords/:value", (req, res) => {
	const id = req.params.value;

	dbUser.query(
		"SELECT recordeScore, recordeAccuracy FROM fivetimes WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];
				const keys = Object.keys(resultJson);

				var accuracy = [];
				var streak = [];
				// iterate over object
				keys.forEach((key, index) => {
					if (key === "recordeScore") {
						streak.push(resultJson[key]);
					} else {
						accuracy.push(resultJson[key]);
					}
				});

				res.send([streak, accuracy]);
			}
		}
	);
});

app.get("/getAllStatisticFiveTimes/:value", (req, res) => {
	const id = req.params.value;

	dbUser.query("SELECT * FROM fivetimes WHERE userID= ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

			const keys = Object.keys(resultJson);

			var statRes = [];
			var recorde = resultJson["recordeScore"];
			statRes.push(recorde);
			keys.forEach((key, index) => {
				if (
					key !== "userID" &&
					key !== "recordeScore" &&
					key !== "recordeAccuracy"
				) {
					statRes.push(resultJson[key]);
				}
			});

			res.send([statRes]);
		}
	});
});

app.get("/getFiveTimesWords", (req, res) => {
	dbUser.query("SELECT fiveTime FROM gamesentence", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)));

			const keys = Object.keys(resultJson);

			var statRes = [];
			for (var i = 0; i < resultJson.length; i++) {
				statRes.push(resultJson[i].fiveTime);
			}

			res.send([statRes]);
		}
	});
});

app.get("/getCodingsWords", (req, res) => {
	dbUser.query("SELECT coding FROM gamesentence", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)));

			const keys = Object.keys(resultJson);

			var statRes = [];
			for (var i = 0; i < resultJson.length; i++) {
				if (resultJson[i].coding !== null) {
					statRes.push(resultJson[i].coding);
				}
			}

			res.send([statRes]);
		}
	});
});

app.get("/getCodingRecords/:value", (req, res) => {
	const id = req.params.value;

	dbUser.query(
		"SELECT recordeScore, recordeAccuracy FROM codinggame WHERE userID=?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];
				const keys = Object.keys(resultJson);

				var accuracy = [];
				var streak = [];

				keys.forEach((key, index) => {
					if (key === "recordeScore") {
						streak.push(resultJson[key]);
					} else {
						accuracy.push(resultJson[key]);
					}
				});

				res.send([streak, accuracy]);
			}
		}
	);
});

app.post("/CodingResult", (req, res) => {
	const id = req.body.id;
	const accuracy = req.body.accuracy;
	const score = req.body.score;

	var update = [];
	var updateStars = [];

	dbUser.query("SELECT * FROM codinggame WHERE UserID=?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];
			const keys = Object.keys(resultJson);
			var insertArr = [];
			keys.forEach((key, index) => {
				if (key !== "UserID") {
					insertArr.push(resultJson[key]);
				}
			});

			var nextVal = 0;

			if (insertArr[0] < accuracy) {
				insertArr[0] = accuracy;
			}
			if (insertArr[1] < score) {
				insertArr[1] = score;
			}
			var newScore = (score + accuracy) / 2;
			insertArr.splice(2, 0, newScore);
			insertArr.pop();

			dbUser.query(
				"UPDATE codinggame SET  recordeAccuracy =?, recordeScore = ?, G1=?, G2=?, G3=?, G4=?, G5=?, G6=?, G7=?, G8=?, G9=?, G10=?, G11=?, G12=?, G13=?, G14=?, G15=?, G16=?, G17=?, G18=?, G19=?, G20=? WHERE UserID = ?",
				[
					insertArr[0],
					insertArr[1],
					insertArr[2],
					insertArr[3],
					insertArr[4],
					insertArr[5],
					insertArr[6],
					insertArr[7],
					insertArr[8],
					insertArr[9],
					insertArr[10],
					insertArr[11],
					insertArr[12],
					insertArr[13],
					insertArr[14],
					insertArr[15],
					insertArr[16],
					insertArr[17],
					insertArr[18],
					insertArr[19],
					insertArr[20],
					insertArr[21],
					id,
				],
				(err, result) => {
					if (err) {
						console.log(err);
					} else {
						res.send(["Done"]);
					}
				}
			);
		}
	});
});

app.get("/getAllStatisticCoding/:value", (req, res) => {
	const id = req.params.value;

	dbUser.query(
		"SELECT * FROM codinggame WHERE UserID= ?",
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				const resultJson = Object.values(JSON.parse(JSON.stringify(result)))[0];

				const keys = Object.keys(resultJson);

				var statRes = [];
				var recorde = resultJson["recordeScore"];
				statRes.push(recorde);
				keys.forEach((key, index) => {
					if (
						key !== "UserID" &&
						key !== "recordeScore" &&
						key !== "recordeAccuracy"
					) {
						statRes.push(resultJson[key]);
					}
				});

				res.send([statRes]);
			}
		}
	);
});

/**---------------listening Port------------------------------------------------------------------------------------------ */
app.listen(3001, () => {
	console.log("Your server is running on port 3001");
});
