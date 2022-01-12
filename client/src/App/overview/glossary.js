import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import "./overview.stylsheet.css";
import { idContext } from "../../idContext";
import { sendUserTracking } from "../functions/functions";

//Loading Glossary
export const Glossary = (props) => {
	const { value, setValue } = useContext(idContext);
	const [hand, setHand] = useState("right");
	const [overviewObject, setOvervewObject] = useState({});
	const [buttonWidth, setButtonWidth] = useState("40px");
	const [headername, setHeaderName] = useState("Single Tap");
	const [initialize, setInitialize] = useState(true);
	const [callfunction, setCallFunction] = useState(false);
	const [showGlossary, setShowGlossary] = useState(false);
	const [backUrl, setBackUrl] = useState("/Learn2Tap");

	function loadOverview(modus, currHeadername) {
		setHeaderName(currHeadername);
		var currObj = overviewObject;

		var table =
			'<div class="outer">' +
			' <div class="tableSpace"></div>' +
			' <div id= "tableLeft">' +
			'<table class="table" id="tableGlossary">';
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				var currSym = "";
				var currCombination = "";

				for (var i = 0; i < 31; i++) {
					if (modus === 1) {
						currSym = currObj[i].single;
					} else if (modus === 2) {
						currSym = currObj[i].doubletap;
					} else if (modus === 3) {
						currSym = currObj[i].triple;
					} else if (modus === 4) {
						currSym = currObj[i].switch;
					} else if (modus === 5) {
						currSym = currObj[i].shift;
					}
					if (hand === "right") {
						currCombination = currObj[i].righthand;
					} else {
						currCombination = currObj[i].lefthand;
					}
					if (currSym === "]]") {
						currSym = "]";
					} else if (currSym === "[[") {
						currSym = "[";
					}

					if (currObj[i].id === 1) {
						table =
							table +
							'<thead> <tr> <th scope="col">ONE FINGER DOWN</th> <th scope="col">SYMBOL</th>' +
							"        </tr>  </thead> <tbody>";
						if (currSym !== "") {
							table =
								table +
								"<tr> <td>" +
								currCombination +
								"</td> <td>" +
								currSym +
								"</td> </tr>";
							console.log(table);
						}
					} else if (
						((currObj[i].id > 1 && currObj[i].id < 6) ||
							(currObj[i].id > 6 && currObj[i].id < 10) ||
							(currObj[i].id > 10 && currObj[i].id < 13) ||
							(currObj[i].id > 13 && currObj[i].id < 15) ||
							currObj[i].id === 14 ||
							currObj[i].id === 16 ||
							(currObj[i].id > 17 && currObj[i].id < 22) ||
							currObj[i].id === 23 ||
							currObj[i].id === 25 ||
							currObj[i].id === 27 ||
							(currObj[i].id > 28 && currObj[i].id < 31)) &&
						currSym !== ""
					) {
						if (currSym !== null) {
							table =
								table +
								"<tr> <td>" +
								currCombination +
								"</td> <td>" +
								currSym +
								"</td> </tr>";
						}
					} else if (currObj[i].id === 6) {
						table =
							table +
							' </tbody>  <thead> <tr> <th scope="col">TWO FINGERS TOGETHER</th> <th scope="col"></th>' +
							'  <th scope="col"></th>    </tr></thead>  <tbody>';
						if (currSym !== "") {
							table =
								table +
								" <tr>  <td>" +
								currCombination +
								" </td><td>" +
								currSym +
								"</td>  </tr>";
						}
					} else if (currObj[i].id === 10) {
						table =
							table +
							' </tbody>  <thead> <tr> <th scope="col">TWO FINGERS SKIPPING ONE</th> <th scope="col"></th>' +
							'  <th scope="col"></th>    </tr></thead>  <tbody>';
						if (currSym !== "") {
							table =
								table +
								" <tr>  <td>" +
								currCombination +
								" </td><td>" +
								currSym +
								"</td>  </tr>";
						}
					} else if (currObj[i].id === 13) {
						table =
							table +
							' </tbody>  <thead> <tr> <th scope="col">TWO FINGERS SKIPPING TWO</th> <th scope="col"></th>' +
							'  <th scope="col"></th>    </tr></thead>  <tbody>';

						if (currSym !== "") {
							table =
								table +
								" <tr>  <td>" +
								currCombination +
								" </td><td>" +
								currSym +
								"</td>  </tr>";
						}
					} else if (currObj[i].id === 15) {
						table =
							table +
							' </tbody>  <thead> <tr> <th scope="col">LOOKES LIKE Y AND W</th> <th scope="col"></th>' +
							'  <th scope="col"></th>    </tr></thead>  <tbody> ';
						if (currSym !== "") {
							table =
								table +
								" <tr>  <td>" +
								currCombination +
								" </td><td>" +
								currSym +
								"</td>  </tr>";
						}
					} else if (currObj[i].id === 17) {
						table =
							table +
							'  </tbody></table></div></div><div id="tableSpace"></div><div id="tableLeft2"><table class="table"  id="tableGlossary">' +
							'    <thead>  <tr><th scope="col">' +
							"ONE FINGER UP " +
							'</th>  <th scope="col">SYMBOL</th>  </tr> </thead>  <tbody> ';
						if (currSym !== "") {
							table =
								table +
								" <tr>  <td>" +
								currCombination +
								" </td><td>" +
								currSym +
								"</td>  </tr>";
						}
					} else if (currObj[i].id === 22) {
						table =
							table +
							' </tbody>  <thead> <tr> <th scope="col">ONE FINGER CHASING TWO</th> <th scope="col"></th>' +
							'  <th scope="col"></th>    </tr></thead>  <tbody> ';
						if (currSym !== "") {
							table =
								table +
								" <tr>  <td>" +
								currCombination +
								" </td><td>" +
								currSym +
								"</td>  </tr>";
						}
					} else if (currObj[i].id === 24) {
						table =
							table +
							' </tbody>  <thead> <tr> <th scope="col">Two FINGERS CHASING ONE</th> <th scope="col"></th>' +
							'  <th scope="col"></th>    </tr></thead>  <tbody> ';
						if (currSym !== "") {
							table =
								table +
								" <tr>  <td>" +
								currCombination +
								" </td><td>" +
								currSym +
								"</td>  </tr>";
						}
					} else if (currObj[i].id === 26) {
						table =
							table +
							' </tbody>  <thead> <tr> <th scope="col">THREE FINGERS SKIPPING TWO</th> <th scope="col"></th>' +
							'  <th scope="col"></th>    </tr></thead>  <tbody> ';
						if (currSym !== "") {
							table =
								table +
								" <tr>  <td>" +
								currCombination +
								" </td><td>" +
								currSym +
								"</td>  </tr>";
						}
					} else if (currObj[i].id === 28 && currHeadername !== "Triple Tap") {
						table =
							table +
							' </tbody>  <thead> <tr> <th scope="col">THREE FINGERS TOGETHER</th> <th scope="col"></th>' +
							'  <th scope="col"></th>    </tr></thead>  <tbody> ';
						if (currSym !== "") {
							table =
								table +
								" <tr>  <td>" +
								currCombination +
								" </td><td>" +
								currSym +
								"</td>  </tr>";
						}
					} else if (currObj[i].id === 31 && currHeadername !== "Triple Tap") {
						table =
							table +
							' </tbody>  <thead> <tr> <th scope="col">ALL FINGERS TOEGEHTER</th> <th scope="col"></th>' +
							'  <th scope="col"></th>    </tr></thead>  <tbody> ';
						if (currSym !== "") {
							table =
								table +
								" <tr>  <td>" +
								currCombination +
								" </td><td>" +
								currSym +
								"</td>  </tr>";
						}
					}
				}
				table = table + "</table> </div> </div>";
				document.getElementById("showInfo").innerHTML = table;
			}
		};
		xhttp.open("GET", "demo_get.asp", true);
		xhttp.send();
		setShowGlossary(true);
	}

	useEffect(() => {
		const timer = setInterval(() => {
			if (initialize) {
				var lastPage = Cookies.get("lastPage");
				var currHand = Cookies.get("Hand");

				setBackUrl("/Learn2Tap" + lastPage);

				if (currHand == "left") {
					setHand("left");
				}

				Axios.get(`http://localhost:3001/getGlossary/${currHand}`).then(
					(response) => {
						var res = response.data[0];
						setOvervewObject(res);

						setInitialize(false);
						setCallFunction(true);
					}
				);
			}

			if (callfunction) {
				loadOverview(1, "Single Tap");
				setCallFunction(false);
				clearInterval(timer);
			}
		}, 100);
		// clearing interval
		return () => clearInterval(timer);
	});

	return (
		<div id="returnMenuDiv">
			<div>
				<button
					class="normalButton"
					type="button"
					id="userAdministrationButton"
					onClick={() => {
						sendUserTracking(value, "button click", "Menu Button", "Glossary");
						window.location.href = backUrl;
					}}
				>
					Menu
				</button>
				<h2>Glossary</h2>

				<div id="selection">
					<button
						class="normalButton"
						type="button"
						id="glossaryButtonOverview"
						onClick={() => {
							setShowGlossary(false);
							loadOverview(1, "Single Tap");
							sendUserTracking(value, "button click", "Single Tap", "Glossary");
						}}
					>
						Single Tap
					</button>

					<button
						class="normalButton"
						type="button"
						id="glossaryButtonOverview"
						onClick={() => {
							setShowGlossary(false);
							loadOverview(2, "Double Tap");
							sendUserTracking(value, "button click", "Double Tap", "Glossary");
						}}
					>
						Double Tap
					</button>

					<button
						class="normalButton"
						type="button"
						id="glossaryButtonOverview"
						onClick={() => {
							setShowGlossary(false);
							loadOverview(3, "Triple Tap");
							sendUserTracking(value, "button click", "Triple Tap", "Glossary");
						}}
					>
						Triple Tap
					</button>

					<button
						class="normalButton"
						type="button"
						id="glossaryButtonOverview"
						onClick={() => {
							setShowGlossary(false);
							loadOverview(4, "Switch");
							sendUserTracking(value, "button click", "Switch", "Glossary");
						}}
					>
						Switch
					</button>

					<button
						class="normalButton"
						type="button"
						id="glossaryButtonOverview"
						onClick={() => {
							setShowGlossary(false);
							loadOverview(5, "Shift");
							sendUserTracking(value, "button click", "Shift", "Glossary");
						}}
					>
						Shift
					</button>
				</div>
				{showGlossary && (
					<div>
						<div>
							{" "}
							<br></br> <h4 class="tableHeader">{headername} </h4> <br></br>"
						</div>

						<div id="showInfo"></div>
					</div>
				)}
			</div>
		</div>
	);
};
