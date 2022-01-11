import React from "react";
import ReactDOM from "react-dom";

class TutorielLetter extends React.Component {
	render() {
		return (
			<div>
				<p style={{ "font-size": this.props.fontSize }} class="letterTutoriel">
					{this.props.letter}
				</p>
				<br></br>
				<h2>{this.props.combination}</h2>{" "}
			</div>
		);
	}
}

export default TutorielLetter;
