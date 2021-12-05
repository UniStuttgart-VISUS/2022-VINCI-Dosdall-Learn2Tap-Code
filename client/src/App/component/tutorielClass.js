import React from 'react';
import ReactDOM from 'react-dom';
//import ".\./practice/letters/letterMenu"
import TutorielLetter from "./tutorielLetter";


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        
      letterArr:this.props.letterArr,
      combinationArr:this.props.combinationArr,    
      letterShow:this.props.letterShow,
      combiShow: this.props.combiShow ,
      counter: 0,
      maxCounter: this.props.maxCounter,
      round: 0,
      showLetter: true,
     destroyIntervall: false,
     fontSize: this.props.fontSize,

    
    };}
    componentDidMount() {
       
       
      var timerTu = setInterval(() => {
            console.log("Timer is running");
            if(this.state.round == 2 && this.state.counter == 0){
                this.setState({ showLetter:false, destroyIntervall:true
          })
    
            }

            
            this.setState({letterShow: this.state.letterArr[this.state.counter],
                             combiShow: this.state.combinationArr[this.state.counter],
                             counter: this.state.counter +1   });
            
            if(this.state.counter === this.state.maxCounter){
                this.setState({round: this.state.round +1,
                    counter: 0});
               
            }

      
            if(this.state.destroyIntervall){
                clearInterval(timerTu);
            }
          
        }, 1000)

       

  }
 
  render() {
    
    return (
      <div>
     {this.state.showLetter && <TutorielLetter fontSize = {this.state.fontSize} letter={this.state.letterShow}  combination={this.state.combiShow}></TutorielLetter>}
  
      
      </div>
    );
  }
}



export default Container;