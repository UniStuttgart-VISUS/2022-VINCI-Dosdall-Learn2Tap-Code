import React, { useEffect, useState, useContext } from "react";
import "./gamesMenu.css";
import {
	addStatisticToDatabase,
	sendUserTracking,
} from "../functions/functions";
import Axios from "axios";
import Cookies from "js-cookie";
import { idContext } from "../../idContext";

export const Coding = (props) => {
	const [showSelection, setShowSelection] = useState(true);
	const { value, setValue } = useContext(idContext);
	const [dialog, setDialog] = useState(false);
	const [showLetter, setShowLetter] = useState(false);
	const [showLetterColor, setShowLetterColor] = useState(false);
	const [initialize, setInitialize] = useState(true);

	const [rightHand, setRightHand] = useState(true);

	const [singleTapSymbols, setSingleTapSymbols] = useState([]);
	const [singleTabCombination, setSingleTapCombination] = useState([]);
	const [doubleTapSymbols, setDoubleTapSymbols] = useState([]);
	const [doubleTabCombination, setDoubleTapCombination] = useState([]);
	const [doubleTabKey, setDoubleTapKey] = useState([]);
	const [tripleTapSymbols, setTripleTapSymbols] = useState([]);
	const [tripleTabCombination, setTripleTapCombination] = useState([]);
	const [tripleTabKey, setTripleTapKey] = useState([]);

	const [switchSymbols, setSwitchSymbols] = useState([]);
	const [switchCombination, setSwitchCombintion] = useState([]);
	const [switchKeys, setSwitchKeys] = useState([]);
	const [gameState, setGameState] = useState("");
	const [intervallCountdownCounter, setIntervallCountdownCounter] = useState(0);
	const [countDownNum, setCountDownNum] = useState(3);
	const [countdown, setCountDown] = useState(false);
	const [timerGame, setTimerGame] = useState("2:00");
	const [timerMin, setTimerMin] = useState(2);
	const [timerSec, setTimerSec] = useState(0);
	const [pauseDialog, setPauseDialog] = useState(false);
	//Constantes for Game

	const [gameSymbols, setGameSymbols] = useState([]);
	const [gameCombinations, setGameCombination] = useState([]);
	const [gameKeys, setGameKeys] = useState([]);

	const [help, setHelp] = useState("");
	const [accuracyStr, setAccuracyStr] = useState("100%");
	const [hitCounter, setHitCounter] = useState(0);
	const [timerNextSym, setTimerNextSym] = useState(10);
	const [nextSymTimerRunning, setNextSymTimerRunning] = useState(false);

	const [multipleKey, setMultipleKey] = useState(false);
	const [showSymbolToHit, setShowSymbolToHit] = useState(true);
	const [showTick, setShowTick] = useState(false);
	const [showCross, setShowCross] = useState(false);
	const [recordAccuracy, setRecordeAccuracy] = useState("");
	const [recordStreak, setRecordeStreak] = useState("");
	//for update Accuracy
	const [arrayTimesLetterAp, setArrayTimesLetterAp] = useState([]);
	const [arrayTimesLetterHit, setArrayTimesLetterHit] = useState([]);
	const [arrTimesWrong, setArrTimesWrong] = useState([]);

	const [readShiftKey, setReadShiftKey] = useState([false]);

	const [backSymbol, setBackSymbol] = useState("○ ⬤⬤⬤○");
	const [replaySmbol, setReplaySymbol] = useState("○ ⬤⬤⬤⬤");
	const [countineSymbol, setCountineSymbol] = useState("⬤ ⬤⬤⬤○");
	const [lastKey, setLastKey] = useState("a");

	const [currWord, setCurrWord] = useState("");
	const [numWordTapped, setNumWodTapped] = useState(0);
	const [wordAtMom, setWordAtMom] = useState("");
	const [wordToTap, setWordToTap] = useState(["", "", "", ""]);
	const [alreadyTapped, setAlreadyTapped] = useState(["", "", "", ""]);

	const [word, setWord] = useState([]);

	const [timerPerWOrd, setTimerPerWord] = useState(0.0);
	const [timerShowen, setTimerShowen] = useState("");

	const [countWrongKey, setCountWrongKey] = useState(0);
	const [wrongHitTotal, setWrongHitTotal] = useState(0);
	const [rightHitTotal, setRightHitsTotal] = useState(0);
	const [appearSymbolTotal, setAppearSymbolTotal] = useState(0);
	const [normalWord, setNormalWord] = useState(true);
	const [spaceWord, setSpaceWord] = useState(false);
	const [showSpaceTip, setShowSpaceTip] = useState(false);
	const [numberOfRounds, setNumberOfRound] = useState(1);
	const [roundsPlayed, setRoundsPlayed] = useState(0);
	const [startTimerNew, setStartTimerNew] = useState(false);
	const [showenKeys, setShowenKey] = useState([]);
	const [allPressedKeys, setALlPressedKeys] = useState([]);
	const [intervallCounter, setIntervallCounter] = useState(0);
	const [typingSPeedArr, setTypingSpeedArr] = useState([]);
	const [startTS, setStartTypingSpeed] = useState(0);
	const [currShiftKeys, setCurrShiftKeys] = useState([]);
	const [keyToHit, setKeyToHit] = useState("");

	const play = useKeyPress();

	const handleChange = (e) => {
		var numberRounds = parseInt(e.target.value);
		setNumberOfRound(numberRounds);
		sendUserTracking(
			value,
			"Select Num ROunds",
			"Rounds: " + numberRounds,
			"End-Dialog Code"
		);
	};

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
		}
	}

	function clickStart() {
		var random = Math.floor(Math.random() * word.length);

		setCurrWord(word[random]);

		splitWord(word[random]);

		setGameState("play");

		setGameState("play");
		setCountDown(false);
		setShowLetter(true);
		setShowSelection(false);
	}

	function finishGame() {
		setGameState("endDialog");

		var currAcc = parseInt(
			((rightHitTotal + 1) / (wrongHitTotal + (appearSymbolTotal + 1))) * 100
		);
		setAccuracyStr(currAcc + "%");

		var resArr = [];
		for (var i = 0; i < arrayTimesLetterAp.length; i++) {
			if (arrayTimesLetterAp[i] > 0) {
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

		var switchRes = [];

		for (var x = 0; x < singleTapSymbols.length; x++) {
			var currObj = resArr.shift();
			singleRes.push(currObj);
		}

		Axios.post(
			"http://localhost:3001/statisticSingleTapWReponse",

			{
				id: value,
				symbols: singleTapSymbols,
				statistic: singleRes,
				unitLevelID: "U0_L0",
				stars: 0,
			}
		).then((response) => {
			for (var w = 0; w < doubleTapSymbols.length; w++) {
				var currObjDT = resArr.shift();
				doubleRes.push(currObjDT);
			}

			Axios.post(
				"http://localhost:3001/statisticDoubleTap",

				{
					id: value,
					symbols: doubleTapSymbols,
					statistic: doubleRes,
					unitLevelID: "U0_L0",
					stars: 0,
				}
			).then((response) => {
				for (var z = 0; z < tripleTapSymbols.length; z++) {
					var currObjTT = resArr.shift();
					tripleRes.push(currObjTT);
				}

				Axios.post(
					"http://localhost:3001/statisticTripleTap",

					{
						id: value,
						symbols: tripleTapSymbols,
						statistic: tripleRes,
						unitLevelID: "U0_L0",
						stars: 0,
					}
				).then((response) => {
					for (var t = 0; t < switchSymbols.length; t++) {
						var currObjSW = resArr.shift();
						switchRes.push(currObjSW);
					}

					Axios.post(
						"http://localhost:3001/statisticSwitch",

						{
							id: value,
							symbols: switchSymbols,
							statistic: switchRes,
							unitLevelID: "U0_L0",
							stars: 0,
						}
					).then((response) => {
						var accuracySend = parseInt(
							((rightHitTotal + 1) /
								(wrongHitTotal + (appearSymbolTotal + 1))) *
								100
						);
						var score = hitCounter + 1;

						Axios.post(
							"http://localhost:3001/CodingResult",

							{
								id: value,
								accuracy: accuracySend,
								score: score,
							}
						).then((response) => {
							Axios.post(
								"http://localhost:3001/userTracking",

								{
									id: value,
									event: "games finished - score",
									eventName: accuracySend + " % , Score: " + score,
									location: "CodeGame",
								}
							).then((response) => {
								setDialog(true);

								sendUserTracking(
									value,
									'All Key Pressed "' + allPressedKeys + '"',
									'SHowen Words "' + showenKeys + '"',
									"CodeGame"
								);
								sendUserTracking(
									value,
									'Typing Speed "' + typingSPeedArr + '"',
									'SHowen Words "' + showenKeys + '"',
									"CodeGame"
								);
							});
						});
					});
				});
			});
		});
	}

	function replay() {
		window.location.href = "/Learn2Tap/Coding";
	}

	function splitWord(wordToSplit) {
		var currShowenKey = showenKeys;
		currShowenKey.push(wordToSplit);
		setShowenKey(currShowenKey);

		var currLines = wordToSplit.split("<br>");
		var currWordArry = ["", "", "", ""];

		for (var i = 0; i < currLines.length; i++) {
			if (currLines[i].label !== 0) {
				currWordArry[i] = currLines[i];
			}
		}

		setWordToTap(currWordArry);
		setWordAtMom(currWordArry[0]);

		var stillToTapT = currWordArry[0];

		var nextToTapS = stillToTapT[0];
		var indexNextSymb = gameSymbols.indexOf(nextToTapS);

		setKeyToHit(nextToTapS);
		if (indexNextSymb !== -1) {
			var lengthOfKeyS = gameKeys[indexNextSymb];

			if (lengthOfKeyS.length > 1) {
				setKeyToHit(lengthOfKeyS);
				nextShiftKeyCombi(lengthOfKeyS);
				setMultipleKey(true);
			}
		}
	}

	function nextSmybol() {
		setAppearSymbolTotal(appearSymbolTotal + 1);
		setRightHitsTotal(rightHitTotal + 1);

		var wordHere = wordToTap[numWordTapped];
		var currSym = wordHere[0];
		var newWordToTap = wordHere.slice(1);
		var testFin = wordToTap[0] + wordToTap[1] + wordToTap[2] + wordToTap[3];

		setHitCounter(hitCounter + 1);

		if (wordHere[1] === " " || wordHere[0] === " ") {
			setSpaceWord(true);
			setNormalWord(false);
			if (wordHere[1] === " ") {
				setShowSpaceTip(true);
			} else {
				setShowSpaceTip(false);
			}
		} else {
			setShowSpaceTip(false);
			setSpaceWord(false);
			setNormalWord(true);
		}
		var alreadyTappedMom = alreadyTapped[numWordTapped];

		var currAlreadyTapped = alreadyTappedMom + currSym;

		var currIndexHit = gameKeys.indexOf(currSym);

		var currArrHit = arrayTimesLetterHit;
		currArrHit[currIndexHit] = currArrHit[currIndexHit] + 1;
		var currAppear = arrayTimesLetterAp;
		currAppear[currIndexHit] = currAppear[currIndexHit] + 1;
		setArrayTimesLetterHit(currArrHit);
		setArrayTimesLetterAp(currAppear);
		var wordGetNotSplit = true;

		if (
			newWordToTap.length === 0 &&
			testFin.length === 1 &&
			numberOfRounds - 1 > roundsPlayed
		) {
			wordGetNotSplit = false;

			var random = Math.floor(Math.random() * word.length);
			setCurrWord(word[random]);
			splitWord(word[random]);
			setAlreadyTapped(["", "", "", ""]);
			setNumWodTapped(0);
			setRoundsPlayed(roundsPlayed + 1);
			setShowSymbolToHit(false);
			setShowTick(true);
			setNextSymTimerRunning(true);
			setStartTimerNew(true);
		} else if (
			numberOfRounds - 1 === roundsPlayed &&
			newWordToTap.length === 0 &&
			testFin.length === 1
		) {
			wordGetNotSplit = false;

			setShowLetter(false);
			finishGame();
		} else if (newWordToTap.length === 0) {
			setNumWodTapped(numWordTapped + 1);
			var arrayWordToTappeN = wordToTap;
			var arrayALreadyTappeN = alreadyTapped;

			arrayWordToTappeN[numWordTapped] = newWordToTap;
			setWordToTap(arrayWordToTappeN);

			arrayALreadyTappeN[numWordTapped] = "";

			setAlreadyTapped(arrayALreadyTappeN);
		} else {
			var arrayWordToTappe = wordToTap;
			var arrayALreadyTappe = alreadyTapped;

			arrayWordToTappe[numWordTapped] = newWordToTap;
			setWordToTap(arrayWordToTappe);

			arrayALreadyTappe[numWordTapped] = currAlreadyTapped;

			setAlreadyTapped(arrayALreadyTappe);
		}
		if (wordGetNotSplit) {
			var stillToTapN = wordToTap[numWordTapped];
			if (stillToTapN[0] == undefined) {
				stillToTapN = wordToTap[numWordTapped + 1];
			}
			var nextToTap = stillToTapN[0];
			var indexNextSym = gameSymbols.indexOf(nextToTap);
			setKeyToHit(nextToTap);
			if (indexNextSym !== -1) {
				var lengthOfKey = gameKeys[indexNextSym];
				if (lengthOfKey.length > 1) {
					setKeyToHit(lengthOfKey);
					nextShiftKeyCombi(lengthOfKey);
					setMultipleKey(true);
				}
			}
		}

		//Acurracy - Hit Counter
		var currAcc = parseInt(
			((rightHitTotal + 1) / (wrongHitTotal + (appearSymbolTotal + 1))) * 100
		);
		setAccuracyStr(currAcc + "%");

		var currTSarr = typingSPeedArr;
		var ts = (intervallCounter - startTS) / 10;
		currTSarr.push(ts);
		setTypingSpeedArr(currTSarr);
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

			var thisWord = wordToTap[numWordTapped];

			if (gameState === "play" && dialog === false && pauseDialog === false) {
				if (multipleKey) {
					createShiftObject(key);
				} else if (thisWord[0] === key && multipleKey === false) {
					setCountWrongKey(0);
					nextSmybol();
				} else {
					if (hitCounter > 0) {
						setHitCounter(hitCounter - 1);
					}
					setCountWrongKey(countWrongKey + 1);
					setWrongHitTotal(wrongHitTotal + 1);
					var currAcc = parseInt(
						(rightHitTotal / (wrongHitTotal + 1 + appearSymbolTotal)) * 100
					);
					setAccuracyStr(currAcc + "%");
					var curIndex = gameKeys.indexOf(thisWord[0]);
					if (countWrongKey > 2) {
						var combis = gameCombinations;
						var currHelp = combis[curIndex];

						setHelp(currHelp);
						if (thisWord[0] === " " && rightHand) {
							setHelp("⬤ ⬤⬤⬤⬤");
						} else if (thisWord[0] === " ") {
							setHelp("⬤⬤⬤⬤ ⬤");
						}
						setNextSymTimerRunning(true);
					}
					var currWrong = arrTimesWrong;
					currWrong[curIndex] = currWrong[curIndex] + 1;

					setArrTimesWrong(currWrong);
				}
			} else if (pauseDialog) {
				if (key === "r") {
					sendUserTracking(
						value,
						"key press: " + key,
						"Replay /Start New Game",
						"Pause-Dialog Code"
					);
					//replay game
					replay();
				} else if (key === "u") {
					//Back
					sendUserTracking(
						value,
						"key press: " + key,
						"End Pause",
						"Pause-Dialog Code"
					);
					setGameState("countdown");
					setPauseDialog(false);
					setCountDown(true);
				} else if (key === "Backspace") {
					sendUserTracking(
						value,
						"key press: " + key,
						"Back",
						"Pause-Dialog Code"
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
						"End-Dialog Code"
					);
					replay();

					//Back
				} else if (key === "Backspace") {
					sendUserTracking(
						value,
						"key press: " + key,
						"Back",
						"End-Dialog Code"
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
			if (showTick === false) {
				var nextTime = parseFloat(timerPerWOrd + 0.1);
				setTimerPerWord(nextTime);
				setTimerShowen(nextTime.toFixed(2));
			}

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

				Axios.get(`http://localhost:3001/getCodingsWords`).then((response) => {
					setWord(response.data[0]);
				});

				Axios.get(`http://localhost:3001/getCodingRecords/${value}`).then(
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
					setDoubleTapSymbols(response.data[2]);
					setDoubleTapCombination(response.data[3]);
					setDoubleTapKey(response.data[5]);
				});

				Axios.get(
					`http://localhost:3001/getSymbolArrayTripleTap/${[
						26, 27,
					]}/${currRight}/${0}`
				).then((response) => {
					setTripleTapSymbols(response.data[2]);
					setTripleTapCombination(response.data[3]);
					setTripleTapKey(response.data[5]);
				});

				Axios.get(
					`http://localhost:3001/getSymbolArraySwitch/${[
						27, 29,
					]}/${currRight}/${0}`
				).then((response) => {
					setSwitchSymbols(response.data[2]);
					setSwitchCombintion(response.data[3]);
					setSwitchKeys(response.data[5]);
					setInitialize(false);
				});
			}
			if (gameState === "" && initialize === false) {
				var currSymbols = [];
				var currCombination = [];
				var currKeys = [];

				currSymbols = currSymbols.concat(singleTapSymbols);
				currCombination = currCombination.concat(singleTabCombination);
				currKeys = currKeys.concat(singleTapSymbols);

				currSymbols = currSymbols.concat(doubleTapSymbols);
				currCombination = currCombination.concat(doubleTabCombination);
				currKeys = currKeys.concat(doubleTabKey);

				currSymbols = currSymbols.concat(tripleTapSymbols);
				currCombination = currCombination.concat(tripleTabCombination);
				currKeys = currKeys.concat(tripleTabKey);

				currSymbols = currSymbols.concat(switchSymbols);
				currCombination = currCombination.concat(switchCombination);
				currKeys = currKeys.concat(switchKeys);

				setGameCombination(currCombination);
				setGameSymbols(currSymbols);
				setGameKeys(currKeys);

				var lenghtA = currSymbols.length;
				var currTim = new Array(currSymbols.length).fill(0);

				setArrTimesWrong(new Array(currSymbols.length).fill(0));
				setArrayTimesLetterHit(new Array(lenghtA).fill(0));

				setArrayTimesLetterAp(currTim);
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
				setIntervallCounter(intervallCounter + 1);

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
					if (startTimerNew) {
						currMin = 2;
						currSec = 0;
						setTimerMin(2);

						setTimerSec(0);
						setStartTimerNew(false);
					}
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
						setShowSymbolToHit(true);
						setTimerNextSym(10);

						setNextSymTimerRunning(false);
					}
				}
				if (multipleKey) {
					if (readShiftKey.includes(false) === false) {
						nextSmybol();
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
									"Games Code Menu"
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
											"Games Code "
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

				<h2>Coding</h2>
				{showLetter && <div id="last">Last Tapped Combination: {lastKey}</div>}

				{showSelection && (
					<div className="modeSelection" id="modeSelectionDiv">
						<div id="rightCode">
							<div class="form-group" id="formCode">
								<label for="sel1">Number of rounds:</label>
								<br></br>
								<select class="form-control" id="sel1" onChange={handleChange}>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
							</div>
						</div>

						<button
							class="normalButton"
							id="startButtonGames"
							type="button"
							onClick={() => {
								sendUserTracking(value, "Button CLick", "Start", "Coding Game");

								clickStart();
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
						<div id="showLetterDivCoding">
							<div class="bar" id="codingGameScoreDiv">
								<div class="container">
									<div class="row">
										<div class="col">
											{accuracyStr}
											<br></br>
											Accuracy
										</div>
										<div class="col">{timerGame}</div>
									</div>
								</div>
							</div>
							<div class="showLetterTutoriel">
								<div id="prac" style={{ color: "black" }}>
									<div id="symbolDivCoding">
										<br></br>
										<br></br>
										{showSymbolToHit && (
											<div>
												{normalWord && (
													<div>
														<h3 className="word" style={{ color: "blue" }}>
															{" "}
															{alreadyTapped[0]}
														</h3>
														<h3 className="word">{wordToTap[0]}</h3>
														<br></br>{" "}
														<h3 className="word" style={{ color: "blue" }}>
															{" "}
															{alreadyTapped[1]}
														</h3>
														<h3 className="word">{wordToTap[1]}</h3>
														<br></br>{" "}
														<h3 className="word" style={{ color: "blue" }}>
															{" "}
															{alreadyTapped[2]}
														</h3>
														<h3 className="word">{wordToTap[2]}</h3>
														<br></br>{" "}
														<h3 className="word" style={{ color: "blue" }}>
															{" "}
															{alreadyTapped[3]}
														</h3>
														<h3 className="word">{wordToTap[3]}</h3>
													</div>
												)}

												{spaceWord && (
													<div>
														{" "}
														<h3 className="word" style={{ color: "blue" }}>
															{" "}
															{alreadyTapped[0]}
														</h3>{" "}
														&nbsp; <h3 className="word">{wordToTap[0]}</h3>
														<br></br>{" "}
														<h3 className="word" style={{ color: "blue" }}>
															{" "}
															{alreadyTapped[1]}
														</h3>{" "}
														&nbsp; <h3 className="word">{wordToTap[1]}</h3>
														<br></br>{" "}
														<h3 className="word" style={{ color: "blue" }}>
															{" "}
															{alreadyTapped[2]}
														</h3>{" "}
														&nbsp; <h3 className="word">{wordToTap[2]}</h3>
														<br></br>{" "}
														<h3 className="word" style={{ color: "blue" }}>
															{" "}
															{alreadyTapped[3]}
														</h3>{" "}
														&nbsp; <h3 className="word">{wordToTap[3]}</h3>
													</div>
												)}
												<br></br>
												<br></br>
												{showSpaceTip && (
													<div>
														{" "}
														<h6>Next Space</h6>
													</div>
												)}
												<br></br>
											</div>
										)}
										{showTick && (
											<p class="letterTutoriel" style={{ color: "green" }}>
												{" "}
												✓{" "}
											</p>
										)}
										{showCross && (
											<p class="letterTutoriel" style={{ color: "red" }}>
												✗
											</p>
										)}
									</div>
									<div id="accuracyDiv">
										<br></br>
										{help}

										<br></br>
										<h2>✧ {hitCounter} ✧</h2>
										<br></br>
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
												Recorde Score
											</div>
										</div>
									</div>
								</div>
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
										Recorde Score
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
										Round Score
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
										"Button CLick",
										"Replay",
										"End-Dialog Code"
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
										"Button CLick",
										"Back",
										"End-Dialog Code"
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
									setGameState("countdown");
									setPauseDialog(false);
									setCountDown(true);
									sendUserTracking(
										value,
										"Button CLick",
										"▷",
										"Pause-Dialog Code"
									);
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
										"Button CLick",
										"Replay",
										"Pause-Dialog Code"
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
										"Button CLick",
										"Exit",
										"Pause-Dialog Code"
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
