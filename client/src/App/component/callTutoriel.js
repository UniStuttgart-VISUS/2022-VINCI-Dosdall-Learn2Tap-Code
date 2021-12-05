
import React, { useState }from "react";
import Container from "./tutorielClass"

class CallTutoriel extends  React.Component{
    
   
    state = {
        letterArr:this.props.letterArr,
        combinationArr:this.props.combinationArr,  
        letterShow:this.props.letterShow,
        combiShow: this.props.combiShow,
         maxCounter:this.props.maxCounter,
         font: this.props.fontSize,


        
       
     }

     
     render() {
       return (
           
   
         <div className="App">
          
         <Container
              letterArr={this.state.letterArr}
              combinationArr={this.state.combinationArr} 
              letterShow={this.state.letterShow}
              combiShow={ this.state.combiShow}
              maxCounter={this.state.maxCounter}
              fontSize={this.props.font}
             
            
         
         ></Container>
         </div>
       );
     }    
}

export default CallTutoriel;
