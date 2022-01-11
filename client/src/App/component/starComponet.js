import React from "react";
import * as d3 from "d3";
import "./component.stylsheet.css";

class Star extends React.Component {
	componentDidMount() {
		this.drawChart();
	}

	drawChart() {
		var data1 = [
			{ x: 25, y: 0 },
			{ x: 10, y: 50 },
			{ x: 50, y: 20 },
			{ x: 0, y: 20 },
			{ x: 40, y: 50 },
			{ x: 25, y: 0 },
		];
		var data2 = [
			{ x: 85, y: 0 },
			{ x: 70, y: 50 },
			{ x: 110, y: 20 },
			{ x: 60, y: 20 },
			{ x: 100, y: 50 },
			{ x: 85, y: 0 },
		];
		var data3 = [
			{ x: 145, y: 0 },
			{ x: 130, y: 50 },
			{ x: 170, y: 20 },
			{ x: 120, y: 20 },
			{ x: 160, y: 50 },
			{ x: 145, y: 0 },
		];

		const svg = d3.select("#starSVG").attr("width", 200).attr("height", 50);

		// Add the path using this helper function
		var lineFunc = d3
			.line()
			.x(function (d) {
				return d.x;
			})
			.y(function (d) {
				return d.y;
			});

		// Add the path using this helper function
		svg
			.append("path")
			.attr("d", lineFunc(data1))
			.attr("stroke", this.props.colorFirst)
			.attr("fill", this.props.colorFirst);

		svg
			.append("path")
			.attr("d", lineFunc(data2))
			.attr("stroke", this.props.colorSeconde)
			.attr("fill", this.props.colorSeconde);

		svg
			.append("path")
			.attr("d", lineFunc(data3))
			.attr("stroke", this.props.colorThird)
			.attr("fill", this.props.colorThird);
	}
	render() {
		return (
			<div className="showStar">
				<svg id="starSVG" background-color="blue"></svg>
			</div>
		);
	}
}
export default Star;
