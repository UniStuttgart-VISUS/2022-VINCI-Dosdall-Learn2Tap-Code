import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Welcome } from "./App/UserAdministration/Welcome";
import { Glossary } from "./App/overview/glossary";
import { Register } from "./App/UserAdministration/Register";
import { Menu } from "./App/menu.js";
import {
	combinationContext,
	idContext,
	symbolsContext,
	modusContext,
	unitNameContext,
} from "./idContext";
import { Games } from "./App/games/games.js";
import { StreakChallenge } from "./App/games/streakChallenge";
import { RepeatFive } from "./App/games/repeatFive";

import { Coding } from "./App/games/coding";
import { SingleTapMenu } from "./App/practice/singleTapMenu.js";
import { DoubleTapMenu } from "./App/practice/doubleTapMenu";
import { TripleTapMenu } from "./App/practice/tripleTapMenu";
import { ShiftMenu } from "./App/practice/shiftMenu.js";
import { SwitchMenu } from "./App/practice/switchMenu.js";
import { Statistics } from "./App/statistics/statistics.js";
import { MenuLearningUnit } from "./App/practice/menuLearningUnit.js";
import { MenuLU3Level } from "./App/practice/menuLU3Level";
import { AEIOUTutoriel } from "./App/practice/tutoriel";
import { AEIOUPractice } from "./App/practice/practice";
import { AEIOULevel1 } from "./App/practice/Level";
import { FurtherFunctions } from "./App/practice/furtherFunctionsMenu";
import { Help } from "./App/help";
import { NotFound } from "./App/notFound";

function Index() {
	const [value, setValue] = useState(0);
	const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

	const [symbolArr, setSymbolArr] = useState([]);
	const providerSymbolArr = useMemo(
		() => ({ symbolArr, setSymbolArr }),
		[symbolArr, setSymbolArr]
	);

	const [combinationArray, setCombinationArray] = useState([]);
	const providerCombinationArr = useMemo(
		() => ({ combinationArray, setCombinationArray }),
		[combinationArray, setCombinationArray]
	);

	const [modus, setModus] = useState("");
	const providerModus = useMemo(() => ({ modus, setModus }), [modus, setModus]);

	const [unitName, setUnitName] = useState([]);
	const providerUnitName = useMemo(
		() => ({ unitName, setUnitName }),
		[unitName, setUnitName]
	);

	var valIdCookie = Cookies.get("userID");
	if (value !== 0) {
		Cookies.set("userID", value, { expires: 7 });
	} else {
		setValue(valIdCookie);
	}

	return (
		<div className="Index">
			<Switch>
				<combinationContext.Provider
					value={{ combinationArray, setCombinationArray }}
				>
					<modusContext.Provider value={{ modus, setModus }}>
						<unitNameContext.Provider value={{ unitName, setUnitName }}>
							<symbolsContext.Provider value={{ symbolArr, setSymbolArr }}>
								<idContext.Provider value={{ value, setValue }}>
									<Route
										exact
										path="/Learn2Tap/UserAdministration"
										component={Welcome}
									/>
									<Route
										exact
										path="/Learn2Tap/Glossary"
										component={Glossary}
									/>
									<Route
										exact
										path="/Learn2Tap/Register"
										component={Register}
									/>
									<Route exact path="/Learn2Tap" component={Menu} />
									<Route
										exact
										path="/Learn2Tap/FurtherFunctions"
										component={FurtherFunctions}
									/>
									<Route
										exact
										path="/Learn2Tap/SingleTapMenu"
										component={SingleTapMenu}
									/>
									<Route
										exact
										path="/Learn2Tap/DoubleTapMenu"
										component={DoubleTapMenu}
									/>
									<Route
										exact
										path="/Learn2Tap/TripleTapMenu"
										component={TripleTapMenu}
									/>
									<Route
										exact
										path="/Learn2Tap/ShiftMenu"
										component={ShiftMenu}
									/>
									<Route
										exact
										path="/Learn2Tap/SwitchMenu"
										component={SwitchMenu}
									/>
									<Route exact path="/Learn2Tap/GamesMenu" component={Games} />
									<Route
										exact
										path="/Learn2Tap/TimeToTap"
										component={StreakChallenge}
									/>
									<Route
										exact
										path="/Learn2Tap/TapIt5-Times"
										component={RepeatFive}
									/>
									<Route exact path="/Learn2Tap/Coding" component={Coding} />
									<Route
										exact
										path="/Learn2Tap/MenuPracticeUnit"
										component={MenuLearningUnit}
									/>
									<Route
										exact
										path="/Learn2Tap/MenuPracticeUnit3"
										component={MenuLU3Level}
									/>
									<Route
										exact
										path="/Learn2Tap/Tutoriel"
										component={AEIOUTutoriel}
									/>
									<Route
										exact
										path="/Learn2Tap/Practice"
										component={AEIOUPractice}
									/>
									<Route
										exact
										path="/Learn2Tap/Level"
										component={AEIOULevel1}
									/>
									<Route
										exact
										path="/Learn2Tap/Statistics"
										component={Statistics}
									/>
									<Route exact path="/Learn2Tap/Hints" component={Help} />
								</idContext.Provider>
							</symbolsContext.Provider>
						</unitNameContext.Provider>
					</modusContext.Provider>
				</combinationContext.Provider>
			</Switch>
		</div>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(
	<BrowserRouter>
		{" "}
		<Index />{" "}
	</BrowserRouter>,
	rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
