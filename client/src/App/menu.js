import React, { Component, useState, useContext, useEffect } from "react";
import "./menu.stylsheet.css";
import { idContext } from "../idContext";
import Cookies from "js-cookie";
import { sendUserTracking } from "./functions/functions";
import Axios from "axios";

//Main menu - start page
export const Menu = (props) => {
	var pageUrl = "http://localhost:3000";
	const { value, setValue } = useContext(idContext);
	const [hand, setHand] = useState(Cookies.get("Hand"));
	const [idCookie, setIDcookie] = useState(0);
	const [showAlert, setShowAlert] = useState(false);
	const [welcomeMesssage, setWelcomeMessage] = useState("");
	const [initialize, setInitialize] = useState(true);
	const [userName, setUserName] = useState("");
	const [showMenu, setShowMenu] = useState(false);
	const [killIntervall, setKillIntervall] = useState(false);

	//Set the Welcome Message, depending on if the cookies have stored a UserID
	function showUser() {
		if (idCookie === 0) {
			setShowAlert(true);
			setWelcomeMessage(
				"No user logged in.  Go to User Administration to register a user."
			);
		} else {
			setShowAlert(false);
			setWelcomeMessage("Hello " + value);
		}
	}

	useEffect(() => {
		const timer = setInterval(() => {
			//Iniialize everything in the begining
			if (initialize) {
				var currCookieID = Cookies.get("userID");

				if (currCookieID.indexOf("u") == 0) {
					showUser();
					sendUserTracking(
						0,
						"Not Registered User Open Page",
						"Not Registered User Open App",
						"menu"
					);
				} else {
					Axios.get(
						`http://localhost:3001/getSpecificUserName/${currCookieID}`
					).then((response) => {
						setUserName(response.data[0]);
						setWelcomeMessage("Welcome " + response.data[0]);
					});

					sendUserTracking(value, "User Open Page", "User Open App", "menu");
					setValue(currCookieID);
				}

				setInitialize(false);
			} else {
				setShowMenu(true);
				setKillIntervall(true);
			}
		}, 100);

		if (killIntervall) {
			clearInterval(timer);
		}
		// clearing interval
		return () => clearInterval(timer);
	});

	//deload the practice Part
	function deloadDoc() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				document.getElementById("demo").innerHTML = "  ";
			}
		};
		xhttp.open("GET", "demo_get.asp", true);
		xhttp.send();
	}

	//load the practice Part
	function loadDoc() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				document.getElementById("demo").innerHTML =
					' <a href="/Learn2Tap/SingleTapMenu">Single Tap</a> <br>' +
					' <a href="/Learn2Tap/DoubleTapMenu">Double Tap</a> <br>' +
					' <a href="/Learn2Tap/TripleTapMenu">Triple Tap</a> <br>' +
					' <a href="/Learn2Tap/ShiftMenu">Shift</a> <br>' +
					' <a href="/Learn2Tap/SwitchMenu">Switch</a> <br>' +
					'<a href="/Learn2Tap/FurtherFunctions">Further Functions</a>';
			}
		};
		xhttp.open("GET", "demo_get.asp", true);
		xhttp.send();
	}

	//returns main menu view (Start page)
	return (
		<div id="returnMenuDiv">
			{showMenu && (
				<div id="buttonDiv">
					<div width="100%" class="row">
						<div class="col">
							<div class="userAdmin">
								<button
									class="normalButton"
									type="button"
									id="userAdministrationButton"
									onClick={() => {
										sendUserTracking(
											value,
											"button click",
											"user Administration button",
											"menu"
										);

										window.location.href = "/Learn2Tap/UserAdministration";
									}}
								>
									User Administration
								</button>
							</div>
						</div>
						<div class="col" id="addSpace"></div>
						<div class="col" id="addSpace"></div>

						<div class="col" id="addSpace"></div>
						<div class="col" id="addSpace"></div>
						<div class="col">
							<button
								type="button"
								class="normalButton"
								id="hintButton"
								onClick={() => {
									sendUserTracking(
										value,
										"Button click",
										"Hint Button",
										"menu"
									);
									window.location.href = "/Learn2Tap/Hints";
								}}
							>
								Hints
							</button>
						</div>
					</div>

					<div class="menuDiv">
						<h2 id="headerLearn">Learn2Tap</h2>
						<br></br>

						{showAlert && (
							<div class="alert">
								<strong>Info!</strong> Set your system to US - English to use
								TapStrap without difficulty.
							</div>
						)}
						<p>{welcomeMesssage}</p>

						<h4>Menu</h4>

						<br></br>

						<button
							class="normalButton"
							type="button"
							id="glossaryButton"
							onClick={() => {
								Cookies.set("lastPage", "");
								sendUserTracking(
									value,
									"button click",
									"glossary button",
									"menu"
								);
								window.location.href = "/Learn2Tap/Glossary";
							}}
						>
							Glossary
						</button>
						<div class="distance"></div>
						<div class="Practice">
							<button
								id="practiceButton"
								onClick={() => {
									sendUserTracking(
										value,
										"button click",
										"load practice",
										"menu"
									);
									loadDoc();
								}}
							>
								Practice
							</button>
							<button
								id="delode"
								onClick={() => {
									sendUserTracking(
										value,
										"button click",
										"deloade practice",
										"menu"
									);
									deloadDoc();
								}}
							>
								^
							</button>
						</div>
						<div id="demo"></div>

						<button
							class="normalButton"
							id="gameButton"
							type="button"
							onClick={() => {
								sendUserTracking(value, "button click", "games button", "menu");
								window.location.href = "/Learn2Tap/GamesMenu";
							}}
						>
							Games
						</button>
						<button
							class="normalButton"
							type="button"
							id="statisticButton"
							onClick={() => {
								sendUserTracking(
									value,
									"button click",
									"statistic button",
									"menu"
								);
								window.location.href = "/Learn2Tap/Statistics";
							}}
						>
							Statistics
						</button>
						<br></br>
					</div>
				</div>
			)}
		</div>
	);
};
