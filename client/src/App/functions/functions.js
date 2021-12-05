import React from "react";
import Axios from "axios";


 export function clearCookie(arrayCurr){
   
    var resultsArr = []
    var currVal = '';
    for(var i = 0; i < arrayCurr.length; i++){
      if(arrayCurr[i] != "[" && arrayCurr[i] != '"' ){
        if(arrayCurr[i] == ","  || arrayCurr[i] == "]"){
        resultsArr.push(currVal);
      //  if(currVal === "'"){
        //  resultsArr.push('<');
       // }
        currVal = '';
        
      }else{
        currVal = currVal + arrayCurr[i];
      }
    } 
    if(arrayCurr[i] === arrayCurr[i +1] && currVal === ''){
      console.log('clear Cookie', arrayCurr[i], arrayCurr[i+1])
      resultsArr.push((arrayCurr[i]));
      i++;
    }}
  
    for( var i = 0; i < resultsArr.length; i++){ 

      
                                   
      if ( resultsArr[i] === "") { 
          resultsArr.splice(i, 1); 
          i--; 
      }
  }

  if( resultsArr.indexOf('\\\\')!== -1){
    var currIn =resultsArr.indexOf('\\\\');
    var modify = resultsArr[currIn];
    modify = modify[0];
    resultsArr[currIn]= modify;
  }
  if( resultsArr.indexOf('<br>')!== -1){
    var currIn2 =resultsArr.indexOf('<br>');
    var modify2 = ',';
  
    resultsArr[currIn2]= modify2;
  }
  if( resultsArr.indexOf(';<br>')!== -1){
    var currIn3 =resultsArr.indexOf(';<br>');
    var modify3 = ';';
  
    resultsArr[currIn3]= modify3;
  }
  console.log('clear Cookie STRIB', resultsArr.indexOf('\\\\'));

    
    console.log('clear Cookie', resultsArr);
    return(resultsArr);



 }

 export function clearCookieShift(arrayCurr){
   
  console.log('COOKIE SHIFT START',  arrayCurr);
  var resultsArr = []
  var currVal = '';
  var countBR = 0;
  
  for(var i = 0; i < arrayCurr.length; i++){
    if(arrayCurr[i] != "[" && arrayCurr[i] != '"' ){
      if((arrayCurr[i] == ","  || arrayCurr[i] == "]") && currVal!== '' ){
        
        resultsArr.push(currVal + ',');
      currVal = '';
  
    }else{
      
      currVal = currVal + arrayCurr[i];
      if(currVal.indexOf('<br>')!==-1){
        
        countBR = countBR +1;
        if(countBR ===1){
          currVal =','
        }else 
        if(countBR ===2){
          currVal =";";
        }
        
      }
    }
  } }
 


  console.log('COOKIE SHIFT', resultsArr, countBR);

  return(resultsArr);
  


}

 export function addStatisticToDatabase(userID, symbols, statistic, unitLevelID, stars, typinmode){
   
    console.log('called sta', userID, symbols, statistic, unitLevelID, stars ,typinmode);
 
    console.log('inside called');
    if(typinmode === 'singleTap'){
    Axios.post('http://localhost:3001/statisticSingleTap',
    
    {
       
      id: userID,
      symbols:symbols,
     statistic:statistic,
     unitLevelID: unitLevelID,
     stars:stars
   }).then((response)=>{

    return (true);

   })
 
  }else  if(typinmode === 'doubleTap'){
 
    Axios.post('http://localhost:3001/statisticDoubleTap',
    
    {
       
      id: userID,
      symbols:symbols,
     statistic:statistic,
     unitLevelID: unitLevelID,
     stars:stars
   }).then((response)=>{

    return (true);

   })

    console.log('called: ',typinmode);

  }else if(typinmode === 'tripleTap'){
    console.log('called: ',typinmode);
    Axios.post('http://localhost:3001/statisticTripleTap',
    
    {
       
      id: userID,
      symbols:symbols,
     statistic:statistic,
     unitLevelID: unitLevelID,
     stars:stars
   }).then((response)=>{

    return (true);

   })


  }else if(typinmode === 'switch'){
    console.log('called: ',typinmode);
    Axios.post('http://localhost:3001/statisticSwitch',
    
    {
       
      id: userID,
      symbols:symbols,
     statistic:statistic,
     unitLevelID: unitLevelID,
     stars:stars
   }).then((response)=>{

    return (true);

   })

    



  }else if(typinmode === 'shift'){
    console.log('called: ',typinmode);
    Axios.post('http://localhost:3001/statisticShift',
    
    {
       
      id: userID,
      symbols:symbols,
     statistic:statistic,
     unitLevelID: unitLevelID,
     stars:stars
   }).then((response)=>{

    return (true);

   })


  }
 }

 export function sendUserTracking(userID, event, eventName, location){
  console.log('User Tracking', event);
   
  Axios.post('http://localhost:3001/userTracking',

  {
     
    id: userID,
    event: event,
    eventName: eventName,
    location: location
    
 })
 
}






 export default {clearCookie, clearCookieShift, addStatisticToDatabase,sendUserTracking};