import React, { useEffect, useState, useContext } from "react";
import "./gamesMenu.css";
import Axios from "axios";
import { sendUserTracking } from "../functions/functions";
import { idContext } from "../../idContext";

import Cookies from "js-cookie";

//Implemantaion of the game menu view
export const Games = (props) => {
	const { value, setValue } = useContext(idContext);

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
								window.location.href = "/Learn2Tap";
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
									"Games Menu"
								);
								Cookies.set("lastPage", "/GamesMenu");
								window.location.href = "/Learn2Tap/Glossary";
							}}
						>
							Glossary
						</button>
					</div>
				</div>
				<br></br>
				<h2>Games</h2>
				<br></br>
				<div className="modeSelection">
					<div class="menuDiv">
						<button
							class="normalButton"
							id="gameButtonGamesMenu"
							type="button"
							onClick={() => {
								sendUserTracking(
									value,
									"button click",
									"Time To Tap Button",
									"gamesMenu"
								);

								window.location.href = "/Learn2Tap/TimeToTap";
							}}
						>
							<div>
								<b>Time To Tap</b>
								<br></br>
								All modes available
							</div>
						</button>

						<button
							class="normalButton"
							id="gameButtonGamesMenu"
							type="button"
							onClick={() => {
								sendUserTracking(
									value,
									"button click",
									"Tap It 5-Times button",
									"gamesMenu"
								);

								window.location.href = "/Learn2Tap/TapIt5-Times";
							}}
						>
							<div>
								<b>Tap It 5-Times</b>
								<br></br>
								Single Tap, DoubleTap, TripleTap, Switch
							</div>
						</button>
						<button
							class="normalButton"
							id="gameButtonGamesMenu"
							type="button"
							onClick={() => {
								sendUserTracking(
									value,
									"button click",
									"Coding button",
									"gamesMenu"
								);

								window.location.href = "/Learn2Tap/Coding";
							}}
						>
							<div>
								<b>Coding</b>
								<br></br>
								Single Tap, DoubleTap, TripleTap, Switch
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
