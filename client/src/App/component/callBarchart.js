import React, { useState }from "react";
import BarChart2 from "./barchart2";
import Barchart from "./D3.barchart";
import "./component.stylsheet.css";

class CallBarchart extends  React.Component{
    
   
     state = {
        svgWidth:this.props.svgWidth,
        svgHeight:this.props.svgHeight,
        barPadding: this.props.barPadding,
        dataset:this.props.data,
        lableX:this.props.lableX,
        color: this.props.color,
        lengthY : this.props.yLength,
              
        
      }

      
      render() {
        return (
            console.log(this.props.svgWidth),
    
          <div >
           
            <Barchart svgWidth={this.state.svgWidth}
              svgHeight={this.state.svgHeight}
              barPadding={this.state.barPadding}
              dataset={this.state.dataset}
              lableX={this.state.lableX}
              color={this.state.color}
              yAxisLength = {this.state.lengthY}

            
            
            
            > </Barchart>
          </div>
        );
      }    
}

export default CallBarchart;
