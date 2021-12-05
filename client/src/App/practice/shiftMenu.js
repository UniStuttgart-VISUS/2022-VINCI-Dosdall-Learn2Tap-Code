import React,{ useState, useEffect,  useContext} from "react";
import '.\./menu.stylsheet.css';
import Axios from "axios";
import star from "../icons/star.svg"; 
import Cookies from 'js-cookie';
import {getSingleTabStars, getSymbolArraySingleTab, sendUserTracking} from "../functions/functions";
import { idContext, combinationContext,symbolsContext, modusContext, unitNameContext } from "../../idContext";


export const ShiftMenu = props => {
  const {value,setValue} =  useContext(idContext);
  const {symbolArr,setSymbolArr} = useContext(symbolsContext);
  const{combinationArray, setCombinationArray} = useContext(combinationContext);
  const{modus, setModus} = useContext(modusContext);
  const{unitName, setUnitName} = useContext(unitNameContext);
  const[pointsTotal, setPointsTotal] = useState(0);
  const[starsTotalArr, setStarsTotalArr] = useState([]);
  const[levelDescription, setLevelDescription] = useState([]);
  const[levelName, setLevelName] = useState([]);
  const[rightHand, setRightHand] = useState(true);
  const[combinationSwitchModus, setCombinationSwitchModus] = useState('⬤ ⬤⬤○○');
  const[showMenu, setShowMenu] = useState(false);
  
  
  function getLevelValues(symbolIds, rightHand, currModus, currUnit, unitID, firstUrl){
 
    setUnitName(currUnit);
    setModus(currModus);
    Cookies.set("modusCookie",currModus);
    Cookies.set("unitCookie", currUnit);
    Cookies.set('unitID', unitID);
    Cookies.set('symbolID', symbolIds);
    
    var symbols =[];
    var combination  =[];  
    var allSymbols =[];
    var allCombination  =[]; 
    var allShiftKeyCombi = [];
    var shiftKeyCombi = [];
   
    Axios.get(`http://localhost:3001/getSymbolArrayShift/${symbolIds}/${rightHand}/${value}`,).then((response)=>{
     
      symbols = response.data[0];
       combination =response.data[1];
       allSymbols = response.data[2];
       allCombination =response.data[3];
       shiftKeyCombi = response.data[4];
       allShiftKeyCombi = response.data[5];

      console.log('RESULT Shift', symbols, combination, allSymbols, allCombination, shiftKeyCombi, allShiftKeyCombi);
      
       Cookies.set("allSymbolArrCookie",allSymbols);
       Cookies.set("allCombinationArrCookie",allCombination);
       Cookies.set('shiftKeyCombi', shiftKeyCombi);
       Cookies.set('allShiftKeyCombi', allShiftKeyCombi);
  
      setSymbolArr(symbols);
      setCombinationArray(combination);
      Cookies.set("symbolArrCookie",symbols);
      Cookies.set("combinationArrCookie",combination);

    
  if(firstUrl){
    Cookies.set("levelExist",2); 
    window.location.href= '/Learn2Tap/MenuPracticeUnit';

  }else{
    Cookies.set("levelExist",3); 

    window.location.href= '/Learn2Tap/MenuPracticeUnit3';

  } 
      })

      
  
   }   
    
    useEffect(() => {
      var hand = Cookies.get('Hand');
  
    if(hand == 'left'){
      
      setCombinationSwitchModus('○○⬤⬤ ⬤');
      setRightHand(false);
    }
    setValue(Cookies.get('userID'));
    Cookies.set('typingMode', 'shift');
    const userID = value;
    sendUserTracking(value, 'link click', 'shift', 'menu' ); 
  
      Axios.get(`http://localhost:3001/getShiftMenu`,).then((response)=>{
        
       setLevelDescription(response.data[0]);
       
       setLevelName(response.data[1]);
       
        
        });
      
  
      Axios.get(`http://localhost:3001/getShiftStar/${userID}`,).then((response)=>{
        var starsTotal =response.data[1];
        setPointsTotal(starsTotal);
        const starArray =response.data[2];
        setStarsTotalArr(starArray);
        setShowMenu(true);
        })
      },[]);
    
  
      return(
        <div id="returnMenuDiv">
        {showMenu &&
        <div>
          
            <div width="100%"  class="row">
             <div  class="col"  >
             <button class="normalButton" type="button" id="menuButtonSingleTap"
                  onClick={() => {
                    sendUserTracking(value, 'button click', 'Menu Button', 'Shift Menu' );  
                    window.location.href=  '/Learn2Tap';   
                  }
                  } 
                  >Menu
              </button>
              </div> 
              <div  class="col" id="spaceDivHeader" ></div>
              <div  class="col" id="spaceDivHeader" ></div>
              <div  class="col" id="spaceDivHeader" ></div>
              <div  class="col" id="spaceDivHeader" ></div>
              <div  class="col" id="glossaryButtonDiv" >
              <button class="normalButton" type="button" id="glossaryButtonSingleTapMenu"
                  onClick={() => {
                    sendUserTracking(value, 'Button click', 'Glossary Button', 'Shift Menu' ); 
                    Cookies.set("lastPage",'/ShiftMenu');
                    window.location.href= '/Learn2Tap/Glossary';}
                  } 
                  >Glossary
              </button>
              </div>
              </div>
              <div class="menuDiv">
              <div class="pointDiv" class="row">
              <h5>{pointsTotal}/69</h5>  <img src={star} width="60px" height="60px" alt="star" />
            </div>
              <h2>SHIFT</h2>
              <div class="alert" id="alertShift">
        
        <strong>Info!</strong>  1× {combinationSwitchModus} TapStrap is in Shift mode for a following input. <br></br>
2× {combinationSwitchModus} TapStarp is permanently in Shift mode --> Tap  {combinationSwitchModus} again to exit the Shift mode.

      </div>
      <div class="alert alert-warning"  id="alertShift">
        
        <strong>Warning!</strong>  
          Disable the shortcut function for your browser to practice shift mode without problems.
      </div>
              <div class="menuButtons">
              <button class="normalButton" id="practicButtonMenuShift" type="button" 
            onClick={() => {
              sendUserTracking(value, 'Button click', levelName[0] + 'Button', 'Shift Menu' ); 
              Cookies.set('symbolIDsArray', [1,2,3,4,5]);
              getLevelValues([1,2,3,4,5], rightHand, levelDescription[0],levelName[0], 1 , true);
             
             
  
            }}
            >
              <div class="row">
                <div class="col">
              <b>{levelName[0]} </b>  
            <br></br> {levelDescription[0]}
            </div>
            <div class="row"> 
            
            {starsTotalArr[0]}/6 
           
            <img src={star} width="60px" height="100px" alt="star" />
              
             
              
           
            </div>
            </div>
          </button>
          <br></br>
          <button class="normalButton" id="practicButtonMenuShift" type="button" 
            onClick={() => {  
              sendUserTracking(value, 'Button click', levelName[1] + 'Button', 'Shift Menu' ); 
              Cookies.set('symbolIDsArray',[6,7,8,9]);
            
              getLevelValues([6,7,8,9], rightHand, levelDescription[1],levelName[1], 2, false );
            
  
              }
            }
            >
              <div class="row">
                <div class="col">
              <b>{levelName[1]} </b>  
            <br></br> {levelDescription[1]}
            </div>
            <div class="row"> 
            
            {starsTotalArr[1]}/9
           
            <img src={star} width="60px" height="100px" alt="star" />
              
             
              
           
            </div>
            </div>
          </button>
          <br></br>
          <button class="normalButton" id="practicButtonMenuShift" type="button" 
            onClick={() => {
              sendUserTracking(value, 'Button click', levelName[2] + 'Button', 'Shift Menu' ); 
              Cookies.set('symbolIDsArray',[10,11]);
              getLevelValues([10,11], rightHand, levelDescription[2],levelName[2], 3 , false);
            
             
  
              
              }
            }
            >
              <div class="row">
                <div class="col">
              <b>{levelName[2]} </b>  
            <br></br> {levelDescription[2]}
            </div>
            <div class="row"> 
            
            {starsTotalArr[2]}/9
           
            <img src={star} width="60px" height="100px" alt="star" />
              
             
              
           
            </div>
            </div>
          </button>
          <br></br>
          <button class="normalButton" id="practicButtonMenuShift" type="button" 
            onClick={() => {
              sendUserTracking(value, 'Button click', levelName[3] + 'Button', 'Shift Menu' ); 
              Cookies.set('symbolIDsArray',[13,14]);
              getLevelValues([13,14], rightHand, levelDescription[3],levelName[3], 4 , false);
            
             
  
              }
  
              
            }
            >
              <div class="row">
                <div class="col">
              <b>{levelName[3]} </b>  
            <br></br> {levelDescription[3]}
            </div>
            <div class="row"> 
            
            {starsTotalArr[3]}/9
           
            <img src={star} width="60px" height="100px" alt="star" />
              
             
              
           
            </div>
            </div>
          </button>
          <br></br>
          <button class="normalButton" id="practicButtonMenuShift" type="button" 
            onClick={() => {
  
              sendUserTracking(value, 'Button click', levelName[4] + 'Button', 'Shift Menu' ); 
              Cookies.set('symbolIDsArray',[15]);
              getLevelValues([15], rightHand, levelDescription[4],levelName[4], 5 , false);
              
              }
            }
            >
              <div class="row">
                <div class="col">
              <b>{levelName[4]} </b>  
            <br></br> {levelDescription[4]}
            </div>
            <div class="row"> 
            
            {starsTotalArr[4]}/9
           
            <img src={star} width="60px" height="100px" alt="star" />
              
             
              
           
            </div>
            </div>
          </button>
          <br></br>
          <button class="normalButton" id="practicButtonMenuShift" type="button" 
            onClick={() => {
              sendUserTracking(value, 'Button click', levelName[5] + 'Button', 'Shift Menu' ); 
              Cookies.set('symbolIDsArray',[17,18,19,21]);
              getLevelValues([17,18,19,21], rightHand, levelDescription[5],levelName[5], 6 , false);
             
             }
  
            }
            >
              <div class="row">
                <div class="col">
              <b>{levelName[5]} </b>  
            <br></br> {levelDescription[5]}
            </div>
            <div class="row"> 
            
            {starsTotalArr[5]}/9
           
            <img src={star} width="60px" height="100px" alt="star" />
              
             
              
           
            </div>
            </div>
          </button>
          <br></br>
          <button class="normalButton" id="practicButtonMenuShift" type="button" 
            onClick={() => {
              sendUserTracking(value, 'Button click', levelName[6] + 'Button', 'Shift Menu' ); 
              Cookies.set('symbolIDsArray',[22,23]);
              getLevelValues([22,23], rightHand, levelDescription[6],levelName[6], 7, false );
            
              }
  
              
            }
            >
              <div class="row">
                <div class="col">
              <b>{levelName[6]} </b>  
            <br></br> {levelDescription[6]}
            </div>
            <div class="row"> 
            
            {starsTotalArr[6]}/9
           
            <img src={star} width="60px" height="100px" alt="star" />
              
             
              
           
            </div>
            </div>
          </button>
          <br></br>
          <button class="normalButton" id="practicButtonMenuShift" type="button" 
            onClick={() => {
              sendUserTracking(value, 'Button click', levelName[7] + 'Button', 'Shift Menu' ); 
              Cookies.set('symbolIDsArray',[24,26,27]);
              getLevelValues([24,26,27], rightHand, levelDescription[7],levelName[7], 8, false );
              
             }
  
              
            }
            >
              <div class="row">
                <div class="col">
              <b>{levelName[7]} </b>  
            <br></br> {levelDescription[7]}
            </div>
            <div class="row"> 
            
            {starsTotalArr[7]}/9
           
            <img src={star} width="60px" height="100px" alt="star" />
              
             
              
           
            </div>
            </div>
          </button>
          <br></br>

          </div>
              </div>
          </div>}</div>
      );
  };
     