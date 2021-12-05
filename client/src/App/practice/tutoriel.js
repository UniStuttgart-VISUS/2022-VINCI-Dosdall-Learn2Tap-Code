import { set } from "js-cookie";
import React,{useState, useEffect, useContext} from "react";
import "./letterMenu.css";
import {clearCookie, sendUserTracking} from '../functions/functions'
import Cookies from 'js-cookie';
import CallTutoriel from "../component/callTutoriel"
import { idContext, combinationContext,symbolsContext, modusContext, unitNameContext } from "../../idContext";


export const AEIOUTutoriel = props => {

  const {value,setValue} =  useContext(idContext);
  const {symbolArr,setSymbolArr} = useContext(symbolsContext);
  const{combinationArray, setCombinationArray} = useContext(combinationContext);
  const{modus, setModus} = useContext(modusContext);
  const{unitName, setUnitName} = useContext(unitNameContext);
  const keyConst = useKeyPress();
  const[seconds, setSeconds]= useState(0);
  const[showTutoriel, setShowTutoriel]= useState(false);
  const[showDialog, setShowDialog] = useState(false);
  const[levelExist, setLevelExist]=useState(0);
  const[typingMode, setTypingMode] = useState('');
  const[fontSize, setFontSize] = useState('100px');
  

   
 
 
  
  function useKeyPress() {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if(showDialog){

      if(key === ' '){
        sendUserTracking(value, 'Keypress Space ', 'Practcie Button','Tutoriel-Dialog'  ); 
        window.location.href=  '/Learn2Tap/Practice';  

      }else if(key === 'r'){
        sendUserTracking(value, 'Keypress - Key r', 'Replay Button', 'Tutoriel-Dialog' ); 
        setSeconds(0);
        setShowDialog(false);
        setShowTutoriel(true);


      }else if(key === 'Backspace'){
        sendUserTracking(value, 'Keypress- Key Backspacce', 'Back Button','Tutoriel-Dialog'  ); 
        if(levelExist === 2){
          window.location.href=  '/Learn2Tap/MenuPracticeUnit';  
        }else{
          window.location.href=  '/Learn2Tap/MenuPracticeUnit3';  
          }
      
    }}}

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
     
        setKeyPressed(false);
          };

      // Add event listeners
      useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        // Remove event listeners on cleanup
        return () => {
          window.removeEventListener("keydown", downHandler);
          window.removeEventListener("keyup", upHandler);
        };
      }, ); // Empty array ensures that effect is only run on mount and unmount
      return keyPressed;
    }
 
  
 
  
  
  useEffect(() => {
    

      const timer = setInterval(() => {
      
        if(seconds === 0){
          setModus(Cookies.get('modusCookie'));
          setUnitName(Cookies.get('unitCookie'));
        var currTypingMode= Cookies.get('typingMode');
        if(currTypingMode === 'switch' ){
          setFontSize('60px');

        }
        if(currTypingMode ==='shift'){
          setFontSize('25px');

        }
        setTypingMode(currTypingMode); 
        setLevelExist(Cookies.get("levelExist")); 
        var cookieCurr = Cookies.get('symbolArrCookie');
       
        setSymbolArr(clearCookie(cookieCurr));
        setCombinationArray(clearCookie(Cookies.get('combinationArrCookie')));}
       
          setSeconds(seconds + 1);
          setShowTutoriel(true);

          if(seconds>= ((symbolArr.length*2) +1) && seconds > 3){
              setShowTutoriel(false);
              setShowDialog(true);


          }
   
      }, 1000);
    // clearing interval
      return () => clearInterval(timer);
    });


  return(
    <div id="returnMenuDiv">
      <div>
   
       
          <div width="100%"  class="row">
             <div  class="col"  >
             <button class="normalButton" type="button" id="menuButtonSingleTap"
                  onClick={() => {
                    sendUserTracking(value, 'button click', 'Menu Button', 'Tutoriel'  );  
                    if(levelExist === 2){
                    window.location.href=  '/Learn2Tap/MenuPracticeUnit';  
                  }else{
                    window.location.href=  '/Learn2Tap/MenuPracticeUnit3';  
                    }
                    
                  }
                  } 
                  >Menu
              </button>
              </div> 
              <div  class="col" id="spaceDivHeader" ></div>
              <div  class="col" id="spaceDivHeader" ></div>
              <div  class="col"id="spaceDivHeader"  ></div>
              <div  class="col" id="spaceDivHeader" ></div>
              <div  class="col"  id="glossaryButtonDiv" >
              <button class="normalButton" type="button" id="glossaryButtonSingleTapMenu"
                  onClick={() => {
                    sendUserTracking(value, 'Button click', 'Glossary Button','Tutoriel'  ); 
                    Cookies.set("lastPage",'/Tutoriel');
                    window.location.href= '/Learn2Tap/Glossary'
                  }
                  } 
                  >Glossary
              </button>
              </div>
              </div>
              <br></br>
          <h3>"{unitName}" - Tutorial</h3>
          <br></br>
          <div class="mainDiv">
            
          <div class = "showLetterTutoriel" id="showLetterTutorielTutoriel"> 
          {showTutoriel && 
         
           <CallTutoriel
                letterArr={symbolArr}
                combinationArr={combinationArray} 
                letterShow={symbolArr[0]}
                combiShow={combinationArray[0]}              
                maxCounter={symbolArr.length}
                font={fontSize}
           ></CallTutoriel>} 
          
          {showDialog &&
          <div>

<button class="normalButton" type="button"  id="dialogButtonGames"
onClick={() => {
  sendUserTracking(value, 'Button click', 'Practice Button', 'Tutoriel' ); 
  window.location.href=  '/Learn2Tap/Practice';  
}
}
>Proceed <br></br>
⬤ ⬤⬤⬤⬤
</button>

<button class="normalButton" type="button"  id="dialogButtonGames"
onClick={() => {
    setSeconds(0);
    setShowDialog(false);
    setShowTutoriel(true);
    sendUserTracking(value, 'Button click', 'Replay Button', 'Tutoriel' ); 
    
 }
}
>Replay <br></br>
○ ⬤⬤⬤⬤
</button>

<button class="normalButton" type="button"  id="dialogButtonGames"
onClick={() => {
  sendUserTracking(value, 'Button click', 'Back Button','Tutoriel' ); 
    
  if(levelExist === 2){
    window.location.href=  '/Learn2Tap/MenuPracticeUnit';  
  }else{
    window.location.href=  '/Learn2Tap/MenuPracticeUnit3';  
    }}
}
>Back <br></br>
○ ⬤⬤⬤○
</button>
           </div> 
          
          
          }
          </div></div>
      </div>
     </div> 
  );
};