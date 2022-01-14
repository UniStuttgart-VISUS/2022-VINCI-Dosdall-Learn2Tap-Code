import React from "react";
import * as d3 from "d3";
import "./component.stylsheet.css";

class Barchart extends React.Component {
	componentDidMount() {
		this.drawChart();
	}

	drawChart() {
		let barWidth =
			this.props.svgWidth / this.props.dataset.length -
			this.props.barPadding -
			25 / this.props.dataset.length;
		var colorArr = this.props.color;
		console.log("DEBUG D3 1", this.props.dataset);
		var timeI = -1;
		let svg = d3
			.select("#chart")
			.style("margin-top", "10")
			.style("background-color", "#F5F9DC") //rgb(255,255,223)')  	// 'cadetblue')
			.attr("width", this.props.svgWidth)
			.attr("height", this.props.svgHeight + 40);

		svg
			.selectAll("text")
			.data(this.props.lableX)
			.enter()
			.append("text")
			.text((d) => d)
			.attr("y", (d, i) => this.props.svgHeight)
			.attr(
				"x",
				(d, i) =>
					this.props.barPadding + 35 + i * (this.props.barPadding + barWidth)
			)
			.style("text-anchor", "middle");

		let yScale = d3
			.scaleLinear()
			.domain([0, this.props.yAxisLength])
			.range([0, this.props.svgHeight]);

		var xscale = d3.scaleLinear().domain([]).range([0, this.props.svgWidth]);

		var yscaleAxis = d3
			.scaleLinear()
			.domain([0, this.props.yAxisLength])
			.range([this.props.svgHeight, 0]);

		var x_axis = d3.axisBottom().scale(xscale);

		var y_axis = d3.axisLeft().scale(yscaleAxis);

		var xAxisTranslate = this.props.svgHeight - 15;
		var yAxisTranslate = this.props.svgHeight;
		svg
			.append("g")
			.attr("transform", "translate(25, -15)") //"+ yAxisTranslate +")")
			.call(y_axis);

		svg
			.append("g")
			.attr("transform", "translate(25, " + xAxisTranslate + ")")
			.call(x_axis);

		svg
			.selectAll("rect")
			.data(this.props.dataset)
			.enter() //take data one by one and do operations
			.append("rect")
			.attr(
				"x",
				(d, i) =>
					this.props.barPadding + 25 + i * (barWidth + this.props.barPadding)
			)
			.attr("y", (d) => this.props.svgHeight - 16 - yScale(d))
			.attr("width", barWidth - this.props.barPadding)
			.attr("height", (d) => yScale(d))
			.attr("fill", "#3772A9");
	}
	render() {
		return (
			<div className="showBar">
				<svg id="chart"></svg>
			</div>
		);
	}
}
export default Barchart;
