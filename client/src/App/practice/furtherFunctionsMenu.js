import React, { useEffect, useState, useContext } from "react";
import CallStar from "../component/callStar";
import "./letterMenu.css";
import { sendUserTracking } from "../functions/functions";
import { idContext } from "../../idContext";

import Axios from "axios";

import Cookies from "js-cookie";

export const FurtherFunctions = (props) => {
	const { value, setValue } = useContext(idContext);
	const [showSelection, setShowSlection] = useState(true);
	const [heading, setHeading] = useState("Further Functions");
	const [showAddSpace, setShowAddSpace] = useState(false);
	const [initialize, setInitialize] = useState(true);
	const [rightHand, setRightHand] = useState(true);
	const [explanation, setExplanation] = useState(false);
	const [explainText, setExplainText] = useState("");
	const [explainTextTwo, setExplainTextTwo] = useState("");
	const [explainThree, setExplainThree] = useState("");
	const [example, setExample] = useState(false);
	const [sentenceToTap, setSentenceToTapp] = useState("");
	const [explainMarking, setExplainMarking] = useState(false);
	const [keys, setKeys] = useState([
		"switch + ⬤ ○⬤○○",
		"switch + ○ ⬤⬤○○",
		"switch + ⬤ ⬤○○○",
		"switch + ○ ○⬤⬤○",
		"switch + ⬤ ○○⬤○",
		"switch + ⬤ ○⬤⬤○",
		"switch + ⬤ ⬤○⬤⬤",
		"switch + ○ ⬤⬤⬤○",
		"switch + ⬤ ⬤○○⬤",
	]);
	const [menuBackUrl, setMenuBackUrl] = useState("/Learn2Tap");
	const [state, setState] = useState("menu");

	function loadAddSpace() {
		sendUserTracking(value, "Add Space", "AddSpace", "Further Functions");
		setState("AddSpace");
		setMenuBackUrl("/Learn2Tap/FurtherFunctions");
		if (rightHand) {
			setExplainText("To insert a space tap: ⬤ ⬤⬤⬤⬤");
		} else {
			setExplainText("To insert a space tap: ⬤⬤⬤⬤ ⬤");
		}
		setSentenceToTapp("v := b view.");
		setHeading("Add Space");
		setExplainThree("");
		setExplainTextTwo("");
		setExplanation(true);
		setShowAddSpace(true);
	}

	function loadUppercase() {
		sendUserTracking(value, "Uppercase", "Uppercase", "Further Functions");
		setState("Uppercase");
		setMenuBackUrl("/Learn2Tap/FurtherFunctions");
		setShowSlection(false);

		if (rightHand) {
			setExplainText("To capitalize the next letter: 2× ⬤ ○○○○");
			setExplainTextTwo("To write continuously uppercase: 2× ○ ⬤○○○");
			setExplainThree("To stop writing capital letters: 2× ○ ⬤○○○");
		} else {
			setExplainText("To capitalize the next letter: 2× ○○○○ ⬤");
			setExplainTextTwo("To write continuously uppercase: 2× ○○○⬤ ○");
			setExplainThree("To stop writing capital letters:  2× ○○○⬤ ○");
		}
		setSentenceToTapp("RTShape withAllSubclasses");
		setHeading("Tap Uppercase");

		setExplanation(true);
		setShowAddSpace(true);
	}

	function loadMarking() {
		sendUserTracking(value, "Marking", "Marking", "Further Functions");
		setState("Marking");
		setMenuBackUrl("/Learn2Tap/FurtherFunctions");
		setShowAddSpace(true);
		setExplainMarking(true);
		setHeading("Select Text");

		if (rightHand === false) {
			setKeys([
				"switch + ○○⬤○ ⬤",
				"switch + ○○⬤⬤ ○",
				"switch + ○○○⬤ ⬤",
				"switch + ○⬤⬤○ ○",
				"switch + ○⬤○○ ⬤",
				"switch + ○⬤⬤○ ⬤",
				"switch + ⬤⬤○⬤ ⬤",
				"switch + ○⬤⬤⬤ ○",
				"switch + ⬤○○⬤ ⬤",
			]);
		}
	}

	useEffect(() => {
		const timer = setInterval(() => {
			if (initialize) {
				sendUserTracking(
					value,
					"Open Further Functions",
					"Further Functions",
					"Further Functions"
				);
				var hand = Cookies.get("Hand");
				var currRight = true;

				if (hand === "left") {
					setRightHand(false);
					currRight = false;
				}

				setInitialize(false);
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
									"Further Functions Menu"
								);
								window.location.href = menuBackUrl;
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
									"Double Tap Menu"
								);
								Cookies.set("lastPage", "/FurtherFunctions");
								window.location.href = "/Learn2Tap/Glossary";
							}}
						>
							Glossary
						</button>
					</div>
				</div>
				<div class="menuDiv">
					<h2>{heading}</h2>

					<br></br>
					<div className="modeSelection">
						{showSelection && (
							<div class="showSelectionDiv">
								<button
									class="normalButton"
									id="practicButtonMenuFF"
									type="button"
									onClick={() => {
										setShowSlection(false);
										loadAddSpace();
									}}
								>
									<div>
										<b>Add Space</b>
									</div>
								</button>
								<br></br>
								<button
									class="normalButton"
									id="practicButtonMenuFF"
									type="button"
									onClick={() => {
										loadUppercase();
									}}
								>
									<div>
										<b>Tap Uppercase</b>
									</div>
								</button>
								<br></br>
								<button
									class="normalButton"
									id="practicButtonMenuFF"
									type="button"
									onClick={() => {
										setShowSlection(false);
										loadMarking();
									}}
								>
									<div>
										<b>Select Text</b>
									</div>
								</button>
							</div>
						)}
						{showAddSpace && (
							<div>
								{explanation && (
									<div>
										{explainText}
										<br></br>
										{explainTextTwo}
										<br></br>
										{explainThree}
										<br></br>
										<button
											class="normalButton"
											id="practicButtonMenuFFX"
											type="button"
											onClick={() => {
												setExample(true);
											}}
										>
											<div>
												<b>Try it.</b>
											</div>
										</button>{" "}
									</div>
								)}

								{explainMarking && (
									<div>
										To start the marking mode: {keys[0]}
										<br></br>
										Use the arrow keys to select which parts of the text should
										be selected
										<br></br>(Up: {keys[1]}, left: {keys[2]}, right: {keys[3]},
										down: {keys[4]}).
										<br></br>
										End the markinng mode: {keys[0]}
										<br></br>
										And then:
										<br></br>
										To copy the selected text: {keys[5]}
										<br></br>
										To pase the selected text: {keys[6]}
										<br></br>
										To delete the selected text: {keys[7]}
										<br></br>
										To Escape: {keys[8]}
										<br></br>
										<button
											class="normalButton"
											id="practicButtonMenuFFX"
											type="button"
											onClick={() => {
												setExample(true);
											}}
										>
											<div>
												<b>Try it.</b>
											</div>
										</button>
									</div>
								)}
								{example && (
									<div>
										<br></br>
										{explanation && (
											<div>
												Tap the following sentence:
												<br></br>
												<br></br>
												{sentenceToTap}
												<br></br>
												<br></br>
												<textarea
													name="Text1"
													cols="40"
													rows="5"
												></textarea>{" "}
											</div>
										)}
										{explainMarking && (
											<textarea name="Text1" cols="40" rows="5">
												{" "}
												(1 to: 10) do: [ :i | | ds | ds := RTBoxPlotDataSet new.
												ds points: (createList value: 20 value: 0 value: 20). b
												add: ds ].
											</textarea>
										)}
										<br></br>
										<button
											class="normalButton"
											id="practicButtonMenuFFX"
											type="button"
											onClick={() => {
												if (state === "AddSpace") {
													setExample(false);
													loadUppercase();
												} else if (state === "Uppercase") {
													setExample(false);
													setExplanation(false);
													loadMarking();
												} else if (state === "Marking") {
													setExample(false);
													setExplanation(false);
													setExplainMarking(false);

													window.location.href = "/Learn2Tap/FurtherFunctions";
												}
											}}
										>
											<div>
												<b>Next</b>
											</div>
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
