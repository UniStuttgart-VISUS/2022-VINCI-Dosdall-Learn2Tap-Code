import React, { useState, useEffect, useContext } from "react";
import "./statistics.stylsheet.css";
import CallBarchart from "../component/callBarchart";
import { idContext } from "../../idContext";
import Axios from "axios";
import { sendUserTracking } from "../functions/functions";

export const Statistics = (props) => {
	const { value, setValue } = useContext(idContext);
	//stores Statistic for different selection Options
	const [singleTap, setSingleTap] = useState([]);
	const [singleTapSymbols, setSingleTapSymbols] = useState([]);
	const [doubleTap, setDoubleTap] = useState([]);
	const [doubleTapSymbols, setDoubleTapSymbols] = useState([]);
	const [tripleTap, setTripleTap] = useState([]);
	const [tripleTapSymbols, setTripleTapSymbols] = useState([]);
	const [switchTap, setSwitchTap] = useState([]);
	const [switchTapSymbols, setSwitchTapSymbols] = useState([]);
	const [shiftTap, setShiftTap] = useState([]);
	const [shiftTapSymbols, setShiftTapSymbols] = useState([]);

	const [timeToTap, setTimeToTap] = useState([]);
	const [fiveTimes, setFiveTimes] = useState([]);
	const [xAxisTimeToTap, setXAxisTimeToTap] = useState(["recorde"]);

	const [streakChallenge, setStreakChalleng] = useState([]);
	const [repeatFive, setRepeatFive] = useState([]);
	const [tappingRace, setTappingRace] = useState([]);
	const [coding, setCoding] = useState([]);

	const [showStatistic, setShowStatistic] = useState(false);
	const [initialize, setInitialize] = useState(true);
	const [showLable, setShowLabel] = useState(false);

	const [currStatistic, setCurrStatistic] = useState([
		10, 20, 100, 77, 50, 90.6, 40,
	]);
	const [currLable, setCurrLable] = useState([
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
	]);
	const [yAxisLength, setYAxisLength] = useState(115);
	const [barChartWidth, setBarChartWidth] = useState();
	const [alternativeXAxis, setAlternativeXAxis] = useState([
		"a.)",
		"b.)",
		"c.)",
		"d.)",
		"e.)",
		"f.)",
		"g.)",
		"h.)",
		"i.)",
		"j.)",
		"k.)",
		"l.)",
		"m.)",
		"o.)",
		"p.)",
		"q.)",
		"r.)",
		"s.)",
		"t.)",
		"u.)",
		"v.)",
		"w.)",
		"x.)",
	]);
	const [showAlternativeSingle, setShowAlternativeSingle] = useState(false);
	const [showAlternativeShift, setShowAlternativeShift] = useState(false);
	const [showAlternativeSwitch, setShowAlternativeSwitch] = useState(false);

	const [xSingle, setXSingle] = useState([]);
	const [xShift, setXShift] = useState([]);
	const [xSwitch, setXSwitch] = useState([]);

	const handleChange = (e) => {
		var selected = e.target.value;

		setShowAlternativeSingle(false);
		setShowAlternativeShift(false);

		if (selected === "Single Tap") {
			sendUserTracking(value, "selection", "single tap", "statistics");
			setYAxisLength(115);
			setShowStatistic(false);
			setShowAlternativeSingle(true);
			setCurrStatistic(singleTap);
			setCurrLable(singleTapSymbols);
		} else if (selected === "Double Tap") {
			sendUserTracking(value, "selection", "double tap", "statistics");
			setYAxisLength(115);
			setShowStatistic(false);
			setCurrStatistic(doubleTap);
			setCurrLable(doubleTapSymbols);
		} else if (selected === "Triple Tap") {
			sendUserTracking(value, "selection", "triple tap", "statistics");
			setYAxisLength(115);
			setShowStatistic(false);
			setCurrStatistic(tripleTap);
			setCurrLable(tripleTapSymbols);
		} else if (selected === "Shift") {
			sendUserTracking(value, "selection", "shift", "statistics");
			setShowAlternativeShift(true);
			setYAxisLength(115);
			setShowStatistic(false);
			setCurrStatistic(shiftTap);
			setCurrLable(shiftTapSymbols);
		} else if (selected === "Switch") {
			sendUserTracking(value, "selection", "switch", "statistics");
			setShowAlternativeSwitch(true);
			setYAxisLength(115);
			setShowStatistic(false);
			setCurrStatistic(switchTap);
			setCurrLable(switchTapSymbols);
		} else if (selected === "Time To Tap") {
			sendUserTracking(value, "selection", "Time to Tap", "statistics");
			setShowStatistic(false);
			setYAxisLength(165);
			setShowLabel(true);
			setCurrStatistic(timeToTap);
			setCurrLable(xAxisTimeToTap);
		} else if (selected === "Tap it 5-times") {
			sendUserTracking(value, "selection", "Tap it 5-Times", "statistics");
			setYAxisLength(215);
			setShowStatistic(false);
			setShowLabel(true);
			setCurrStatistic(fiveTimes);
			setCurrLable(xAxisTimeToTap);
		} else if (selected === "Coding") {
			sendUserTracking(value, "selection", "Coding", "statistics");
			setYAxisLength(215);
			setShowStatistic(false);
			setShowLabel(true);
			setCurrStatistic(coding);
			setCurrLable(xAxisTimeToTap);
		}
	};

	function createLables(currLables) {
		var lablesToChange = currLables;
		var newLables = [];
		var currUndertitle = [];
		var letters = alternativeXAxis;
		var alternativeLablesCounter = 0;

		for (var i = 0; i < lablesToChange.length; i++) {
			if (lablesToChange[i].length > 4) {
				newLables.push(letters[alternativeLablesCounter]);
				currUndertitle.push(
					letters[alternativeLablesCounter] + " " + lablesToChange[i]
				);

				alternativeLablesCounter = alternativeLablesCounter + 1;
			} else {
				newLables.push(lablesToChange[i]);
			}
		}

		return [newLables, currUndertitle];
	}

	useEffect(() => {
		const timer = setInterval(() => {
			if (initialize) {
				if (window.screen.availWidth - 40 > 900) {
					setBarChartWidth(window.screen.availWidth - 20);
				} else {
					setBarChartWidth(900);
				}

				Axios.get(`http://localhost:3001/getAllStatisticSingle/${value}`).then(
					(response) => {
						setSingleTap(response.data[0]);
						setCurrStatistic(response.data[0]);
						var resultLableST = createLables(response.data[1]);
						setSingleTapSymbols(resultLableST[0]);
						setXSingle(resultLableST[1]);
						setCurrLable(resultLableST[0]);
						setShowAlternativeSingle(true);
						setInitialize(false);
					}
				);

				Axios.get(`http://localhost:3001/getAllStatisticDouble/${value}`).then(
					(response) => {
						setDoubleTap(response.data[0]);
						setDoubleTapSymbols(response.data[1]);
					}
				);

				Axios.get(`http://localhost:3001/getAllStatisticTriple/${value}`).then(
					(response) => {
						setTripleTap(response.data[0]);
						setTripleTapSymbols(response.data[1]);
					}
				);

				Axios.get(`http://localhost:3001/getAllStatisticShift/${value}`).then(
					(response) => {
						var resultLableShift = createLables(response.data[1]);
						setXShift(resultLableShift[1]);
						setShiftTap(response.data[0]);
						setShiftTapSymbols(resultLableShift[0]);
					}
				);

				Axios.get(`http://localhost:3001/getAllStatisticSwitch/${value}`).then(
					(response) => {
						var resultLableSwitch = createLables(response.data[1]);
						setSwitchTap(response.data[0]);
						setSwitchTapSymbols(resultLableSwitch[0]);
						setXSwitch(resultLableSwitch[1]);
					}
				);

				Axios.get(
					`http://localhost:3001/getAllStatisticTimeToTap/${value}`
				).then((response) => {
					setTimeToTap(response.data[0]);
					var xAxisTTT = xAxisTimeToTap;
					for (var i = 1; i <= 20; i++) {
						xAxisTTT.push(i);
					}
					setXAxisTimeToTap(xAxisTTT);
				});

				Axios.get(
					`http://localhost:3001/getAllStatisticFiveTimes/${value}`
				).then((response) => {
					setFiveTimes(response.data[0]);
				});
				Axios.get(`http://localhost:3001/getAllStatisticCoding/${value}`).then(
					(response) => {
						setCoding(response.data[0]);
					}
				);
			} else {
				setShowStatistic(true);
			}
		}, 100);
		// clearing interval
		return () => clearInterval(timer);
	});

	return (
		<div id="returnMenuDivStat">
			<div>
				<button
					class="normalButton"
					type="button"
					id="menuButtonSingleTap"
					onClick={() => {
						window.location.href = "/Learn2Tap";
					}}
				>
					Menu
				</button>
				<h2>Statistics</h2>
				<br></br>
				<div id="container">
					<div id="rightStat">
						<br></br>
						<div class="form-group">
							<select
								class="form-control"
								id="sel1Stat"
								onChange={handleChange}
							>
								<option>Single Tap</option>
								<option>Double Tap</option>
								<option>Triple Tap</option>
								<option>Shift</option>
								<option>Switch</option>
								<option>Time To Tap</option>
								<option>Tap it 5-times </option>
								<option>Coding</option>
							</select>
						</div>
					</div>
				</div>
				{showStatistic && (
					<div className="showStatistic">
						<CallBarchart
							data={currStatistic}
							svgWidth={barChartWidth}
							svgHeight={280}
							barPadding={10}
							lableX={currLable}
							color={"blue"}
							yLength={yAxisLength}
						></CallBarchart>

						<br></br>
						{showLable && (
							<div>
								Games sorted by actuality (1 = newest game, 20 = oldest game)
							</div>
						)}
						{showAlternativeSingle && (
							<div>
								{" "}
								{xSingle[0]} {xSingle[1]}{" "}
							</div>
						)}
						{showAlternativeShift && (
							<div>
								{xShift[0]} {xShift[1]} {xShift[2]} {xShift[3]} {xShift[4]}{" "}
								<br></br> {xShift[5]} {xShift[6]} {xShift[7]} {xShift[8]}{" "}
								<br></br>
								{xShift[9]} {xShift[10]} {xShift[11]} {xShift[12]} <br></br>
								{xShift[13]} {xShift[14]} {xShift[15]} {xShift[16]}
								<br></br> {xShift[17]} {xShift[18]} {xShift[19]} {xShift[20]}{" "}
								<br></br> {xShift[21]} {xShift[22]} {xShift[23]}{" "}
							</div>
						)}
						{showAlternativeSwitch && (
							<div>
								{xSwitch[0]} {xSwitch[1]} {xSwitch[2]} {xSwitch[3]} {xSwitch[4]}{" "}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
