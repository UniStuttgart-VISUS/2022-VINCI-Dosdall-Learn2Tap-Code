import { set } from "js-cookie";
import React,{useState, useEffect,useContext} from "react";
import "./letterMenu.css";
import {clearCookie, clearCookieShift, sendUserTracking} from '../functions/functions';
import showCombiLetter from "../functions/functions";
import Cookies from 'js-cookie';
import { idContext, combinationContext,symbolsContext, modusContext, unitNameContext } from "../../idContext";
import TutorielLetter from "../component/tutorielLetter"
import Axios from "axios";

export const AEIOUPractice = props => {

  const {value,setValue} =  useContext(idContext);
  const {symbolArr,setSymbolArr} = useContext(symbolsContext);
  const{combinationArray, setCombinationArray} = useContext(combinationContext);
  const{modus, setModus} = useContext(modusContext);
  const{unitName, setUnitName} = useContext(unitNameContext);
     
  const[initialize,setInitialize] = useState(true);
  const[userTrackinEndSend, setUserTrackingEnd] = useState(true);

     const[showLetter,setShowLetter]=useState(false);
     const[currLetter, setCurrLetter]= useState(symbolArr[0]);
     const[currCombination, setCurrCombination] = useState('');
     const[letterCounter, setLetterCounter] = useState(0);

 
 
    const[colorBlack, setColorBlack] = useState(true);
  
    const keyConst = useKeyPress();
    
    const[dialog, setDialog]= useState(false);
    const[showLetterColor, setShowLetterColor] = useState(false);
    
    const[secRed,setSecRed] = useState(0);
    const[levelExist, setLevelExist]=useState(0);
    const[rounds, setRounds] = useState(0);
   
    const[progress, setProgress] = useState(0);
    const[counter,setCounter] = useState(0);
    const[percent, setPercent]= useState('');
    const[typingMode, setTypingMode] = useState('');
    // key combis for shift and switch mode
    const[keyCombi, setKeyCombi]= useState([]);
    const[allKeyCombi, setAllKeyCombi]= useState([]);
    const[currShiftKeys, setCurrShiftKeys] = useState([]);
    const[fontSizeInUse, setFontSizeInUse] = useState('100px');
     const[readShiftKey, setReadShiftKey] =useState([false]);
     const[allKeyPressed, setAllKeyPressed] = useState([]);
     const[lastKey, setLastKey] =useState("");

    function loadProgressbar(){
      var next = counter + progress;
      if(next> 100){
        next = 100;
      }
      setPercent(next + "%");
      setCounter(counter + progress);
     
      document.getElementById("progressBar").style.width =  percent;
      document.getElementById("percent").innerHTML =  percent;

    }

    function resetProgressbar(){
      setPercent("10%");
      setCounter(10);
      document.getElementById("progressBar").style.width =  "0%";
      document.getElementById("percent").innerHTML = "0%";

    }

    function setLetter(){
     
      
      loadProgressbar();
      var increaseLetterCounter = letterCounter + 1;
      if(increaseLetterCounter === symbolArr.length){
        var incRounds = rounds + 1;
        setRounds(incRounds);
        setLetterCounter(0);
        if(typingMode !== 'singleTap'){
          nextShiftKeyCombi(keyCombi, 0);
        
        }
      }else{
        setLetterCounter(increaseLetterCounter);
        if(typingMode !== 'singleTap'){
          nextShiftKeyCombi(keyCombi, increaseLetterCounter);
        
        }
      }
    
    }

    function nextShiftKeyCombi(combis, currLetterCount){

    
      var shiftKeyCombiCurr = combis[currLetterCount] + ',';
      console.log('D1', shiftKeyCombiCurr);
      
         
      if(shiftKeyCombiCurr === ',,'){
        setCurrShiftKeys(',');
        setReadShiftKey([false]);
      }else if(shiftKeyCombiCurr == ';,'){

        setCurrShiftKeys(';');
        setReadShiftKey([false]);
      }
     else{
      var singleShiftKeys = [];
      var shiftKeysPressed = [];
      var currKeyI = "";
      for(var i = 0; i < shiftKeyCombiCurr.length; i++){
        var currSym = shiftKeyCombiCurr[i];
     
          if(currSym !== ' ' && currSym !==','){
            currKeyI = currKeyI + currSym;
           
          }else{
            singleShiftKeys.push(currKeyI);
            currKeyI = '';
            shiftKeysPressed.push(false);
          }
        

      }

      console.log('WO', singleShiftKeys ,singleShiftKeys.indexOf('Backspace'), shiftKeysPressed);
      
      setCurrShiftKeys(singleShiftKeys);
      setReadShiftKey(shiftKeysPressed);
     }
    }

    function createShiftObject(keyPressed){
      

      var res = readShiftKey;
      var currSingleKeys = currShiftKeys;
    
     
      if(currSingleKeys.indexOf(keyPressed) !== -1){
     //   sendUserTracking(value, 'Succes Key Press'+ keyPressed, typingMode +'-TypingMode','Practice'  ); 
        var currIndex = parseInt(currSingleKeys.indexOf(keyPressed));
        
        res[currIndex ] = true;
        if(typingMode === 'tripleTap'){
          if( keyPressed ==='Backspace'){
          currIndex = parseInt(currSingleKeys.lastIndexOf(keyPressed));
          res[currIndex ] = true;
        }else if( keyPressed ==='Shift'){
          currIndex = parseInt(currSingleKeys.lastIndexOf(keyPressed));
          res[currIndex ] = true;
        }
      
      }
        setReadShiftKey(res);
      }else{
        for(var i = 0; i< res.length; i++){
          res[i] = false;
        }
     //   sendUserTracking(value, 'False Key Press'+ keyPressed, typingMode +'-TypingMode','Practice'  ); 
          setColorBlack(false);
       
        setReadShiftKey(res);
      }




    }
    function useKeyPress() {
      // State for keeping track of whether key is pressed
      const [keyPressed, setKeyPressed] = useState(false);
      // If pressed key is our target key then set to true
      function downHandler({ key }) {
        console.log('KEYS', key);
        setLastKey(key);
        var currKeys = allKeyPressed;
        currKeys.push(key);
        setAllKeyPressed(currKeys);
       
      if(typingMode !== 'singleTap'){
        createShiftObject(key);
      }else
        
        if (symbolArr.indexOf(key) !==  -1 && typingMode ==='singleTap') {
          
          setKeyPressed(true);
         
        if(symbolArr[letterCounter]=== key){
         // sendUserTracking(value, 'Succes Key Press: '+ key, typingMode +'-TypingMode','Practice'  ); 
          setLetter();
          console.log('CHECK 3');
        
        }else if(symbolArr.indexOf('Space') === (letterCounter)){
         
          console.log('CHECK 4');
          setLetter();

           }else{
          //  sendUserTracking(value, 'False Key Press: '+ key +' Actual Key ' + symbolArr[letterCounter] , typingMode +'-TypingMode','Practice'  ); 
            setColorBlack(false);
           }
        }
        else {
          if(!dialog){
           // sendUserTracking(value, 'False Key Press: '+ key +' Actual Key ' + symbolArr[letterCounter] , typingMode +'-TypingMode','Practice'  ); 
         
          setColorBlack(false);}
       
          }
       if(dialog){

        if(key === ' '){
          Cookies.set("level", '1'); 
          window.location.href=  '/Learn2Tap/Level';
  
        }else if(key === 'r'){
          sendUserTracking(value, 'Keypress - Key r', 'Replay Button', 'Practice-Dialog' ); 
          setRounds(0);
          setDialog(false);
          
          resetProgressbar();
  
  
        }else if(key === 'Backspace'){
          sendUserTracking(value, 'Keypress - Key Backspace', 'Exit Button', 'Practice-Dialog' ); 
          if(levelExist === 2){
            window.location.href=  '/Learn2Tap/MenuPracticeUnit';  
          }else{
            window.location.href=  '/Learn2Tap/MenuPracticeUnit3';  
            }
        
      }}
      }

      // If released key is our target key then set to false
      const upHandler = ({ key }) => {
        if (symbolArr.indexOf(key) !== -1) {
          setKeyPressed(false);
        }
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

         
          if(initialize){
           setLevelExist(Cookies.get("levelExist")); 
           var symbolIds = clearCookie(Cookies.get('symbolIDsArray'));
           var hand = Cookies.get('Hand');
           var rightHand = true;
           console.log('HAND', rightHand);
  
            if(hand == 'left'){
              console.log('inside Hand');
              rightHand = false;
            }


          
         
            setModus(Cookies.get('modusCookie'));
            setUnitName(Cookies.get('unitCookie'));
            var currUn = Cookies.get('unitCookie');
            var len  = clearCookie(Cookies.get('symbolArrCookie'));
            var calProgress = Math.round(100/(((len.length)*2)));

            var currTypingMode =  Cookies.get('typingMode');
            setTypingMode(currTypingMode);
            if(currTypingMode ==='singleTap'){
              setSymbolArr(clearCookie(Cookies.get('symbolArrCookie')));
              setCombinationArray(clearCookie(Cookies.get('combinationArrCookie')));
            setInitialize(false);
            }else     if(currTypingMode ==='doubleTap'){
              
              Axios.get(`http://localhost:3001/getSymbolArrayDoubleTap/${symbolIds}/${rightHand}/${value}`,).then((response)=>{
     
                setSymbolArr(response.data[0]);
                setCombinationArray(response.data[1]);
                setKeyCombi(response.data[4]);
                var currDT = response.data[4];
                nextShiftKeyCombi(currDT, 0);
                setInitialize(false);
          
         })}else if(currTypingMode ==='tripleTap'){
          Axios.get(`http://localhost:3001/getSymbolArrayTripleTap/${symbolIds}/${rightHand}/${value}`,).then((response)=>{
            setSymbolArr(response.data[0]);
            setCombinationArray(response.data[1]);
            setKeyCombi(response.data[4]);
            var currTT = response.data[4];
            nextShiftKeyCombi(currTT, 0);
            setInitialize(false);





          })


         }else  if(currTypingMode ==='shift'){
                          setFontSizeInUse('25px');
            Axios.get(`http://localhost:3001/getSymbolArrayShift/${symbolIds}/${rightHand}/${value}`,).then((response)=>{
              setSymbolArr(response.data[0]);
              setCombinationArray(response.data[1]);
              setKeyCombi(response.data[4]);
              var currShift = response.data[4];
              nextShiftKeyCombi(currShift, 0);
              setInitialize(false);

              
          })
          
                }else if(currTypingMode === 'switch'){
              setFontSizeInUse('60px');
              Axios.get(`http://localhost:3001/getSymbolArraySwitch/${symbolIds}/${rightHand}/${value}`,).then((response)=>{

                setSymbolArr(response.data[0]);
                setCombinationArray(response.data[1]);
                setKeyCombi(response.data[4]);
                var currSwitch = response.data[4];
                nextShiftKeyCombi(currSwitch, 0);
                setInitialize(false);
  
                
            })
            }    
            
            setProgress(calProgress);
            setCounter(calProgress);
            setPercent(calProgress + "%");
            if(currTypingMode !== 'shift'){
            setShowLetter(true);
            }
           
     
          }
         
          if(secRed >= 3){
            setSecRed(0);
            setColorBlack(true);
          } 
          if(rounds === 2){
              setShowLetter(false);
              setShowLetterColor(false);
              setDialog(true);
              if(userTrackinEndSend){
              sendUserTracking(value,'All Key Pressed','Pressed:'+ allKeyPressed , 'Finish Practice - ' +unitName +'');
            setUserTrackingEnd(false);}
          }
        
         console.log('D2', readShiftKey);
          if(readShiftKey.includes(false) === false){
            console.log('CHECK 1');
            setLetter();
          
          }
           
         setCurrLetter(symbolArr[letterCounter]);
        setCurrCombination(combinationArray[letterCounter]);
   
            if(colorBlack  && rounds !== 2){
              setShowLetter(true);
              setShowLetterColor(false);
            
            }else if(rounds !== 2){
               
              setSecRed(secRed + 1);
              

              setShowLetter(false);
              setShowLetterColor(true);
            }

            
  
            
     
        }, 100);
      // clearing interval
        return () => clearInterval(timer);
      });


   
    return(
      <div id="returnMenuDiv">
        
        <div >
                 
          <div width="100%"  class="row">
             <div  class="col"  >
             <button class="normalButton" type="button" id="menuButtonSingleTap"
                  onClick={() => {
                    sendUserTracking(value, 'button click', 'Menu Button', 'Practice');  
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
                    sendUserTracking(value, 'Button click', 'Glossary Button','Practice'); 
                    Cookies.set("lastPage",'/Practice');
                    window.location.href= '/Learn2Tap/Glossary'
                  }
                  } 
                  >Glossary
              </button>
              </div>
              </div>
              <br></br>
            <h2>{unitName} - Practice</h2>
            {showLetter && <div id="last">Last Tapped Combination: {lastKey}</div>}
            {showLetterColor && <div id="last">Last Tapped Combination: {lastKey}</div>}
            <div class="mainDiv" id="practiceMainDiv">
                
            
               

          <div class="bar" id="practiceBar">
            <div class="container">
                <h3 id="percent">0%</h3>
                <div class="progress">
                    <div id="progressBar" class="progress-bar" style={{width:"0%"}}></div>
                </div>
            </div>
            </div>
            <div class = "showLetterTutoriel" id="showLetterDiv">
              {showLetter  &&
              <div id="practiceDiv"style={{color:'black'}}> 
                <TutorielLetter fontSize = {fontSizeInUse} letter={currLetter}  combination={currCombination}></TutorielLetter>
  </div>}
               


                {showLetterColor  &&
              <div id="practiceDiv" style={{color:'red'}}> 
                
                <TutorielLetter fontSize = {fontSizeInUse} letter={currLetter}  combination={currCombination}></TutorielLetter> </div> }
           

                {dialog && <div>

                  <button class="normalButton" type="button"  id="dialogButtonGames"
          onClick={() => {
            Cookies.set("level", '1'); 
            sendUserTracking(value, 'Button click', 'Proceed Button','Tutoriel-Dialog'  ); 
            window.location.href=  '/Learn2Tap/Level';}
          }
          >Proceed <br></br>
          ⬤ ⬤⬤⬤⬤
        </button>
        
        <button class="normalButton" type="button"  id="dialogButtonGames"
          onClick={() => {
            sendUserTracking(value, 'Button click', 'Replay Button','Tutoriel-Dialog'  ); 
            setRounds(0);
            setDialog(false);
            
            resetProgressbar();
            
            
      
              
             
           }
          }
          >Replay <br></br>
          ○ ⬤⬤⬤⬤
        </button>
   
        <button class="normalButton" type="button"  id="dialogButtonGames" 
          onClick={() => {
            sendUserTracking(value, 'Button click', 'Back Button','Tutoriel-DIalog'  ); 
            if(levelExist === 2){
              window.location.href=  '/Learn2Tap/MenuPracticeUnit';  
            }else{
              window.location.href=  '/Learn2Tap/MenuPracticeUnit3';  
              }
          }}
          >Back <br></br>
          ○ ⬤⬤⬤○
        </button>
                     </div>  }



            </div>
           
            </div>
            
            
        </div></div>
    );
};
