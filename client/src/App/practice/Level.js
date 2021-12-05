import { set } from "js-cookie";
import {addStatisticToDatabase, clearCookie, clearCookieShift, sendUserTracking} from "../functions/functions"
import CallBarchart from "../component/callBarchart"; 
import CallStar from "../component/callStar"; 
import React,{useState, useEffect, useContext, useRef} from "react";
import "./level.css";
import { idContext, symbolsContext, modusContext, unitNameContext } from "../../idContext";
import Cookies from 'js-cookie';
import Axios from "axios";


export const AEIOULevel1 = props => {
  
    const[initializeLevle, setInitializeLevel]= useState(true);
    //positionBubble Y-Value
    const[positionBubble, setPositionBubble] = useState("-10%");
    const[positionBubbleInt, setPositionBubbleInt]= useState(10);
    const[positionBubbleX, setPositionBubbleX] = useState("50%");
    const[positionXstring, setPositionXSTring] = useState( "50%");
   
   
    const[showHelp, setShowHelp] = useState(false);
    const[showCombinationHelp, setShowCombinationHelp] = useState('');
    const[showHelpCounter, setShowHelpCounter] = useState(0);
    const {value,setValue} =  useContext(idContext);
    const {symbolArr,setSymbolArr} = useContext(symbolsContext);
  
    const [allSymbolArr,setAllSymbolArr] = useState([]);
    const [allCombinationArray, setAllCombinationArray] = useState([]);
    const [symbolsToUse, setSymbolsToUse]= useState([]);
    const [combinsationToUse, setCombinationToUse] = useState([]);
    const{modus, setModus} = useContext(modusContext);
    const{unitName, setUnitName} = useContext(unitNameContext);
const[showPause, setShowPause] =useState(false);

    const[letterBubble, setLetterBubble]= useState(symbolArr[0]);
 
    var colorBubble =['lime', 'fuchsia', 'aqua', 'yellow', 'orange'] ;
    const[color, setColor] = useState("antiquewhite");
    //Contains the order in which letters are shown.
    const [orderLetter, setOrderLetter] = useState([]);
    
    const[letterCounter, setLetterCounter] = useState(0);
    const[arrayTimesLetterAp, setArrayTimesLetterAp]= useState([]);
    const[arrayTimesLetterHit, setArrayTimesLetterHit] = useState([]);
    const[arrWrongLetterHit, setArrWrongLetterHit] = useState([]);
    
    const[arrWrongLetterHitAll, setArrWrongLetterHitAll] = useState([]);
    const[arrayTimesLetterApAll, setArrayTimesLetterApAll]= useState([]);
    const[arrayTimesLetterHitAll, setArrayTimesLetterHitAll] = useState([]);
  
    const buttonResume = useRef()
    const[statisticArr, setStatisticArr] = useState([]);

    const[intervallCounter, setIntervallCounter] = useState(0);
    const[intervallCountdownCounter, setIntervallCountdownCounter] = useState(0);
    const[speed, setSpeed] = useState(0.5)
    const[unitID, setUnitID] = useState(0);
    const[endUrl, setEndUrl] = useState('');
      const[showenKeys, setShowenKey] = useState([]);
      const[allPressedKeys, setALlPressedKeys] = useState([]);
      const[arrayLettersInBuble, setArrayLetterInBubble] = useState([]);
      const[startTS, setStartTS]= useState(0);
      const[typingsSpeedArr, setTypingSpeedArr] = useState([]);
    
  
    

    //Possible valid key entries.
    const keyConst = useKeyPress();
    
    
    //show dialog at the end
    const[dialog, setDialog]= useState(false);
    const[dialog2, setDialog2]= useState(false);
    const[pauseDialog, setPauseDialog] = useState(false);
    const[statiscticIsCalculated, setStatiscticIsCalculated] = useState(false);

    const[showBubble, setShowBubble] = useState(true);
    const[fallingBubble, setFallingBubble] = useState(false);
    const[countdown, setCountDown] = useState(true);
    const[countDownNum, setCountDownNum] = useState(3);
    // States: Countdown - Play - Pause 
    const[state, setState] = useState("countdown");    
    const[intPercentProgressbar,setIntPercentProgressbar] = useState(4);
    const[percentProgressbar, setPercent]= useState("4%")
    //total number how many letter already have been showed
    const[numLetterShow, setNumLetterShow]= useState(0);
    //number how many letters have been shown in one round 
    const[lettersShowenRound, setLettersShowenRound] = useState(1);
    const[colStarOne, setColStarOne] = useState('grey');
    const[colStarTwo, setColStarTwo] = useState('grey');
    const[colStarThree, setColStarThree] = useState('grey');
    const[allLetterInUse, setAllLetterInUse] = useState(true);
    const[level,setLevel] = useState(Cookies.get('level'));
    const[levelExist,setLevelExist] = useState(Cookies.get('levelExist'));
    const[typingMode, setTypingMode] = useState('');

        // key combis for shift and switch mode
  const[keyCombi, setKeyCombi]= useState([]);
  const[allKeyCombi, setAllKeyCombi]= useState([]);
  const[currShiftKeys, setCurrShiftKeys] = useState([]);
  const[numKeypressed, setNumKeyPressed] = useState(0);
  const[allKeyPressed, setAllKeyPressed] = useState('');
  const[lastKey, setLastKey] =useState("");

 
  const[readShiftKey, setReadShiftKey] =useState([false]);



    function loadProgressbar(){

      var next = intPercentProgressbar + 4;
      setPercent(next + "%");
      setIntPercentProgressbar(intPercentProgressbar + 4);
      document.getElementById("progressBar").style.width =  percentProgressbar;
      document.getElementById("percent").innerHTML =  percentProgressbar;

    }

   

    //Calculates Statistic at the end of a level
    function calculateStatistic(){  
  
      var statitisc = new Array((symbolArr.length)).fill(0);
      var total = 0;
        for(let i = 0; i < statitisc.length; i++){
       if(arrayTimesLetterAp[i]> 0){
        statitisc[i] = (arrayTimesLetterHit[i]/(arrayTimesLetterAp[i]+ arrWrongLetterHit[i])) *100;
      }else{
        statitisc[i]= 0;
      }
        total = total + statitisc[i];
      }

      setStatisticArr(statitisc);
      total = total/statitisc.length
      var starsReceived = 0;
      var identity = 'U'+ unitID + '_L'+level;
      
      if(total >= 55){
        setColStarOne('gold');
        starsReceived = 1;
       }
       if(total >= 70){
        setColStarTwo('gold');
        starsReceived = 2;
      }
      if(total >= 85){
        setColStarThree('gold');
        starsReceived = 3;
      }

  
         
      var statitiscAll = new Array((allSymbolArr.length)).fill(0);
  
      for(let i = 0; i < statitiscAll.length; i++){
        if(arrayTimesLetterApAll[i]>0){
          var currResStat = (arrayTimesLetterHitAll[i]/(arrayTimesLetterApAll[i]+ arrWrongLetterHitAll[i])) *100;
       
        statitiscAll[i] = currResStat;
       
      }else{
        statitiscAll[i]= 0;
      }}
      //sendUserTracking(value, 'Finished Game: '+ symbolArr + ' - '+ allSymbolArr , 'StatisticALL: ' + statitiscAll, 'Level' + unitName + 'Level ' + level); 
      //sendUserTracking(value, 'Finished Game: '+ symbolArr , 'Statistic: ' + statitisc, 'Level' + unitName + 'Level ' + level); 
     
     
     
     
      setStatisticArr(statitisc);
     
     

     console.log('END', typingsSpeedArr);
      
     
      Axios.post('http://localhost:3001/userTracking',

      {
      
      id: value,
      event: 'Finished Level: '+ symbolArr ,
      eventName:  'Reward: ' + starsReceived, 
      location: 'Level' + unitName + 'Level ' + level

      }).then((response)=>{

      Axios.post('http://localhost:3001/userTracking',

      {
      
      id: value,
      event: 'Finished Level: '+ symbolArr ,
      eventName: 'Statistic: ' + statitisc,
      location: 'Level' + unitName + 'Level ' + level

      }).then((response)=>{

      Axios.post('http://localhost:3001/userTracking',

              {
              
              id: value,
              event: 'Finished Level ',
              eventName: 'All Key Pressed ' + allPressedKeys,
              location: 'Level' + unitName + 'Level ' + level

              }).then((response)=>{
     
      Axios.post('http://localhost:3001/userTracking',

              {
              
              id: value,
              event: 'Finished Level ',
              eventName: 'All Key Shown ' + showenKeys,
              location: 'Level' + unitName + 'Level ' + level

              }).then((response)=>{

      Axios.post('http://localhost:3001/userTracking',

              {
              
              id: value,
              event: 'Finished Level ',
              eventName: 'Bubble Letter ' + showenKeys,
              location: 'TypingSpeed' + typingsSpeedArr + 'Level ' + level

              }).then((response)=>{
                addStatisticToDatabase(value, allSymbolArr, statitiscAll, identity, starsReceived, typingMode);
                setStatiscticIsCalculated(true);
      
              })})})})})
    
      return statitisc;
    }

    function nextShiftKeyCombi(combis, currLetterCount){
       
        var shiftKeyCombiCurr =combis[currLetterCount] + ',';
        
        
        var singleShiftKeys = [];
        var shiftKeysPressed = [];

        if(shiftKeyCombiCurr === ',,'){
          setCurrShiftKeys(',');
          setReadShiftKey([false]);
        }else if(shiftKeyCombiCurr === ';,'){
  
          setCurrShiftKeys(';');
          setReadShiftKey([false]);
        }else{
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
        setCurrShiftKeys(singleShiftKeys);
        setReadShiftKey(shiftKeysPressed);
          }
        }
      function createShiftObject(keyPressed){
  
        var res = readShiftKey;
        var currSingleKeys = currShiftKeys;
        console.log('Test key', keyPressed , res, currSingleKeys , 'Index', currSingleKeys.indexOf(keyPressed), symbolsToUse[letterCounter]);
       
        if(currSingleKeys.indexOf(keyPressed) != -1){
        // sendUserTracking(value, 'correct tap: ' + keyPressed , + symbolsToUse[letterCounter] + ' - ' +  currSingleKeys, 'Level' + unitName + 'Level ' + level); 
         
          var currIndex = parseInt(currSingleKeys.indexOf(keyPressed));
          res[currIndex ] = true;
          if(typingMode === 'tripleTap'){
            if( keyPressed ==='Backspace'){
            currIndex = parseInt(currSingleKeys.lastIndexOf(keyPressed));
            res[currIndex ] = true;
          }else if( keyPressed ==='Shift'){
            currIndex = parseInt(currSingleKeys.lastIndexOf(keyPressed));
            res[currIndex ] = true;
          }}
          setReadShiftKey(res);
          
        }else{
        //  sendUserTracking(value, 'wrong tap: ' + keyPressed , 'actual tap ' + symbolsToUse[letterCounter] + ' - ' +  currSingleKeys, 'Level'+ unitName + 'Level ' + level ); 
            
          for(var i = 0; i< res.length; i++){
            res[i] = false;
          }
         
          wrongHit();
          setShowCombinationHelp(combinsationToUse[letterCounter]);

          setShowHelp(true);
          setColor('red'); 
               
          setReadShiftKey(res);
        }
  
  
  
  
      }
    

    function newBubble(hit){
      
        
        setShowHelp(false);
        setColor('lime');
        setShowHelpCounter(0);
        
        //document appearence of Symbols which are part of the learning Unit
        if(symbolArr.includes(symbolsToUse[letterCounter])){
          var indexOfLetter = symbolArr.indexOf(symbolsToUse[letterCounter]);
          var arrayAppear = arrayTimesLetterAp;
          arrayAppear[indexOfLetter] = arrayAppear[indexOfLetter] + 1;
          setArrayTimesLetterAp(arrayAppear);

          if(hit){
            var arrayHit = arrayTimesLetterHit;
            arrayHit[indexOfLetter] = arrayHit[indexOfLetter] + 1;
            setArrayTimesLetterHit(arrayHit);
        
          }
         
       
        }
        //alls Symbols
        if(allSymbolArr.includes(symbolsToUse[letterCounter])){
          var indexOfLetterAll = allSymbolArr.indexOf(symbolsToUse[letterCounter]);
          
          var arrayAppearAll = arrayTimesLetterApAll;
       
          arrayAppearAll[indexOfLetterAll] = arrayAppearAll[indexOfLetterAll] + 1;
        
          setArrayTimesLetterApAll(arrayAppearAll);
         

          if(hit){  
            var indexOfLetterAllHit = allSymbolArr.indexOf(symbolsToUse[letterCounter]);
            
            var arrayHitAll = arrayTimesLetterHitAll;
          
            arrayHitAll[indexOfLetterAllHit] = arrayHitAll[indexOfLetterAllHit] + 1;
            
            setArrayTimesLetterHitAll(arrayHitAll);
          
          }
          
        }
        

       var currLetterCounter = orderLetter[lettersShowenRound];
        setLetterCounter(orderLetter[lettersShowenRound]);
        console.log('Shift create order',currLetterCounter);
      
        setLettersShowenRound(lettersShowenRound + 1)
        setPositionBubbleInt(0);
        
        //if correct entry is hitten
        if(hit){
          loadProgressbar();
          setNumLetterShow(numLetterShow + 1);
              
      }

     
    
      var positionX = Math.floor(Math.random()* (85 - 10) + 10) ;
    
      var newPositionXstring = positionX + "%";
      setPositionXSTring(newPositionXstring);
        
      if(lettersShowenRound >(orderLetter.length)-2){

        let nextOrder;
        if(numLetterShow > (symbolArr.length*2) ){
     
          nextOrder = allLetterCal();
        }else{
        
         nextOrder = createRandomOrder(createOrderLetter());
        }
     
        currLetterCounter = orderLetter[0];
          setOrderLetter(nextOrder);
          setLettersShowenRound(0);
          setLetterCounter(orderLetter[0]);
        }
       
       
        var newOrderLetter = orderLetter;
        if(numLetterShow > ((symbolArr.length)*2) && allLetterInUse && level == 1){
       
            setSymbolsToUse(allSymbolArr);
            setCombinationToUse(allCombinationArray);
           newOrderLetter = allLetterCal();
            setOrderLetter(newOrderLetter);
            setAllLetterInUse(false);
            setLetterCounter(newOrderLetter[lettersShowenRound]);
            currLetterCounter =newOrderLetter[lettersShowenRound];

        }else if(numLetterShow > ((symbolArr.length)) && allLetterInUse && level == 2){
         
          setSymbolsToUse(allSymbolArr);
          setCombinationToUse(allCombinationArray);
     

          newOrderLetter = allLetterCal();
          setOrderLetter(newOrderLetter);
          setLetterCounter(newOrderLetter[lettersShowenRound]);
          currLetterCounter =newOrderLetter[lettersShowenRound];

          setAllLetterInUse(false);
        }else if(level == 3 && allLetterInUse){
          
          setSymbolsToUse(allSymbolArr);
          setCombinationToUse(allCombinationArray);
       
          newOrderLetter = allLetterCal();
          setOrderLetter(newOrderLetter);
          setLetterCounter(newOrderLetter[lettersShowenRound]);
          currLetterCounter =newOrderLetter[lettersShowenRound];

          setAllLetterInUse(false);
        }

        if((typingMode !== 'singleTap') && (lettersShowenRound >(orderLetter.length)-1) === false){

          if(symbolArr.length< newOrderLetter.length){
  
          
              nextShiftKeyCombi(allKeyCombi,currLetterCounter);
          
          }else{
           
           
              nextShiftKeyCombi(keyCombi,currLetterCounter);
            
          
        }}

        var keysShowen = showenKeys;
        keysShowen.push(symbolsToUse[currLetterCounter]);
        setShowenKey(keysShowen);

      
      
      
        if(numLetterShow % symbolArr.length == 0 && numLetterShow !== 0){
          setSpeed(speed + 0.1);
        }

        var currArrTS = typingsSpeedArr;
        var neededTime = (intervallCounter- startTS) / 10;
        currArrTS.push(neededTime);
        setTypingSpeedArr(currArrTS);

        setStartTS(intervallCounter);
      
      }

   function createOrderLetter(){
      var currOrder =[];
      for(var i = 0; i<symbolsToUse.length; i++){
        currOrder.push(i);
      }
 
      setOrderLetter(currOrder);
       return(currOrder);
    }

     function createRandomOrder(arrayNums) {
    
      var array = arrayNums;//createOrderLetter();
      var val, indexCur = array.length;
      var counter = array.length -1;
  
          while (counter) { 
              indexCur = Math.floor(Math.random() * (counter + 1)); 
               val = array[indexCur]; 
             array[indexCur] = array[counter]; 
              array[counter] = val; 
              --counter;
             
          }
        
      return array;
  }


  function allLetterCal(){
   
    var currSymbolArrLeng =  symbolArr.length;
    var currAllSymbolArrLength =  allSymbolArr.length;
    var numLetterToShow = symbolArr.length +   parseInt(level) ;
    var arrayNum = [];
    var startPoint = currAllSymbolArrLength - currSymbolArrLeng;
   
    for(var i = startPoint; i< allSymbolArr.length; i++ ){
     
      arrayNum.push(i);
    }
  
    var diff = numLetterToShow - arrayNum.length 
    var min = 0;
    if(level == 1){
      min = startPoint -5;
      if(min< 0){
        min = 0;
      }
    }
    var max =  currAllSymbolArrLength-1;
   
    for(var i = 0; i< diff; i ++){
      
      var randomNum = Math.floor(Math.random() * (max - min + 1) ) + min;
      
      arrayNum.push(randomNum);
    }
    
    return(createRandomOrder(arrayNum));
  }

  //initialize a new Level or resume old level
  function nextLevel(){
    window.location.href= '/Learn2Tap/Level';
  }
  
  //stores if a wrong key was entered
  function wrongHit(){
    //stores wrong key hit for symbols from current Level
    if(symbolArr.includes(symbolsToUse[letterCounter])){
      var indexOfLetter = symbolArr.indexOf(symbolsToUse[letterCounter]);
      var arr = arrWrongLetterHit;

      arr[indexOfLetter] = arr[indexOfLetter] + 1;
      setArrWrongLetterHit(arr);
    }
    // stores wrong key hit for all symbols which appear in current
    var indexOfLetterAll= allSymbolArr.indexOf(symbolsToUse[letterCounter]);
    var arrAll = arrWrongLetterHitAll;
    arrAll[indexOfLetterAll] = arrAll[indexOfLetterAll] + 1;
    setArrWrongLetterHitAll(arrAll);
   
    }
    

    
    function useKeyPress() {
        // State for keeping track of whether key is pressed
        const [keyPressed, setKeyPressed] = useState(false);
        // If pressed key is our target key then set to true
        function downHandler({ key }) {
          setLastKey(key);
          var allPressed = allPressedKeys;
          allPressed.push(key);
          setALlPressedKeys(allPressed);
         

          if(typingMode !== 'singleTap'){
            createShiftObject(key);
          }else

          if (symbolsToUse.indexOf(key) != -1) {
            setKeyPressed(true);
            setColor('antiquewhite');
            setLetterBubble('');
           
          if(symbolsToUse[letterCounter]== key){
            //sendUserTracking(value, 'correct tap ' + key , 'Write Tap', 'Level' + unitName + 'Level ' + level);  
            newBubble(true);
          


             }else{
           //  sendUserTracking(value, 'wrong tap ' + key , 'actual tap ' + symbolsToUse[letterCounter] , 'Level'+ unitName + 'Level ' + level ); 
               wrongHit();
               setShowCombinationHelp(combinsationToUse[letterCounter]);
               setShowHelp(true);
             
               setColor('red');
               
               
             }
          }else if(showBubble) {
       //   sendUserTracking(value, 'wrong tap ' + key , 'actual tap ' + symbolsToUse[letterCounter] , 'Level'+ unitName + 'Level ' + level ); 

           wrongHit();
          setShowCombinationHelp(combinsationToUse[letterCounter]);
         
            setColor('red');
            
          setShowHelp(true);
         }
         if(dialog && state !== "play"){

          if(key == ' '){
            
            var currLevel = parseInt(level) + 1;
            setLevel(currLevel);
            Cookies.set('level',currLevel);
            if(currLevel> levelExist){
              window.location.href= '/Learn2Tap/'+endUrl;
            }else{
            nextLevel();
            }
    
          }else if(key === 'r'){
            window.location.href= '/Learn2Tap/Level';
    
          }else if(key === 'Backspace' ){

           
              if(levelExist === 2){
                window.location.href= '/Learn2Tap/MenuPracticeUnit';
              }else{
                window.location.href= '/Learn2Tap/MenuPracticeUnit3';
              }
            
          
        }}

        if(pauseDialog && state !== "play"){
          if(key === 'r'){
            sendUserTracking(value, 'Key stroke r', 'Resume Button', 'Pause Dialog Level' + unitName + 'Level ' + level);  
            setPauseDialog(false);
            setState('countdown');   
            setCountDownNum(3);
            setCountDown(true);
          

          }else if(key ==='Backspace'){
            if(levelExist === 2){
              window.location.href= '/Learn2Tap/MenuPracticeUnit';
              }else{
                window.location.href= '/Learn2Tap/MenuPracticeUnit3';
              }

          }

        }

        }

        // If released key is our target key then set to false
        const upHandler = ({ key }) => {
          if (symbolsToUse.indexOf(key) != -1) {
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
        
    
        
        if(initializeLevle){

          var symbolIds = clearCookie(Cookies.get('symbolIDsArray'));
          var hand = Cookies.get('Hand');
          var rightHand = true;
        
 
           if(hand == 'left'){
             console.log('inside Hand');
             rightHand = false;
           }

          setTypingMode(Cookies.get('typingMode'))
          setUnitID(Cookies.get('unitID'));
          setModus(Cookies.get('modusCookie'));
          setUnitName(Cookies.get('unitCookie'));

         
          var currAllSymbols = clearCookie(Cookies.get('allSymbolArrCookie'));
          var curLenght= currAllSymbols.length;
          var currSymbolsToPrac = clearCookie(Cookies.get('symbolArrCookie')).length;
      
          setAllSymbolArr(currAllSymbols, clearCookie(Cookies.get('symbolArrCookie')));
         
          setAllCombinationArray(clearCookie(Cookies.get('allCombinationArrCookie')));
         setArrayTimesLetterApAll(new Array((curLenght)).fill(0));
         setArrayTimesLetterHitAll(new Array((curLenght)).fill(0));
         setArrWrongLetterHitAll(new Array((curLenght)).fill(0));
          console.log(currAllSymbols ,)

         setArrayTimesLetterAp(new Array((currSymbolsToPrac)).fill(0));
       setArrayTimesLetterHit(new Array((currSymbolsToPrac)).fill(0));
        setArrWrongLetterHit(new Array((currSymbolsToPrac)).fill(0));
          var createOrderToStart = [];
          for(var z = 0; z< currSymbolsToPrac; z++){
            createOrderToStart.push(z);
          }
          setOrderLetter(createOrderToStart);

           var currTypingMode = Cookies.get('typingMode');
         
            if(currTypingMode === 'singleTap'){
              setEndUrl('SingleTapMenu');
              setSymbolArr(clearCookie(Cookies.get('symbolArrCookie')));
              setSymbolsToUse(clearCookie(Cookies.get('symbolArrCookie')));
              setCombinationToUse(clearCookie(Cookies.get('combinationArrCookie')));
              setInitializeLevel(false);
            }else if(currTypingMode === 'doubleTap' ){
              setEndUrl('DoubleTapMenu');
            
              Axios.get(`http://localhost:3001/getSymbolArrayDoubleTap/${symbolIds}/${rightHand}/${value}`,).then((response)=>{
     
                setSymbolArr(response.data[0]);
                setSymbolsToUse(response.data[0])
                setCombinationToUse(response.data[1]);
                setAllSymbolArr(response.data[2], response.data[0])
                setAllCombinationArray(response.data[3]);
                setKeyCombi(response.data[4]);
                setAllKeyCombi( response.data[5]);
                var currDT = response.data[4];
                setCurrShiftKeys(currDT[letterCounter]);
                nextShiftKeyCombi(currDT, 0);
                setInitializeLevel(false);

            })

            }else if(currTypingMode === 'tripleTap'){
              setEndUrl('TripleTapMenu');
              Axios.get(`http://localhost:3001/getSymbolArrayTripleTap/${symbolIds}/${rightHand}/${value}`,).then((response)=>{


                setSymbolArr(response.data[0]);
                setSymbolsToUse(response.data[0])
                setCombinationToUse(response.data[1]);
                setAllSymbolArr(response.data[2], response.data[0])
                setAllCombinationArray(response.data[3]);
                setKeyCombi(response.data[4]);
                setAllKeyCombi( response.data[5]);
                var currTT = response.data[4];
                setCurrShiftKeys(currTT[letterCounter]);
                nextShiftKeyCombi(currTT, 0);
                setInitializeLevel(false);

              }
              )
            }else if(currTypingMode === 'switch'){
            setEndUrl('SwitchMenu')

            Axios.get(`http://localhost:3001/getSymbolArraySwitch/${symbolIds}/${rightHand}/${value}`,).then((response)=>{


              setSymbolArr(response.data[0]);
              setSymbolsToUse(response.data[0])
              setCombinationToUse(response.data[1]);
              setAllSymbolArr(response.data[2], response.data[0])
              setAllCombinationArray(response.data[3]);
              setKeyCombi(response.data[4]);
              setAllKeyCombi( response.data[5]);
              var currSwitch = response.data[4];
              setCurrShiftKeys(currSwitch[letterCounter]);
              nextShiftKeyCombi(currSwitch , 0);
              setInitializeLevel(false);

       

          }    )
          
          
          //setInitializeLevel(false);
        }else  if(currTypingMode ==='shift'){
          setEndUrl('ShiftMenu')
          Axios.get(`http://localhost:3001/getSymbolArrayShift/${symbolIds}/${rightHand}/${value}`,).then((response)=>{

            setSymbolArr(response.data[0]);
            setSymbolsToUse(response.data[0])
            setCombinationToUse(response.data[1]);
            setAllSymbolArr(response.data[2], response.data[0])
            setAllCombinationArray(response.data[3]);
            setKeyCombi(response.data[4]);
            setAllKeyCombi( response.data[5]);
            var currShift= response.data[4];
            setCurrShiftKeys(currShift[letterCounter]);
            nextShiftKeyCombi(currShift , 0);
            setInitializeLevel(false);




          })
          
            }
      }
        if(statiscticIsCalculated){
         
          setDialog(true);
          setStatiscticIsCalculated(false);
  
  
        }

        if(showHelp){
          setShowHelpCounter(showHelpCounter + 1);
          if(showHelpCounter== 3){
            setShowHelp(false);
            setShowHelpCounter(0);
            setColor('lime');
          }
        }
        
        
        if(state === "countdown"){
          setShowPause(false);
          setIntervallCountdownCounter(intervallCountdownCounter + 1);
         
          if(intervallCountdownCounter == 10){
            setCountDownNum(countDownNum-1);
            setIntervallCountdownCounter(0);
          }
          if(countDownNum === 1 && intervallCountdownCounter === 9){
            setStartTS(intervallCounter);
            setCountDown(false);
            setState("play");
            setShowBubble(true);
            setIntervallCountdownCounter(0);
          } 


        }else if(state === "play"){
          setShowPause(true);
          
  	  console.log('xxx:',currShiftKeys);
          
          setIntervallCounter(intervallCounter + 1);
        setLetterBubble(symbolsToUse[letterCounter]);
        setColor('lime'); //colorBubble[letterCounter]);
        //setColor(colorBubble[letterCounter]);
        var newPos = positionBubbleInt + "%";
        setPositionBubble(newPos);
        setPositionBubbleInt(positionBubbleInt + speed );

        if(readShiftKey.includes(false) === false){

          newBubble(true);
         
    
        }
             
        if(positionBubbleInt >= 102){
        
          newBubble(false);
                  
     
        }
      }else if(state === "pause"){
        setShowPause(false);
        
      }
      
      //25
      if(numLetterShow == 25){
      
        calculateStatistic();     
         setNumLetterShow(0);
        setShowBubble(false);
      
        setState("pause");
      
      }

      if(intervallCounter >= 1800){
        
        setDialog2(true);

      }
    }, 100);
      // clearing interval
        return () => clearInterval(timer);
      });
     
    return(
      <div id="returnMenuDiv">
      
        <div clas="returnDiv">
        <div width="100%"  class="row">
           <div  class="col"  >
           <button class="normalButton" type="button" id="menuButtonSingleTap"
                onClick={() => {
                 sendUserTracking(value, 'button click', 'Menu Button', 'Level'+ unitName + 'Level ' + level );  
                 if(levelExist === 2){
                  window.location.href= '/Learn2Tap/MenuPracticeUnit';
                  }else{
                    window.location.href= '/Learn2Tap/MenuPracticeUnit3';
                  }
                }
                } 
                >Menu
            </button>
            </div> 
            <div  class="col" id="spaceDivHeader" ></div>
            <div  class="col" id="spaceDivHeader" ></div>
            <div  class="col" id="spaceDivHeader" ></div>
            <div  class="col" id="spaceDivHeader" ></div>
            <div  class="col"  id="glossaryButtonDiv">
            {showPause &&
         <div id="pauseDiv">
             <button class="normalButton"  id= "pauseButtonGames" type="button" 
            onClick={() => {
              sendUserTracking(value, 'button click', 'Pause Button', 'Level'+ unitName + 'Level ' + level );  
             setPauseDialog(true);
             setShowBubble(false);

               setState("pause");
            }}
            >Pause
        </button>
        <br></br></div>
         }
            </div>
            </div>
             
           
          
            <h2>"{unitName}" Level {level}-U{unitID}</h2>
          {showBubble &&  <div id="last">Last Tapped Combination: {lastKey}</div>}


            <div class="mainDiv">
                    {dialog && <div class="reward">
                   
          <CallStar colorF={colStarOne} colorS={colStarTwo} colorT={colStarThree}></CallStar> 
              
              </div>
            }    
            {showBubble &&
          <div class="bar">
            <div class="container">
                <h5 id="percent">0%</h5>
                <div class="progress">
                    <div id="progressBar" class="progress-bar" style={{width:"0%"}}></div>
                </div>
            </div>
            </div>}

            <div class = "showLetterTutoriel">
              {countdown &&
                <div><p class="countdown">{countDownNum}</p>
                 </div>
              }

            {showBubble &&
            <svg  height="100%" width="100%">
                    <circle id="movingCircle"cx={positionXstring} cy={positionBubble} r="25px" stroke={color}stroke-width="3" fill={color} />
                    <text id="movingText" x={positionXstring}  y={positionBubble} text-anchor="middle" font-weight="bold" stroke={color} stroke-width="1px" alignment-baseline="middle"
                 fontSize="25px" >{letterBubble}
                </text>
                </svg>}
                
              {showHelp && <h2>{showCombinationHelp}</h2>}
              {pauseDialog && !dialog && <div>

        <h3>Pause</h3>


        <button type="button" id="dialogButtonLevel"
           onClick={() => {
            sendUserTracking(value, 'button click', 'Resume Button', 'Pause Dialog Level' + unitName + 'Level ' + level);  
            setPauseDialog(false);
            setState('countdown');   
            setCountDownNum(3);
            setCountDown(true);
          
           }
           }
           >Resume <br></br>
           ○ ⬤⬤⬤⬤
           </button>

           
           <button  type="button"  id="dialogButtonLevel"
           onClick={() => {
            sendUserTracking(value, 'button click', 'Exit Button', 'Exit Dialog - ' + unitName + 'Level ' + level );  
            if(levelExist === 2){
              window.location.href= '/Learn2Tap/MenuPracticeUnit';
              }else{
                window.location.href= '/Learn2Tap/MenuPracticeUnit3';
              }}
           
           }
           >Exit <br></br>
           ○ ⬤⬤⬤○
           </button>
           </div>  }

          {dialog && <div> 
            
            <div class="statisticLetter">
                  
                  <CallBarchart data={statisticArr} 
                          svgWidth={300}
                          svgHeight={150}
                          barPadding={10}
                          lableX={symbolArr}
                          color= {colorBubble}
                          yLength={115}></CallBarchart>
                  </div>
                  <button  type="button"  id="dialogButtonLevel"
                  onClick={() => {
                    sendUserTracking(value, 'button click', 'Proceed Button', 'End Dialog '+  unitName + 'Level ' + level );  
                    var currLevel = parseInt(level) + 1;
                    setLevel(currLevel);
                    Cookies.set('level',currLevel);
                    if(currLevel> levelExist){
                      window.location.href= '/Learn2Tap/' + endUrl;
                    }else{
                    nextLevel();
                    }
           }
          }
          >Proceed <br></br>
          ⬤ ⬤⬤⬤⬤
        </button>
        
        <button  type="button" id="dialogButtonLevel"
          onClick={() => {
            sendUserTracking(value, 'button click', 'Replay Button', 'End Dialog Level' + unitName + 'Level ' + level );  
            window.location.href= '/Learn2Tap/Level';
            }
          }
          >Replay <br></br>
          ○ ⬤⬤⬤⬤
        </button>
   
        <button  type="button" id="dialogButtonLevel"
          onClick={() => {
            sendUserTracking(value, 'button click', 'Back Button', 'End Dialog Level' + unitName + 'Level ' + level);  
              if(levelExist === 2){
                window.location.href= '/Learn2Tap/MenuPracticeUnit';
              }else{
                window.location.href= '/Learn2Tap/MenuPracticeUnit3';
              }
            

            
            }
          }
          >Back <br></br>
          ○ ⬤⬤⬤○
        </button>
        
                     </div>  }

                     {dialog2 && <div>

                       <h3>Time is up.</h3>



                       <button  type="button"  id="dialogButtonLevel"
                                  onClick={() => {
                                 sendUserTracking(value, 'button click', 'Replay  Button', 'Time is up Dialog Level' + unitName + 'Level ' + level);     
                                 window.location.href= '/Learn2Tap/Level';
                                  }
                                  }
                                  >Replay <br></br>
                                  ○ ⬤⬤⬤⬤
                                  </button>
     <button  type="button"  id="dialogButtonLevel"
                                  onClick={() => {
                                    sendUserTracking(value, 'button click', 'BAck  Button', 'Time is up Dialog Level'+ unitName + 'Level ' + level );   
                                      if(levelExist === 2){
                                        window.location.href= '/Learn2Tap/MenuPracticeUnit';
                                      }else{
                                        window.location.href= '/Learn2Tap/MenuPracticeUnit3';
                                      }
                                   
                        
                                   
                                  }
                                  }
                                  >Back <br></br>
                                  ○ ⬤⬤⬤○
                                  </button>
                                  </div>  }



            </div>
            
            </div>
            
            
        </div></div>
    );
};
