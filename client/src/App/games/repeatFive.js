import React, { useEffect, useState, useContext } from "react";
import "./gamesMenu.css";
import {
	addStatisticToDatabase,
	sendUserTracking,
} from "../functions/functions";
import Axios from "axios";
import Cookies from "js-cookie";
import { idContext } from "../../idContext";

export const RepeatFive = (props) => {
	const { value, setValue } = useContext(idContext);
	const [keyToHit, setKeyToHit] = useState("");
	const [dialog, setDialog] = useState(false);
	const [showLetter, setShowLetter] = useState(false);
	const [showLetterColor, setShowLetterColor] = useState(false);
	const [initialize, setInitialize] = useState(true);
	const [rightHand, setRightHand] = useState(true);

	const [singleTapSymbols, setSingleTapSymbols] = useState([]);
	const [singleTabCombination, setSingleTapCombination] = useState([]);
	const [doubleTapSymbols, setDoubleTapSymbols] = useState([]);
	const [doubleTabCombination, setDoubleTapCombination] = useState([]);
	const [doubleTapKeys, setDoubleTapKeys] = useState([]);
	const [tripleTapSymbols, setTripleTapSymbols] = useState([]);
	const [tripleTabCombination, setTripleTapCombination] = useState([]);
	const [tripleTapKeys, setTripleTapKeys] = useState([]);
	const [showenKeys, setShowenKey] = useState([]);
	const [allPressedKeys, setALlPressedKeys] = useState([]);

	const [shiftCombination, setShiftCombintion] = useState([]);
	const [shitKeys, setShiftKeys] = useState([]);

	const [switchSymbols, setSwitchSymbols] = useState([]);
	const [switchCombination, setSwitchCombintion] = useState([]);
	const [switchKeys, setSwitchKeys] = useState([]);
	const [gameState, setGameState] = useState("");
	const [intervallCountdownCounter, setIntervallCountdownCounter] = useState(0);
	const [countDownNum, setCountDownNum] = useState(3);
	const [countdown, setCountDown] = useState(true);
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
	const [lastKey, setLastKey] = useState("");

	//----------------Tap it 5-Times-------------------------------------------------
	const [currFiveWord, setCurrFiveWord] = useState("");
	const [wordToTap, setWordToTap] = useState("? allo");
	const [alreadyTapped, setAlreadyTapped] = useState("");
	const [word, setWord] = useState([
		"h a l l o",
		"kakobuttter",
		"ikarus",
		"berghain",
	]);
	const [counterWordTapped, setCounterWordTapped] = useState(0);
	const [numDifferentWordsTapped, setNumDifferentWordsTapped] = useState(0);
	const [timerPerWOrd, setTimerPerWord] = useState(0.0);
	const [timerShowen, setTimerShowen] = useState("");
	const [showTimerPerWord, setShowTimerPerWord] = useState([
		false,
		false,
		false,
		false,
		false,
	]);
	const [arrTimePerWord, setArrTimePerword] = useState([
		"",
		"",
		"",
		"",
		"",
		"",
	]);
	const [countWrongKey, setCountWrongKey] = useState(0);
	const [wrongHitTotal, setWrongHitTotal] = useState(0);
	const [rightHitTotal, setRightHitsTotal] = useState(0);
	const [appearSymbolTotal, setAppearSymbolTotal] = useState(0);
	const [normalWord, setNormalWord] = useState(true);
	const [spaceWord, setSpaceWord] = useState(false);
	const [neededTime, setNeedetTime] = useState([]);
	const play = useKeyPress();
	const [intervallCounter, setIntervallCounter] = useState(0);
	const [typingSPeedArr, setTypingSpeedArr] = useState([]);
	const [startTS, setStartTypingSpeed] = useState(0);
	const [currShiftKeys, setCurrShiftKeys] = useState([]);
	const [startTheGame, setStartTheGame] = useState(false);

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
		}
	}

	function clickStart() {
		var random = Math.floor(Math.random() * word.length);
		setWordToTap(word[random]);

		var curShowenKEys = showenKeys;

		curShowenKEys.push(word[random]);

		setShowenKey(curShowenKEys);
		setCurrFiveWord(word[random]);

		setGameState("countdown");
		setCountDown(true);
	}

	function finishGame() {
		setGameState("endDialog");

		var currAcc = parseInt(
			((rightHitTotal + 1) / (wrongHitTotal + (appearSymbolTotal + 1))) * 100
		);
		setAccuracyStr(currAcc + "%");

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
						var score = hitCounter;
						sendUserTracking(
							value,
							"Score Round",
							accuracySend + "% : " + score,
							" TI5T "
						);
						Axios.post(
							"http://localhost:3001/FiveTimesResult",

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
									location: "TI5T",
								}
							).then((response) => {
								Axios.post(
									"http://localhost:3001/userTracking",

									{
										id: value,
										event: "games finished - Time",
										eventName: '"' + neededTime + '"',
										location: "TI5T",
									}
								).then((response) => {
									sendUserTracking(
										value,
										'All Key Pressed "' + allPressedKeys + '"',
										'SHowen Words "' + showenKeys + '"',
										" TI5T "
									);
									sendUserTracking(
										value,
										'Typing Speed "' + typingSPeedArr + '"',
										'SHowen Words "' + showenKeys + '"',
										" TI5T "
									);

									setDialog(true);
								});
							});
						});
					});
				});
			});
		});
	}

	function replay() {
		window.location.href = "/Learn2Tap/TapIt5-Times";
	}

	function nextSmybol() {
		setAppearSymbolTotal(appearSymbolTotal + 1);
		setRightHitsTotal(rightHitTotal + 1);

		var currSym = wordToTap[0];
		var newWordToTap = wordToTap.slice(1);

		if (wordToTap[1] === " " || wordToTap[0] === " ") {
			setSpaceWord(true);
			setNormalWord(false);
		} else {
			setSpaceWord(false);
			setNormalWord(true);
		}
		var currAlreadyTapped = alreadyTapped + currSym;
		var currIndexAppear = 0;
		var currIndexHit = gameKeys.indexOf(currSym);

		var currArrHit = arrayTimesLetterHit;
		currArrHit[currIndexHit] = currArrHit[currIndexHit] + 1;
		setArrayTimesLetterHit(currArrHit);
		var wordCurr = "";

		if (newWordToTap.length === 0) {
			setHitCounter(hitCounter + currAlreadyTapped.length);

			var timerArr = arrTimePerWord;
			timerArr[counterWordTapped] = timerShowen;
			var timeShowCurr = showTimerPerWord;
			setArrTimePerword(timerArr);
			timeShowCurr[counterWordTapped] = true;

			var currNeededTime = neededTime;
			currNeededTime.push(timerShowen);
			setNeedetTime(currNeededTime);

			setShowTimerPerWord(timeShowCurr);
			setCounterWordTapped(counterWordTapped + 1);

			if (counterWordTapped === 3) {
				setNumDifferentWordsTapped(numDifferentWordsTapped + 1);
			}

			if (counterWordTapped === 4) {
				var random = Math.floor(Math.random() * word.length);
				setWordToTap(word[random]);

				setCurrFiveWord(word[random]);
				wordCurr = word[random];

				var curShowenKEys = showenKeys;
				curShowenKEys.push(wordCurr);

				setShowenKey(curShowenKEys);
				setTimerPerWord(["", "", "", "", ""]);
				setCounterWordTapped(0);
				setShowTimerPerWord([false, false, false, false, false]);
			}
			setTimerPerWord(0.0);
			setShowTick(true);
			setNextSymTimerRunning(true);
			if (wordCurr === "") {
				setWordToTap(currFiveWord);
				currIndexAppear = gameSymbols.indexOf(currFiveWord[0]);
			} else {
				currIndexAppear = gameSymbols.indexOf(wordCurr[0]);
			}

			setAlreadyTapped("");
			setShowSymbolToHit(false);
			currIndexAppear = gameSymbols.indexOf(currFiveWord[0]);
			var currArrAppearN = arrayTimesLetterAp;
			currArrAppearN[currIndexAppear] = currArrAppearN[currIndexAppear] + 1;
			setArrayTimesLetterAp(currArrAppearN);
		} else {
			currIndexAppear = gameSymbols.indexOf(newWordToTap[0]);

			var currArrAppear = arrayTimesLetterAp;
			currArrAppear[currIndexAppear] = currArrAppear[currIndexAppear] + 1;
			setArrayTimesLetterAp(currArrAppear);

			setAlreadyTapped(currAlreadyTapped);
			setWordToTap(newWordToTap);
		}

		//---------------------------Multiple Keys----------------------------

		setKeyToHit(gameSymbols[currIndexAppear]);

		if (currIndexAppear !== -1) {
			var lengthOfKey = gameKeys[currIndexAppear];

			if (lengthOfKey.length > 1) {
				setKeyToHit(lengthOfKey);
				nextShiftKeyCombi(lengthOfKey);
				setMultipleKey(true);
			}
		}

		//---------------------------------------------------------

		var currAcc = parseInt(
			((rightHitTotal + 1) / (wrongHitTotal + (appearSymbolTotal + 1))) * 100
		);
		setAccuracyStr(currAcc + "%");
		var symbolsAppeared = appearSymbolTotal + 1;

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

			if (gameState === "play" && dialog === false && pauseDialog === false) {
				if (multipleKey) {
					createShiftObject(key);
				} else if (wordToTap[0] === key && multipleKey === false) {
					nextSmybol();
					setCountWrongKey(0);
				} else {
					setCountWrongKey(countWrongKey + 1);
					setWrongHitTotal(wrongHitTotal + 1);
					var currAcc = parseInt(
						(rightHitTotal / (wrongHitTotal + 1 + appearSymbolTotal)) * 100
					);
					setAccuracyStr(currAcc + "%");
					var curIndex = gameKeys.indexOf(wordToTap[0]);
					if (countWrongKey === 2) {
						var combis = gameCombinations;
						var currHelp = combis[curIndex];

						setHelp(currHelp);
						if (wordToTap[0] === " " && rightHand) {
							setHelp("⬤ ⬤⬤⬤⬤");
						} else if (wordToTap[0] === " ") {
							setHelp("⬤⬤⬤⬤ ⬤");
						}
						setNextSymTimerRunning(true);

						setCountWrongKey(0);
					}
					var currWrong = arrTimesWrong;
					currWrong[curIndex] = currWrong[curIndex] + 1;
					setArrTimesWrong(currWrong);
				}
			} else if (pauseDialog && gameState !== "play") {
				if (key === "r") {
					sendUserTracking(
						value,
						"key press: " + key,
						"Replay",
						"Pause-Dialog TI5T "
					);
					//replay game
					replay();
				} else if (key === "u") {
					//Back
					sendUserTracking(
						value,
						"key press: " + key,
						"End Pause",
						"Pause-Dialog TI5T "
					);
					setGameState("countdown");
					setPauseDialog(false);
					setCountDown(true);
				} else if (key === "Backspace") {
					sendUserTracking(
						value,
						"key press: " + key,
						"Back",
						"Pause-Dialog TI5T "
					);
					window.location.href = "/Learn2Tap/GamesMenu";
				}
			} else if (dialog && gameState !== "play") {
				//replay
				if (key === "r") {
					sendUserTracking(
						value,
						"key press: " + key,
						"Replay",
						"End-Dialog TI5T "
					);
					replay();

					//Back
				} else if (key === "Backspace") {
					sendUserTracking(
						value,
						"key press: " + key,
						"Back",
						"End-Dialog TI5T "
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
			if (showTick === false && gameState === "play") {
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

				Axios.get(`http://localhost:3001/getFiveTimesWords`).then(
					(response) => {
						setWord(response.data[0]);
					}
				);

				Axios.get(`http://localhost:3001/getFiveTimeRecords/${value}`).then(
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
					setDoubleTapKeys(response.data[5]);
				});

				Axios.get(
					`http://localhost:3001/getSymbolArrayTripleTap/${[
						26, 27,
					]}/${currRight}/${0}`
				).then((response) => {
					setTripleTapSymbols(response.data[2]);
					setTripleTapCombination(response.data[3]);
					setTripleTapKeys(response.data[5]);
				});

				Axios.get(
					`http://localhost:3001/getSymbolArraySwitch/${[
						27, 29,
					]}/${currRight}/${0}`
				).then((response) => {
					setSwitchSymbols(response.data[2]);
					setShiftCombintion(response.data[3]);
					setSwitchKeys(response.data[5]);

					setInitialize(false);
				});
			}
			if (startTheGame) {
				clickStart();
				setStartTheGame(false);
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
				currKeys = currKeys.concat(doubleTapKeys);

				currSymbols = currSymbols.concat(tripleTapSymbols);
				currCombination = currCombination.concat(tripleTabCombination);
				currKeys = currKeys.concat(tripleTapKeys);

				currSymbols = currSymbols.concat(switchSymbols);
				currCombination = currCombination.concat(switchSymbols);
				currKeys = currKeys.concat(switchKeys);

				setGameCombination(currCombination);
				setGameSymbols(currSymbols);
				setGameKeys(currKeys);
				var lenghtA = currSymbols.length;
				var currTim = new Array(currSymbols.length).fill(0);
				setArrTimesWrong(new Array(currSymbols.length).fill(0));
				setArrayTimesLetterHit(new Array(lenghtA).fill(0));
				setArrayTimesLetterAp(currTim);
				setStartTheGame(true);
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
									"Games TI5T Menu"
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
											"Games TI5T "
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

				<h2>Tap It 5-Times</h2>

				{showLetter && <div id="last">Last Tapped Combination: {lastKey}</div>}

				<div class="mainDiv">
					{countdown && (
						<div>
							<p class="countdown">{countDownNum}</p>
						</div>
					)}

					{showLetter && (
						<div>
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
										{showSymbolToHit && (
											<div>
												{normalWord && (
													<div>
														<h3 className="word" style={{ color: "blue" }}>
															{" "}
															{alreadyTapped}
														</h3>
														<h3 className="word">{wordToTap}</h3>
													</div>
												)}

												{spaceWord && (
													<div>
														{" "}
														<h3 className="word" style={{ color: "blue" }}>
															{" "}
															{alreadyTapped}
														</h3>{" "}
														&nbsp; <h3 className="word">{wordToTap}</h3>{" "}
													</div>
												)}
												<br></br>
												<br></br>
												{showTimerPerWord[0] && (
													<div>1. {arrTimePerWord[0]}</div>
												)}
												{showTimerPerWord[1] && (
													<div>2. {arrTimePerWord[1]}</div>
												)}
												{showTimerPerWord[2] && (
													<div>3. {arrTimePerWord[2]} </div>
												)}
												{showTimerPerWord[3] && (
													<div>4. {arrTimePerWord[3]} </div>
												)}
												{showTimerPerWord[4] && (
													<div>5. {arrTimePerWord[4]} </div>
												)}
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
										<br></br>
										{help}
									</div>
									<div id="accuracyDiv">
										<h2>✧ {hitCounter} ✧</h2>
										<br></br>
										{timerShowen}
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
												Recorde Points
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
										"End-Dialog TI5T "
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
										"End-Dialog TI5T "
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
										"Start Button",
										"Paus-Dialog TI5T "
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
										"Replay Button",
										"Paus-Dialog TI5T "
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
										"Back Button",
										"Paus-Dialog TI5T "
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
