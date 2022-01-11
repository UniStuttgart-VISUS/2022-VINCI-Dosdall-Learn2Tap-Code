import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import "../../App.css";
import { idContext } from "../../idContext";
import Cookies from "js-cookie";
import { sendUserTracking } from "../functions/functions";

export const Welcome = (props) => {
	const { value, setValue } = useContext(idContext);
	const [askSpecificUser, setAskSpecificUser] = useState(false);
	const [userList, setUserList] = useState([]);
	const [initialize, setInitialize] = useState(true);
	const [showMenu, setShowMenu] = useState(false);
	const [killIntervall, setKillIntervall] = useState(false);

	//Get a specific User
	const getSpecificUser = (name) => {
		Axios.get(`http://localhost:3001/specificUser/${name}`).then((response) => {
			if (response.data[0] === undefined && askSpecificUser) {
				alert("There is no user with this ID and name");
				setAskSpecificUser(false);
			} else {
				setValue(response.data[0].id);
				Cookies.set("Hand", response.data[0].hand, { expires: 7 });
				sendUserTracking(
					value,
					"Alert Message",
					"Alert - Welcome",
					"User Administration"
				);
				alert("Welcome back " + response.data[0].name);
				setAskSpecificUser(false);
				window.location.href = "/Learn2Tap";
			}
		});
	};

	useEffect(() => {
		const timer = setInterval(() => {
			//Initialize everything in the begining
			if (initialize) {
				Axios.get(`http://localhost:3001/Users/${initialize}`).then(
					(response) => {
						setUserList(response.data);
					}
				);

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

	return (
		<div id="returnMenuDiv">
			{showMenu && (
				<div className="App">
					<button
						class="normalButton"
						type="button"
						id="userAdministrationButton"
						onClick={() => {
							sendUserTracking(
								value,
								"button click",
								"menu button",
								"User Administration"
							);
							setInitialize(true);
							window.location.href = "/Learn2Tap";
						}}
					>
						Menu
					</button>

					<h3>User Administration</h3>
					<div className="information">
						<button
							class="normalButton"
							id="registerButton"
							onClick={() => {
								sendUserTracking(
									value,
									"button click",
									"Registration button",
									"User Administration"
								);
								window.location.href = "/Learn2Tap/Register";
							}}
						>
							Register
						</button>
					</div>
					<br></br>
					<div className="user">
						{userList.map((val, key) => {
							return (
								<div className="userListResult">
									<div class="half">
										<p>Name: {val.name}</p>
									</div>

									<div class="half2Dis"></div>

									<div class="half2">
										<button
											class="normalButton"
											id="selectUserButton"
											onClick={() => {
												sendUserTracking(
													value,
													"button click",
													"Load Data button",
													"User Administration"
												);
												getSpecificUser(val.name);
											}}
										>
											Load Data
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};
