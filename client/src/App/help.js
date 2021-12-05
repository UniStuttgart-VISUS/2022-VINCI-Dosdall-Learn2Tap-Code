import React, {useEffect, useState, useContext}from "react";
import './menu.stylsheet.css';
import { sendUserTracking } from "../App/functions/functions";

import { idContext } from "../idContext";
import Axios from "axios";


import Cookies from 'js-cookie';

export const Help = props => {
  const {value,setValue} =  useContext(idContext);

const[initialize, setInitialize] = useState(true);
const[rightHand, setRightHand] = useState(true);



useEffect(() => {
    const timer = setInterval(() => {

        if(initialize){
    
            var hand = Cookies.get('Hand');
            var currRight= true;
        
            if(hand === 'left'){
              setRightHand(false);
            currRight = false;
           
            }

            
            
            setInitialize(false);
           
    
       
     };
    
    



   


    
     
    }, 100);
    // clearing interval
      return () => clearInterval(timer);
    });




   
    return(
      <div id="returnMenuDiv">
        <div>
            
            <button class="normalButton" type="button" id="userAdministrationButton"
                onClick={() => {
                  sendUserTracking(value, 'button click', 'Menu Button', 'Hints' );  
                  window.location.href=  '/Learn2Tap'; 
                }
                }
                >Menu
            </button>
           
            <h2>Hints</h2><br></br>
            <div className='modeSelection'>
              <div id="hintsDiv">
               <br></br>
                  <ul>
                    <li>Set your keyboard to <b>US-keyboard</b> so that TapStrap works without problems.</li>
                    <li><b>Disable </b>your <b>browser's shortcuts </b>to use TapStrap Shift-Mode without problems.</li>
                    <li>Make sure that your TapStrap uses the <b>correct mapping</b> (Mapping to programme in AVAR).</li>
                    <li>Make sure your TapStrap is in the <b>correct mode.</b> (Default, Switch, Shift --> always in default mode when Escape is pressed)</li>
                  <li>Escape: leftHander = ⬤○○⬤ ⬤ , rightHander = ⬤ ⬤○○⬤ </li>
                    </ul>

                    </div>
           

           </div>
            </div></div>

            
              


       
    );
};