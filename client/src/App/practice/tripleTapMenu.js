import React,{ useState, useEffect,  useContext} from "react";
import '.\./menu.stylsheet.css';
import Axios from "axios";
import star from "../icons/star.svg"; 
import Cookies from 'js-cookie';
import {getSingleTabStars, getSymbolArraySingleTab, sendUserTracking} from "../functions/functions";
import { idContext, combinationContext,symbolsContext, modusContext, unitNameContext } from "../../idContext";


export const TripleTapMenu = props => {
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
    var keyCombi = [];
   var allKeyCombi = [];
   
    Axios.get(`http://localhost:3001/getSymbolArrayTripleTap/${symbolIds}/${rightHand}/${value}`,).then((response)=>{
     
       symbols = response.data[0];
       combination =response.data[1];
       allSymbols = response.data[2];
       allCombination =response.data[3];
       keyCombi = response.data[4];
       allKeyCombi = response.data[5];
       Cookies.set("allSymbolArrCookie",allSymbols);
       Cookies.set("allCombinationArrCookie",allCombination);
  
      setSymbolArr(symbols);
      setCombinationArray(combination);
      Cookies.set("symbolArrCookie",symbols);
      Cookies.set("combinationArrCookie",combination);

      Axios.get(`http://localhost:3001/getTripleTapStatistic/${value}/${symbolIds}`,).then((response)=>{
    
      var statArr =response.data[0];
      Cookies.set('statistic', statArr);
      console.log('single', statArr);
      
      
     
  })
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
  
    if(hand === 'left'){
     
      setRightHand(false);
    }
    setValue(Cookies.get('userID'));
    Cookies.set('typingMode', 'tripleTap');
    const userID = value;
    sendUserTracking(value, 'link click', 'triple Tap', 'menu' ); 
  
      Axios.get(`http://localhost:3001/getTripleTabMenu`,).then((response)=>{
        
       setLevelDescription(response.data[0]);
       setLevelName(response.data[1]);
       
        
        });
      
  
      Axios.get(`http://localhost:3001/getTripleTapStar/${userID}`,).then((response)=>{
       
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
        <div>
          
            <div width="100%"  class="row">
             <div  class="col"  >
             <button class="normalButton" type="button" id="menuButtonSingleTap"
                  onClick={() => {
                    sendUserTracking(value, 'button click', 'Menu Button', 'Triple Tap Menu' );  
                    window.location.href=  '/Learn2Tap'; 
                    
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
                    sendUserTracking(value, 'Button click', 'Glossary Button', 'Triple Tap Menu' ); 
                    Cookies.set("lastPage",'/TripleTapMenu');
                    window.location.href= '/Learn2Tap/Glossary'
                  }
                  } 
                  >Glossary
              </button>
              </div>
              </div>
              <div class="menuDiv">
              <div class="pointDiv" class="row">
              <h5>{pointsTotal}/33</h5>  <img src={star} width="60px" height="60px" alt="star" />
            </div>
              <h2>TRIPLE TAP</h2>
              <div class="menuButtons">
              <button class="normalButton" id="practicButtonMenuTT" type="button" 
                  onClick={() => {
                     sendUserTracking(value, 'Button click',  'Unit 1 Button', 'Triple Tap Menu' ); 
                          getLevelValues([5,7,8], rightHand,  'Unit 1' ,levelName[0], 1, true );
                          Cookies.set('symbolIDsArray', [5,7,8])
                         
                        }
        
                  }
            >
              <div class="row">
                <div class="col">
              <b>{levelName[0]} </b>  
            <br></br> Unit 1
            </div>
            <div class="row"> 
            
            {starsTotalArr[0]}/6 
           
            <img src={star} width="60px" height="100px" alt="star" />
              
             
              
           
            </div>
            </div>
          </button>
          <br></br>
          <button class="normalButton" id="practicButtonMenuTT" type="button" 
            onClick={() => {
              sendUserTracking(value, 'Button click',  'Unit 2 Button', 'Triple Tap Menu' ); 
              getLevelValues([10,11,13,14], rightHand,  'Unit 2',levelName[1], 2 , false);
              Cookies.set('symbolIDsArray', [10,11,13,14])
            }
              
            
            }
            >
              <div class="row">
                <div class="col">
              <b>{levelName[1]} </b>  
            <br></br> Unit 2
            </div>
            <div class="row"> 
            
            {starsTotalArr[1]}/9
           
            <img src={star} width="60px" height="100px" alt="star" />
              
             
              
           
            </div>
            </div>
          </button>
          <br></br>
          <button class="normalButton" id="practicButtonMenuTT" type="button" 
            onClick={() => {
              sendUserTracking(value, 'Button click',  'Unit 3 Button', 'Triple Tap Menu' ); 
              getLevelValues([15,18,19,21], rightHand, 'Unit 3',levelName[2], 3 , false);
              Cookies.set('symbolIDsArray', [15,18,19,21])
              }
            
            }
            >
              <div class="row">
                <div class="col">
              <b>{levelName[2]} </b>  
            <br></br> Unit 3
            </div>
            <div class="row"> 
            
            {starsTotalArr[2]}/9
           
            <img src={star} width="60px" height="100px" alt="star" />
              
             
              
           
            </div>
            </div>
          </button>
          <br></br>
          <button class="normalButton" id="practicButtonMenuTT" type="button" 
            onClick={() => {
              sendUserTracking(value, 'Button click',  'Unit 4 Button', 'Triple Tap Menu' ); 
              getLevelValues([22,23,26,27], rightHand, 'Unit 4',levelName[3], 4 , false);
              Cookies.set('symbolIDsArray', [22,23,26,27]);
             }
            }
            >
              <div class="row">
                <div class="col">
              <b>{levelName[3]} </b>  
            <br></br> Unit 4
            </div>
            <div class="row"> 
            
            {starsTotalArr[3]}/9
           
            <img src={star} width="60px" height="100px" alt="star" />
              
             
              
           
            </div>
            </div>
          </button>
          
          <br></br>
        

          </div>
              </div>
          </div></div>}</div>
      );
  };
     