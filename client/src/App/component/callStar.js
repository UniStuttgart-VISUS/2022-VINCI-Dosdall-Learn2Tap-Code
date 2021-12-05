import React, { useState }from "react";

import Star from "./starComponet";
import "./component.stylsheet.css";

class CallStar extends  React.Component{
    
   
     state = {
       
        colorF: this.props.colorF,
        colorS: this.props.colorS,
        colorT: this.props.colorT
              
        
      }

      
      render() {
        return (
           
    <div>
          <div >
           
            <Star 
              colorFirst={this.state.colorF}
              colorSeconde={this.state.colorS}
              colorThird = {this.state.colorT}
            
            
            
            > </Star>
            
          </div></div>
        );
      }    
}

export default CallStar;