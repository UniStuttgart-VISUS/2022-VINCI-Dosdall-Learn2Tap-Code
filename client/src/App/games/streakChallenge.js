import React, { useEffect, useState, useContext } from "react";
import "./gamesMenu.css";
import {
	addStatisticToDatabase,
	sendUserTracking,
} from "../functions/functions";
import Axios from "axios";
import Cookies from "js-cookie";
import { idContext } from "../../idContext";

export const StreakChallenge = (props) => {
	const [showSelection, setShowSelection] = useState(true);
	const { value, setValue } = useContext(idContext);
	const [dialog, setDialog] = useState(false);
	const [showLetter, setShowLetter] = useState(false);
	const [showLetterColor, setShowLetterColor] = useState(false);
	const [initialize, setInitialize] = useState(true);
	const [selection, setSelection] = useState([
		false,
		false,
		false,
		false,
		false,
	]);
	const [rightHand, setRightHand] = useState(true);

	const [singleTapSymbols, setSingleTapSymbols] = useState([]);
	const [singleTabCombination, setSingleTapCombination] = useState([]);
	const [doubleTapSymbols, setDoubleTapSymbols] = useState([]);
	const [doubleTabCombination, setDoubleTapCombination] = useState([]);
	const [doubleTapKeys, setDoubleTapKeys] = useState([]);
	const [tripleTapSymbols, setTripleTapSymbols] = useState([]);
	const [tripleTabCombination, setTripleTapCombination] = useState([]);
	const [tripleTpKeys, setTripleTapKeys] = useState([]);
	const [shiftSymbols, setShiftSymbols] = useState([]);
	const [shiftCombination, setShiftCombintion] = useState([]);
	const [shitKeys, setShiftKeys] = useState([]);
	const [intervallCounter, setIntervalCounter] = useState(0);
	const [switchSymbols, setSwitchSymbols] = useState([]);
	const [switchCombination, setSwitchCombintion] = useState([]);
	const [switchKeys, setSwitchKeys] = useState([]);
	const [gameState, setGameState] = useState([]);
	const [intervallCountdownCounter, setIntervallCountdownCounter] = useState(0);
	const [countDownNum, setCountDownNum] = useState(3);
	const [countdown, setCountDown] = useState(false);
	const [timerGame, setTimerGame] = useState("2:00");
	const [timerMin, setTimerMin] = useState(2);
	const [timerSec, setTimerSec] = useState(0);
	const [pauseDialog, setPauseDialog] = useState(false);
	//Constantes for Game
	const [symbolToHit, setSymbolToHit] = useState("C");
	const [keyToHit, setKeyToHit] = useState("");
	const [gameSymbols, setGameSymbols] = useState([]);
	const [gameCombinations, setGameCombination] = useState([]);
	const [gameKeys, setGameKeys] = useState([]);
	const [orderSymbols, setOrderSymbols] = useState([]);
	const [numKeysPressed, setNumKeyPressed] = useState(0);
	const [numSuccKey, setnumSuccKey] = useState(0);
	const [numShownSym, setNumShownSym] = useState(0);
	const [help, setHelp] = useState("");
	const [accuracyStr, setAccuracyStr] = useState("100%");
	const [hitCounter, setHitCounter] = useState(0);
	const [timerNextSym, setTimerNextSym] = useState(10);
	const [nextSymTimerRunning, setMextSymTimerRunning] = useState(false);

	const [currShiftKeys, setCurrShiftKeys] = useState([]);
	const [multipleKey, setMultipleKey] = useState(false);
	const [showSymbolToHit, setShowSymbolToHit] = useState(false);
	const [showTick, setShowTick] = useState(false);
	const [showCross, setShowCross] = useState(false);
	const [recordAccuracy, setRecordeAccuracy] = useState("");
	const [recordStreak, setRecordeStreak] = useState("");
	//for update Accuracy
	const [arrayTimesLetterAp, setArrayTimesLetterAp] = useState([]);
	const [arrayTimesLetterHit, setArrayTimesLetterHit] = useState([]);
	const [arrTimesWrong, setArrTimesWrong] = useState([]);

	const [readShiftKey, setReadShiftKey] = useState([false]);
	const [numSymRounds, setNumSymRound] = useState(0);
	const [backSymbol, setBackSymbol] = useState("○ ⬤⬤⬤○");
	const [replaySmbol, setReplaySymbol] = useState("○ ⬤⬤⬤⬤");
	const [countineSymbol, setCountineSymbol] = useState("⬤ ⬤⬤⬤○");
	const [startIndexShift, setStartIndexShift] = useState(-1);
	const [endIndexShift, setEndIndexShift] = useState(-1);
	const [showShiftSymbolToHit, setShowShiftSymbolToHit] = useState(false);
	const [indexCurrSymbol, setIndexCurrSymbol] = useState(-1);
	const [showenKeys, setShowenKey] = useState([]);
	const [allPressedKeys, setALlPressedKeys] = useState([]);
	const [accuracyToSend, setAccuracyToSend] = useState(0);
	const [lastKey, setLastKey] = useState("");
	const [typingSPeedArr, setTypingSpeedArr] = useState([]);
	const [startTS, setStartTypingSpeed] = useState(0);

	const play = useKeyPress();

	const handleChange = (e) => {
		var index = parseInt(e.target.value);
		var currSelection = selection;
		if (currSelection[index] === false) {
			currSelection[index] = true;
		} else {
			currSelection[index] = false;
		}

		setSelection(currSelection);
	};
	function createRandomOrder(arrayNums) {
		var array = arrayNums;
		var val,
			indexCur = array.length;
		var counter = array.length - 1;

		while (counter) {
			indexCur = Math.floor(Math.random() * (counter + 1));
			val = array[indexCur];
			array[indexCur] = array[counter];
			array[counter] = val;
			--counter;
		}

		return array;
	}

	function nextShiftKeyCombi(combi) {
		var shiftKeyCombiCurr = combi;

		var singleShiftKeys = [];
		var shiftKeysPressed = [];
		var currKeyI = "";
		for (var i = 0; i < shiftKeyCombiCurr.length; i++) {
			var currSym = shiftKeyCombiCurr[i];

			if (currSym !== " " && i !== shiftKeyCombiCurr.length - 1) {
				currKeyI = currKeyI + currSym;
			} else {
				if (i === shiftKeyCombiCurr.length - 1) {
					currKeyI = currKeyI + currSym;
				}
				singleShiftKeys.push(currKeyI);
				currKeyI = "";
				shiftKeysPressed.push(false);
			}
		}
		setCurrShiftKeys(singleShiftKeys);
		setReadShiftKey(shiftKeysPressed);
		setMultipleKey(true);
	}

	function createShiftObject(keyPressed) {
		var res = readShiftKey;
		var currSingleKeys = currShiftKeys;

		if (currSingleKeys.indexOf(keyPressed) !== -1) {
			var currIndex = parseInt(currSingleKeys.indexOf(keyPressed));

			res[currIndex] = true;

			if (keyPressed === "Backspace") {
				currIndex = parseInt(currSingleKeys.lastIndexOf(keyPressed));
				res[currIndex] = true;
			} else if (keyPressed === "Shift") {
				currIndex = parseInt(currSingleKeys.lastIndexOf(keyPressed));
				res[currIndex] = true;
			}
			setReadShiftKey(res);
			setMultipleKey(true);
		} else {
			for (var i = 0; i < res.length; i++) {
				res[i] = false;
				setReadShiftKey(res);
			}
			setMultipleKey(false);
			nextSmybol(false);
		}
	}

	function clickStart() {
		var currSymbols = [];
		var currCombination = [];
		var currKeys = [];
		sendUserTracking(
			value,
			"selection ",
			'"' + selection + '"',
			"Games-TimeToTap"
		);

		if (selection[0]) {
			currSymbols = currSymbols.concat(singleTapSymbols);
			currCombination = currCombination.concat(singleTabCombination);
			currKeys = currKeys.concat(singleTapSymbols);
		}
		if (selection[1]) {
			currSymbols = currSymbols.concat(doubleTapSymbols);
			currCombination = currCombination.concat(doubleTabCombination);
			currKeys = currKeys.concat(doubleTapKeys);
		}
		if (selection[2]) {
			currSymbols = currSymbols.concat(tripleTapSymbols);
			currCombination = currCombination.concat(tripleTabCombination);
			currKeys = currKeys.concat(tripleTpKeys);
		}
		if (selection[3]) {
			setStartIndexShift(currSymbols.length);

			currSymbols = currSymbols.concat(shiftSymbols);
			currCombination = currCombination.concat(shiftCombination);
			currKeys = currKeys.concat(shitKeys);
			setEndIndexShift(currSymbols.length);
		}
		if (selection[4]) {
			currSymbols = currSymbols.concat(switchSymbols);
			currCombination = currCombination.concat(switchCombination);
			currKeys = currKeys.concat(switchKeys);
		}
		setGameCombination(currCombination);
		setGameSymbols(currSymbols);
		setGameKeys(currKeys);
		var currOrder = [];
		for (var i = 0; i < currCombination.length; i++) {
			currOrder.push(i);
		}

		currOrder = createRandomOrder(currOrder);
		setOrderSymbols(currOrder);
		setSymbolToHit(currSymbols[currOrder[0]]);

		var keysShowen = showenKeys;
		keysShowen.push(currSymbols[currOrder[0]]);
		setShowenKey(keysShowen);

		setKeyToHit(currKeys[currOrder[0]]);
		var lenghtA = currSymbols.length;
		var currTim = new Array(currSymbols.length).fill(0);

		setArrTimesWrong(new Array(currSymbols.length).fill(0));
		setArrayTimesLetterHit(new Array(lenghtA).fill(0));
		currTim[currOrder[0]] = 1;
		setArrayTimesLetterAp(currTim);

		if (currKeys[currOrder[0]].length > 1) {
			nextShiftKeyCombi(currKeys[currOrder[0]]);
			setMultipleKey(true);
		}

		if (
			selection[3] &&
			currOrder[0] >= startIndexShift &&
			currOrder[0] <= endIndexShift
		) {
			setIndexCurrSymbol(currOrder[0]);
			setShowShiftSymbolToHit(true);
			setShowSymbolToHit(false);
		} else {
			setShowSymbolToHit(true);
			setShowShiftSymbolToHit(false);
		}

		setShowSelection(false);
		setGameState("countdown");
		setCountDown(true);
	}
	function sendUserTrackingAtENd() {
		var currAcc = parseInt((numSuccKey / numShownSym) * 100);
		var score = (currAcc + hitCounter) / 2;

		Axios.post(
			"http://localhost:3001/TimeToTapResult",

			{
				id: value,
				accuracy: currAcc,
				hit: hitCounter,
				score: score,
			}
		).then((response) => {
			Axios.post(
				"http://localhost:3001/userTracking",

				{
					id: value,
					event: "games finished - score",
					eventName: currAcc + " % , Score: " + score,
					location: "TTT",
				}
			).then((response) => {
				setDialog(true);

				sendUserTracking(
					value,
					'All Key Pressed "' + allPressedKeys + '"',
					'SHowen Words "' + showenKeys + '"',
					"TTT"
				);
				sendUserTracking(
					value,
					'SHowen Words "' + showenKeys + '"',
					'TypingSpeed "' + typingSPeedArr + '"',
					"TTT"
				);
			});
		});
	}

	function sendSwitch(resultSwitchSwitch) {
		Axios.post(
			"http://localhost:3001/statisticSwitch",

			{
				id: value,
				symbols: switchSymbols,
				statistic: resultSwitchSwitch,
				unitLevelID: "U0_L0",
				stars: 0,
			}
		).then((response) => {
			sendUserTrackingAtENd();
		});
	}
	function sendShift(reusltShiftShift, resultSwitchSHift) {
		Axios.post(
			"http://localhost:3001/statisticShift",

			{
				id: value,
				symbols: shiftSymbols,
				statistic: reusltShiftShift,
				unitLevelID: "U0_L0",
				stars: 0,
			}
		).then((response) => {
			if (selection[4]) {
				sendSwitch(resultSwitchSHift);
			} else {
				sendUserTrackingAtENd();
			}
		});
	}

	function sendTTTap(resultTTTT, resultshiftTT, resultSwitchTT) {
		Axios.post(
			"http://localhost:3001/statisticTripleTap",

			{
				id: value,
				symbols: tripleTapSymbols,
				statistic: resultTTTT,
				unitLevelID: "U0_L0",
				stars: 0,
			}
		).then((response) => {
			if (selection[3]) {
				sendShift(resultshiftTT, resultSwitchTT);
			} else if (selection[4]) {
				sendSwitch(resultSwitchTT);
			} else {
				sendUserTrackingAtENd();
			}
		});
	}

	function sendDoubleTap(
		resultDTDT,
		resultTTDT,
		resultshiftDT,
		resultSwitchDT
	) {
		Axios.post(
			"http://localhost:3001/statisticDoubleTap",

			{
				id: value,
				symbols: doubleTapSymbols,
				statistic: resultDTDT,
				unitLevelID: "U0_L0",
				stars: 0,
			}
		).then((response) => {
			if (selection[2]) {
				sendTTTap(resultTTDT, resultshiftDT, resultSwitchDT);
			} else if (selection[3]) {
				sendShift(resultshiftDT, resultSwitchDT);
			} else if (selection[4]) {
				sendSwitch(resultSwitchDT);
			} else {
				sendUserTrackingAtENd();
			}
		});
	}

	function sendSingleTapStat(
		resultST,
		resultDT,
		resultTT,
		resultShift,
		resultSwitch
	) {
		Axios.post(
			"http://localhost:3001/statisticSingleTapWReponse",

			{
				id: value,
				symbols: singleTapSymbols,
				statistic: resultST,
				unitLevelID: "U0_L0",
				stars: 0,
			}
		).then((response) => {
			if (selection[1]) {
				sendDoubleTap(resultDT, resultTT, resultShift, resultSwitch);
			} else if (selection[2]) {
				sendTTTap(resultTT, resultShift, resultSwitch);
			} else if (selection[3]) {
				sendShift(resultShift, resultSwitch);
			} else if (selection[4]) {
				sendSwitch(resultSwitch);
			} else {
				sendUserTrackingAtENd();
			}
		});
	}
	function finishGame() {
		setGameState("endDialog");

		var resArr = [];
		for (var i = 0; i < arrayTimesLetterAp.length; i++) {
			if (arrayTimesLetterAp[i] !== 0) {
				var calculate =
					(arrayTimesLetterHit[i] /
						(arrayTimesLetterAp[i] + arrTimesWrong[i])) *
					100;
				resArr.push(calculate);
			} else {
				resArr.push(-1);
			}
		}
		var singleRes = [];
		var doubleRes = [];
		var tripleRes = [];
		var shiftRes = [];
		var switchRes = [];

		if (selection[0]) {
			for (var x = 0; x < singleTapSymbols.length; x++) {
				var currObj = resArr.shift();
				singleRes.push(currObj);
			}
		}

		if (selection[1]) {
			for (var w = 0; w < doubleTapSymbols.length; w++) {
				var currObjDT = resArr.shift();
				doubleRes.push(currObjDT);
			}
		}

		if (selection[2]) {
			for (var z = 0; z < tripleTapSymbols.length; z++) {
				var currObjTT = resArr.shift();
				tripleRes.push(currObjTT);
			}
		}
		if (selection[3]) {
			for (var r = 0; r < shiftSymbols.length; r++) {
				var currObjST = resArr.shift();
				shiftRes.push(currObjST);
			}

			addStatisticToDatabase(
				value,
				shiftSymbols,
				shiftRes,
				"U0_L0",
				0,
				"shift"
			);
		}

		if (selection[4]) {
			for (var t = 0; t < switchSymbols.length; t++) {
				var currObjSW = resArr.shift();
				switchRes.push(currObjSW);
			}
		}

		if (selection[0]) {
			sendSingleTapStat(singleRes, doubleRes, tripleRes, shiftRes, switchRes);
		} else if (selection[1]) {
			sendDoubleTap(doubleRes, tripleRes, shiftRes, switchRes);
		} else if (selection[2]) {
			sendTTTap(tripleRes, shiftRes, switchRes);
		} else if (selection[3]) {
			sendShift(shiftRes, switchRes);
		} else if (selection[4]) {
			sendSwitch(switchRes);
		} else {
			sendUserTrackingAtENd();
		}
	}

	function replay() {
		window.location.href = "/Learn2Tap/TimeToTap";
	}

	function nextSmybol(rightHit) {
		if (numSymRounds === orderSymbols.length - 2) {
			setOrderSymbols(createRandomOrder(orderSymbols));
			setNumSymRound(0);
		} else {
			setNumSymRound(numSymRounds + 1);
		}

		setNumShownSym(numShownSym + 1);
		var indexNext = orderSymbols[numSymRounds + 1];

		if (
			selection[3] &&
			indexNext > startIndexShift &&
			indexNext < endIndexShift
		) {
			setShowShiftSymbolToHit(true);
			setShowSymbolToHit(false);
		} else {
			setShowSymbolToHit(true);
			setShowShiftSymbolToHit(false);
		}
		setIndexCurrSymbol(indexNext);
		var indexCurr = orderSymbols[numSymRounds];

		setSymbolToHit(gameSymbols[indexNext]);

		var keysShowen = showenKeys;
		keysShowen.push(gameSymbols[indexNext]);
		setShowenKey(keysShowen);
		var nextKey = gameKeys[indexNext];

		setKeyToHit(nextKey);

		if (nextKey.length > 1) {
			nextShiftKeyCombi(nextKey);
			setMultipleKey(true);
		}
		var currTimeLetter = arrayTimesLetterAp;
		currTimeLetter[indexNext] = currTimeLetter[indexNext] + 1;

		setArrayTimesLetterAp(currTimeLetter);
		var currSymShowen = numSymRounds + 1;

		var currKeysHIt = numSuccKey;
		if (rightHit) {
			setHitCounter(hitCounter + 1);
			setShowTick(true);
			setShowShiftSymbolToHit(false);
			setShowSymbolToHit(false);
			currKeysHIt = currKeysHIt + 1;
			setnumSuccKey(numSuccKey + 1);
			var currTimeHit = arrayTimesLetterHit;
			currTimeHit[indexCurr] = currTimeHit[indexCurr] + 1;
			setArrayTimesLetterHit(currTimeHit);
		} else {
			if (hitCounter > 0) {
				setHitCounter(hitCounter - 1);
			}
			setShowShiftSymbolToHit(false);
			setShowSymbolToHit(false);
			setShowCross(true);
			setHelp(gameCombinations[indexCurr]);
			var timeWrong = arrTimesWrong;
			timeWrong[indexCurr] = timeWrong[indexCurr] + 1;
			setArrTimesWrong(timeWrong);
		}
		setMextSymTimerRunning(true);
		var currAccuracy = parseInt((currKeysHIt / (numShownSym + 1)) * 100);
		setAccuracyStr(currAccuracy + "%");

		var currArrTS = typingSPeedArr;
		var ts = (intervallCounter - startTS) / 10;
		currArrTS.push(ts);
		setTypingSpeedArr(currArrTS);
		setStartTypingSpeed(intervallCounter);
	}

	function useKeyPress() {
		// State for keeping track of whether key is pressed
		const [keyPressed, setKeyPressed] = useState(false);
		// If pressed key is our target key then set to true
		function downHandler({ key }) {
			setLastKey(key);
			var allPressed = allPressedKeys;
			allPressed.push(key);
			setALlPressedKeys(allPressed);

			if (
				gameState === "play" &&
				showCross === false &&
				showTick === false &&
				dialog == false &&
				pauseDialog == false
			) {
				if (keyToHit.length === 1) {
					if (key === keyToHit) {
						nextSmybol(true);
					} else {
						nextSmybol(false);
					}
				} else {
					createShiftObject(key);
					//Shift and switch here
				}
			} else if (pauseDialog) {
				if (key === "r") {
					sendUserTracking(
						value,
						"key press: " + key,
						"Replay/ Start New Game",
						"Pause-Dialog TTT "
					);
					//replay game
					replay();
				} else if (key === "u") {
					//Back
					sendUserTracking(
						value,
						"key press: " + key,
						"End pause",
						"Pause-Dialog TTT "
					);
					setGameState("countdown");
					setPauseDialog(false);
					setCountDown(true);
				} else if (key === "Backspace") {
					sendUserTracking(
						value,
						"key press: " + key,
						"Back",
						"Pause-Dialog TTT "
					);
					window.location.href = "/Learn2Tap/GamesMenu";
				}
			} else if (dialog) {
				//replay
				if (key === "r") {
					sendUserTracking(
						value,
						"key press: " + key,
						"Replay",
						"End-Dialog TTT"
					);
					replay();

					//Back
				} else if (key === "Backspace") {
					sendUserTracking(
						value,
						"key press: " + key,
						"Back",
						"End-Dialog TTT "
					);

					window.location.href = "/Learn2Tap/GamesMenu";
				}
			}
		}

		// If released key is our target key then set to false
		const upHandler = ({ key }) => {
			setKeyPressed(false);
		};

		// Add event listeners
		useEffect(() => {
			window.addEventListener("keydown", downHandler);
			window.addEventListener("keyup", upHandler);
			// Remove event listeners on cleanup
			return () => {
				window.removeEventListener("keydown", downHandler);
				window.removeEventListener("keyup", upHandler);
			};
		}); // Empty array ensures that effect is only run on mount and unmount
		return keyPressed;
	}

	useEffect(() => {
		const timer = setInterval(() => {
			if (initialize) {
				var hand = Cookies.get("Hand");
				var currRight = true;

				if (hand === "left") {
					setRightHand(false);
					currRight = false;
					setBackSymbol("○⬤⬤⬤ ○");
					setReplaySymbol("⬤⬤⬤⬤ ○");
					setCountineSymbol("○⬤⬤⬤ ⬤");
				}

				Axios.get(`http://localhost:3001/getTimeToHitRecords/${value}`).then(
					(response) => {
						var recordeHitcur = response.data[0];
						var currRecAccuracy = response.data[1];
						setRecordeStreak(recordeHitcur[0] + "✧");
						setRecordeAccuracy(currRecAccuracy[0] + "%");
					}
				);

				Axios.get(
					`http://localhost:3001/getSymbolArraySingleTab/${[
						27, 29,
					]}/${currRight}/${0}`
				).then((response) => {
					setSingleTapSymbols(response.data[2]);
					setSingleTapCombination(response.data[3]);
				});

				Axios.get(
					`http://localhost:3001/getSymbolArrayDoubleTap/${[
						27, 31,
					]}/${currRight}/${0}`
				).then((response) => {
					var currSymbolDouble = response.data[2];
					var indexToUseD = currSymbolDouble.indexOf("[[");
					currSymbolDouble[indexToUseD] = "[";
					setDoubleTapSymbols(currSymbolDouble);
					setDoubleTapCombination(response.data[3]);
					setDoubleTapKeys(response.data[5]);
				});

				Axios.get(
					`http://localhost:3001/getSymbolArrayTripleTap/${[
						26, 27,
					]}/${currRight}/${0}`
				).then((response) => {
					var currSymbolTriple = response.data[2];
					var indexToUse = currSymbolTriple.indexOf("]]");
					currSymbolTriple[indexToUse] = "]";
					indexToUse = currSymbolTriple.indexOf("\\");

					var nextSym = "\\";
					nextSym = nextSym.charAt(0);
					currSymbolTriple[indexToUse] = nextSym;

					setTripleTapSymbols(currSymbolTriple);
					setTripleTapCombination(response.data[3]);
					setTripleTapKeys(response.data[5]);
				});

				Axios.get(
					`http://localhost:3001/getSymbolArrayShift/${[
						26, 27,
					]}/${currRight}/${0}`
				).then((response) => {
					setShiftSymbols(response.data[2]);
					setShiftCombintion(response.data[3]);
					setShiftKeys(response.data[5]);
				});

				Axios.get(
					`http://localhost:3001/getSymbolArraySwitch/${[
						27, 29,
					]}/${currRight}/${0}`
				).then((response) => {
					var currSySwitch = response.data[2];
					var currKeySwitch = response.data[5];

					var indexFirst = currSySwitch.indexOf(",<br>");
					currSySwitch[indexFirst] = ",";
					currKeySwitch[indexFirst] = ",";
					currSySwitch[indexFirst + 1] = ";";
					currKeySwitch[indexFirst + 1] = ";";

					setSwitchSymbols(currSySwitch);
					setSwitchCombintion(response.data[3]);
					setSwitchKeys(currKeySwitch);
				});
				setInitialize(false);
			}

			if (gameState === "countdown") {
				setIntervallCountdownCounter(intervallCountdownCounter + 1);

				if (intervallCountdownCounter === 10) {
					setCountDownNum(countDownNum - 1);
					setIntervallCountdownCounter(0);
				}
				if (countDownNum === 1 && intervallCountdownCounter === 9) {
					setCountDown(false);
					setGameState("play");
					setShowLetter(true);
					setCountDownNum(3);
					setIntervallCountdownCounter(0);
				}
			} else if (gameState === "play") {
				setIntervalCounter(intervallCounter + 1);
				setIntervallCountdownCounter(intervallCountdownCounter + 1);

				if (intervallCountdownCounter === 10) {
					var currSec = timerSec - 1;
					if (currSec === -1) {
						currSec = 59;
					}
					var currMin = timerMin;
					if (currSec === 59) {
						currMin = currMin - 1;
					}
					if (currMin < 0) {
						setShowLetter(false);
						finishGame();
					}
					setTimerSec(currSec);
					setTimerMin(currMin);
					var nextTime = currMin + ":" + currSec;
					if (currSec < 10) {
						nextTime = currMin + ":0" + currSec;
					}
					setTimerGame(nextTime);
					setIntervallCountdownCounter(0);
				}

				if (nextSymTimerRunning) {
					setTimerNextSym(timerNextSym - 1);
					if (timerNextSym === 1) {
						setHelp("");
						setShowCross(false);
						setShowTick(false);
						if (
							selection[3] &&
							indexCurrSymbol > startIndexShift &&
							indexCurrSymbol < endIndexShift
						) {
							setShowShiftSymbolToHit(true);
						} else {
							if (
								selection[3] &&
								indexCurrSymbol > startIndexShift &&
								indexCurrSymbol < endIndexShift
							) {
								setShowShiftSymbolToHit(true);
								setShowSymbolToHit(false);
							} else {
								setShowSymbolToHit(true);
								setShowShiftSymbolToHit(false);
							}
						}
						setTimerNextSym(10);
						setMextSymTimerRunning(false);
					}
				}
				if (multipleKey) {
					if (readShiftKey.includes(false) === false) {
						nextSmybol(true);
						setMultipleKey(false);
					}
				}
			} else if (gameState === "pause") {
			}
		}, 100);
		// clearing interval
		return () => clearInterval(timer);
	});

	return (
		<div id="returnMenuDiv">
			<div>
				<div width="100%" class="row">
					<div class="col">
						<button
							class="normalButton"
							type="button"
							id="menuButtonSingleTap"
							onClick={() => {
								sendUserTracking(
									value,
									"button click",
									"Menu Button",
									"Games Menu"
								);
								window.location.href = "/Learn2Tap/GamesMenu";
							}}
						>
							Menu
						</button>
					</div>
					<div class="col" id="spaceDivHeader"></div>
					<div class="col" id="spaceDivHeader"></div>
					<div class="col" id="spaceDivHeader"></div>
					<div class="col" id="spaceDivHeader"></div>
					<div class="col" id="glossaryButtonDiv">
						{showLetter && (
							<div id="pauseDiv">
								<button
									class="normalButton"
									id="pauseButtonGames"
									type="button"
									onClick={() => {
										sendUserTracking(
											value,
											"button click",
											"Pause Button",
											"Games-TimeToTap"
										);
										setGameState("pause");
										setPauseDialog(true);
										setShowLetter(false);
									}}
								>
									Pause
								</button>
								<br></br>
							</div>
						)}
					</div>
				</div>

				<h2>Time To Tap</h2>
				{showLetter && <div id="last">Last Tapped Combination: {lastKey}</div>}

				{showSelection && (
					<div className="modeSelection">
						Choose which modes you want to practice:
						<br></br>
						<br></br>
						<div class="row">
							<div class="col">
								<input
									type="checkbox"
									className="custom_checkbox"
									value="0"
									onChange={handleChange}
								></input>
								<label for="myInput">Single Tap</label>
							</div>
							<div class="col">
								<input
									type="checkbox"
									class="custom_checkbox"
									value="1"
									onChange={handleChange}
								></input>
								<label for="myInput">Double Tap</label>
							</div>
							<div class="col">
								<input
									type="checkbox"
									className="custom_checkbox"
									value="2"
									onChange={handleChange}
								></input>
								<label for="myInput">Triple Tap</label>
							</div>
							<div class="col">
								<input
									className="custom_checkbox"
									type="checkbox"
									value="3"
									onChange={handleChange}
								></input>
								<br></br>
								<label for="myInput">Shift</label>
							</div>
							<div class="col">
								<input
									className="custom_checkbox"
									type="checkbox"
									value="4"
									onChange={handleChange}
								></input>
								<br></br>
								<label for="myInput">Switch</label>
							</div>
						</div>
						<button
							class="normalButton"
							id="startButtonGames"
							type="button"
							onClick={() => {
								sendUserTracking(
									value,
									"button click",
									"Start Button",
									"Games-TimeToTap"
								);
								if (selection.indexOf(true) === -1) {
									alert(
										"You must select at least one mode to start 'Time To Tap'."
									);
								} else {
									clickStart();
								}
							}}
						>
							Start
						</button>
					</div>
				)}

				<div class="mainDiv">
					{countdown && (
						<div>
							<p class="countdown">{countDownNum}</p>
						</div>
					)}

					{showLetter && (
						<div id="showLetterGames">
							<div class="bar" id="showLetterGames">
								<div class="container">
									<div class="row">
										<div class="col">
											{accuracyStr}
											<br></br>
											Round Accuracy
										</div>
										<div class="col">{timerGame}</div>
									</div>
								</div>
							</div>
							<div class="showLetterTutoriel" id="showLetterGames">
								<div id="prac" style={{ color: "black" }}>
									<div id="symbolDiv">
										<br></br>
										<br></br>
										<br></br>
										{showSymbolToHit && (
											<p id="letterTutoriel">{symbolToHit}</p>
										)}
										{showShiftSymbolToHit && (
											<p id="shiftLetter">{symbolToHit}</p>
										)}
										{showTick && (
											<p id="letterTutoriel" style={{ color: "green" }}>
												{" "}
												✓{" "}
											</p>
										)}
										{showCross && (
											<p id="letterTutoriel" style={{ color: "red" }}>
												✗
											</p>
										)}
										<br></br>
										<h5> {help}</h5>
										<br></br>
									</div>
									<div id="accuracyDiv">
										<h1>✧ {hitCounter} ✧</h1>
									</div>
									<div id="recordsDiv">
										<div class="row">
											<div class="col">
												{recordAccuracy}
												<br></br>
												Recorde Accuracy
											</div>
											<div class="col">
												{recordStreak}
												<br></br>
												Recorde Streak
											</div>
										</div>
									</div>
								</div>{" "}
							</div>
						</div>
					)}

					{showLetterColor && (
						<div id="prac" style={{ color: "red" }}>
							<p class="letterTutoriel">A</p>
							<h1>X</h1>{" "}
						</div>
					)}

					{dialog && (
						<div>
							RESULTS
							<br></br>
							<div id="recordeResult" width="100%">
								<div class="row">
									<div class="col">
										{recordAccuracy}
										<br></br>
										Recorde Accuracy
									</div>
									<div class="col">
										{recordStreak}
										<br></br>
										Recorde Right Taps
									</div>
								</div>
							</div>
							<br></br>
							<div id="roundResult">
								<div class="row">
									<div class="col">
										{accuracyStr}
										<br></br>
										Round Accuracy
									</div>
									<div class="col">
										{hitCounter} ✧<br></br>
										Round Taps
									</div>
								</div>
							</div>
							<button
								class="normalButton"
								type="button"
								id="dialogButtonGames"
								onClick={() => {
									sendUserTracking(
										value,
										"button click",
										"Replay Button",
										"TTT-EndDialog"
									);
									replay();
								}}
							>
								Replay <br></br>
								{replaySmbol}
							</button>
							<br></br>
							<button
								class="normalButton"
								type="button"
								id="dialogButtonGames"
								onClick={() => {
									sendUserTracking(
										value,
										"button click",
										"Back Button",
										"TTT-EndDialog"
									);

									window.location.href = "/Learn2Tap/GamesMenu";
								}}
							>
								Back <br></br>
								{backSymbol}
							</button>
						</div>
					)}

					{pauseDialog && (
						<div>
							<h3>Pause</h3>

							<button
								class="normalButton"
								type="button"
								id="dialogButtonGames"
								onClick={() => {
									sendUserTracking(
										value,
										"button click",
										"Contine Game",
										"TTT-PauseDialog"
									);
									setGameState("countdown");
									setPauseDialog(false);
									setCountDown(true);
								}}
							>
								{" "}
								▷<br></br>
								{countineSymbol}
							</button>
							<br></br>

							<button
								class="normalButton"
								type="button"
								id="dialogButtonGames"
								onClick={() => {
									sendUserTracking(
										value,
										"button click",
										"Replay Game",
										"TTT-PauseDialog"
									);
									replay();
								}}
							>
								{" "}
								Replay
								<br></br>
								{replaySmbol}
							</button>

							<br></br>
							<button
								class="normalButton"
								type="button"
								id="dialogButtonGames"
								onClick={() => {
									sendUserTracking(
										value,
										"button click",
										"Exit Game",
										"TTT-PauseDialog"
									);
									window.location.href = "/Learn2Tap/GamesMenu";
								}}
							>
								Exit <br></br>
								{backSymbol}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
