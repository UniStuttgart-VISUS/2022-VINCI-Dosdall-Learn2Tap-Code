import React, { useState, useEffect, useContext } from "react";
import CallBarchart from "../component/callBarchart";
import "./letterMenu.css";
import Axios from "axios";
import star from "../icons/star.svg";
import { clearCookie, sendUserTracking } from "../functions/functions";
import Cookies from "js-cookie";
import {
	idContext,
	combinationContext,
	symbolsContext,
	modusContext,
	unitNameContext,
} from "../../idContext";
import { symbol } from "d3";

export const MenuLearningUnit = (props) => {
	const { value, setValue } = useContext(idContext);
	const { symbolArr, setSymbolArr } = useContext(symbolsContext);
	const { combinationArray, setCombinationArray } =
		useContext(combinationContext);
	const { modus, setModus } = useContext(modusContext);
	const { unitName, setUnitName } = useContext(unitNameContext);
	const [score, setScore] = useState([]);
	const [showDiagram, setShowDiagram] = useState(false);
	const [count, setCount] = useState(0);
	const [starsLevelOne, setStarsLevelOne] = useState(0);
	const [starsLevelTwo, setStarsLevelTwo] = useState(0);
	const [unitNum, setUnitNum] = useState(-1);
	const [currTypingMode, setCurrTypingMode] = useState("");
	const [typingMode, setTypingMode] = useState("");
	const [menuPath, setMenuPath] = useState("/");
	const [alternativeXAxis, setAlternativeXAxis] = useState([]);
	const [showAlternative, setShowAlternative] = useState(false);

	var colArr = ["lime", "fuchsia", "aqua", "yellow", "orange"];

	useEffect(() => {
		const timer = setInterval(() => {
			if (count === 0) {
				var currTypingMode = Cookies.get("typingMode");
				setTypingMode(currTypingMode);

				setModus(Cookies.get("modusCookie"));
				setUnitName(Cookies.get("unitCookie"));

				var currUnitID = Cookies.get("unitID");
				var unitID = "U" + currUnitID;
				setUnitNum(currUnitID);

				var currSymbolID = clearCookie(Cookies.get("symbolID"));
				setSymbolArr(clearCookie(Cookies.get("symbolArrCookie")));

				var symbolIdsCurr = clearCookie(Cookies.get("symbolArrCookie"));

				var initializeALternative = false;
				var lable = ["a.)", "b.)", "c.)", "d.)", "e.)"];
				var currLables = [];
				var becomeXAxis = [];
				var lableCounter = 0;
				for (var i = 0; i < symbolIdsCurr.length; i++) {
					if (symbolIdsCurr[i].length > 5) {
						setShowAlternative(true);

						currLables.push(lable[lableCounter]);

						becomeXAxis.push(lable[lableCounter] + " " + symbolIdsCurr[i]);
						lableCounter = lableCounter + 1;
					} else {
						currLables.push(symbolIdsCurr[i]);
					}
				}

				setSymbolArr(currLables);

				setAlternativeXAxis(becomeXAxis);

				var symbolIds = currSymbolID;
				if (currTypingMode == "singleTap") {
					setMenuPath("SingleTapMenu");
					setCurrTypingMode("Single Tap");
					var symbols = symbolIdsCurr;

					Axios.get(
						`http://localhost:3001/getSingleTapStatistic/${value}/${symbols}`
					).then((response) => {
						var statArr = response.data[0];

						setScore(statArr);

						Axios.get(
							`http://localhost:3001/getSingleTapStarsUnit/${value}/${unitID}`
						).then((response) => {
							var starsTotal = response.data[0];
							setStarsLevelOne(starsTotal[0]);
							setStarsLevelTwo(starsTotal[1]);
						});
					});
				} else if (currTypingMode == "doubleTap") {
					setCurrTypingMode("Double Tap");
					setMenuPath("DoubleTapMenu");

					Axios.get(
						`http://localhost:3001/getDoubleTapStatistic/${value}/${symbolIds}`
					).then((response) => {
						setScore(response.data[0]);
					});
					Axios.get(
						`http://localhost:3001/getDoubleTapStarsUnit/${value}/${unitID}`
					).then((response) => {
						var starsTotal = response.data[0];
						setStarsLevelOne(starsTotal[0]);
						setStarsLevelTwo(starsTotal[1]);
					});
				} else if (currTypingMode == "tripleTap") {
					setMenuPath("TripleTapMenu");
					setCurrTypingMode("Triple Tap");

					Axios.get(
						`http://localhost:3001/getTripleTapStatistic/${value}/${symbolIds}`
					).then((response) => {
						setScore(response.data[0]);
					});
					Axios.get(
						`http://localhost:3001/getTripleTapStarsUnit/${value}/${unitID}`
					).then((response) => {
						var starsTotal = response.data[0];
						setStarsLevelOne(starsTotal[0]);
						setStarsLevelTwo(starsTotal[1]);
					});
				} else if (currTypingMode == "switch") {
					setCurrTypingMode("Switch");
					setMenuPath("SwitchMenu");

					Axios.get(
						`http://localhost:3001/getSwitchStatistic/${value}/${symbolIds}`
					).then((response) => {
						setScore(response.data[0]);
					});
					Axios.get(
						`http://localhost:3001/getSwitchStarsUnit/${value}/${unitID}`
					).then((response) => {
						var starsTotal = response.data[0];
						setStarsLevelOne(starsTotal[0]);
						setStarsLevelTwo(starsTotal[1]);
					});
				} else if (currTypingMode == "shift") {
					setCurrTypingMode("Shift");
					setMenuPath("ShiftMenu");
					Axios.get(
						`http://localhost:3001/getShiftStatistic/${value}/${symbolIds}`
					).then((response) => {
						setScore(response.data[0]);
					});
					Axios.get(
						`http://localhost:3001/getShiftStarsUnit/${value}/${unitID}`
					).then((response) => {
						var starsTotal = response.data[0];
						setStarsLevelOne(starsTotal[0]);
						setStarsLevelTwo(starsTotal[1]);
					});
				}
			}
			setCount(count + 1);
			if (count >= 1) {
				setShowDiagram(true);
			}
		}, 100);

		if (count >= 3) {
			clearInterval(timer);
		}
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
									"menu Learning Units"
								);
								window.location.href = "/Learn2Tap/" + menuPath;
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
						<button
							class="normalButton"
							type="button"
							id="glossaryButtonSingleTapMenu"
							onClick={() => {
								sendUserTracking(
									value,
									"Button click",
									"Glossary Button",
									"menu Learning Units"
								);
								Cookies.set("lastPage", "/MenuPracticeUnit");
								window.location.href = "/Learn2Tap/Glossary";
							}}
						>
							Glossary
						</button>
					</div>
				</div>
				<h2>
					"{unitName}" - Unit {unitNum}
				</h2>
				<h4>
					{modus} - {currTypingMode}
				</h4>
				<div class="mainDiv">
					{showDiagram && (
						<div class="statisticLetterMenu">
							<CallBarchart
								data={score}
								svgWidth={250}
								svgHeight={180}
								barPadding={10}
								lableX={symbolArr}
								color={colArr}
								yLength={115}
							></CallBarchart>
						</div>
					)}
					{showAlternative && (
						<div>
							{alternativeXAxis[0]} {alternativeXAxis[1]} {alternativeXAxis[2]}{" "}
							{alternativeXAxis[3]} {alternativeXAxis[4]}
						</div>
					)}

					<button
						class="normalButton"
						type="button"
						id="tutorielButton"
						onClick={() => {
							sendUserTracking(
								value,
								"button click",
								"Tutoriel Button",
								"menu Learning Units"
							);
							window.location.href = "/Learn2Tap/Tutoriel";
						}}
					>
						Tutoriel
					</button>

					<button
						class="normalButton"
						type="button"
						id="practiceButtonMLU"
						onClick={() => {
							sendUserTracking(
								value,
								"button click",
								"Practice Button",
								"menu Learning Units"
							);
							window.location.href = "/Learn2Tap/Practice";
						}}
					>
						Practice
					</button>

					<button
						class="normalButton"
						type="button"
						id="levelButton"
						onClick={() => {
							sendUserTracking(
								value,
								"button click",
								"Level 1 Button",
								"menu Learning Units"
							);
							Cookies.set("level", 1);
							Cookies.set("levelExist", 2);
							window.location.href = "/Learn2Tap/Level";
						}}
					>
						{" "}
						<div class="row">
							<div class="col">Level 1</div>
							<div class="row">
								{starsLevelOne}/3
								<img src={star} width="60px" height="100px" alt="star" />
							</div>
						</div>
					</button>

					<button
						class="normalButton"
						type="button"
						id="levelButton"
						onClick={() => {
							sendUserTracking(
								value,
								"button click",
								"Level 2 Button",
								"menu Learning Units"
							);
							Cookies.set("level", 2);
							Cookies.set("levelExist", 2);
							window.location.href = "/Learn2Tap/Level";
						}}
					>
						<div class="row">
							<div class="col">Level 2</div>
							<div class="row">
								{starsLevelTwo}/3
								<img src={star} width="60px" height="100px" alt="star" />
							</div>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};
