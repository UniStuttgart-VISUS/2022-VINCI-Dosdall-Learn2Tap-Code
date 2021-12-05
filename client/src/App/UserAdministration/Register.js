import '../../App.css';
import React,{useState,useContext} from "react";
import Axios from "axios";
import { idContext } from "../../idContext";
import Cookies from 'js-cookie';
import { sendUserTracking } from '../functions/functions';



export const Register = props => {
  const {value,setValue} =  useContext(idContext);

 
  const[name, setName] = useState("");
  const[hand, setHand] = useState("right");
 
  
  const addUser = () =>{
    
    Axios.get(`http://localhost:3001/createUser/${name}/${hand}`,).then((response)=>{
      console.log(response);
    if(response.data === false){
      
      alert("name already exist");
      sendUserTracking(value, 'Alert Message', 'Name exist', 'Registration' );
    } else{
      setValue(response.data.insertId);
      sendUserTracking(value, 'Alert Message', 'Succesful Registration', 'Registration' );
      Cookies.set("Hand",hand, { expires: 7 });  
      alert("You are registert with the name: " + name );
      window.location.href=  '/Learn2Tap'; 
    }
    })
  };
 
  return (
    <div id="returnMenuDiv">
    <div className="App">
      <button class="normalButton" type="button" id="userAdministrationButton"
                onClick={() => {       
                  sendUserTracking(value, 'button click', 'menu button', 'Registration' );           
                  window.location.href=  '/Learn2Tap'; 
                  // props.history.push("/");
                  }
                }
                >Menu</button>
      <h3>Welcome to the TapStrap Learning Application.</h3>
      <h5>Registration</h5>
      <div className="information">
        <lable>Name:</lable>
        <input 
          type="text" 
          onChange={(event)=>{
            setName(event.target.value);
          }}
          />
        <lable>Hand:</lable>
        <select name="cars" id="cars" onChange={(event)=>{
          setHand(event.target.value);
          sendUserTracking(value, 'select Hand', event.target.value, 'Registration' );    
           
          }} >
            <option value="right">Right-Handed</option>
            <option value="left">Left-Handed</option>
       
        </select>
          
       
        <br></br>
        <button  class="normalButton" id="registerButton" onClick={()=>{
           addUser();
           sendUserTracking(value, 'button click', 'register button', 'Registration' );     
         }}>Register</button>
      </div>
       <br></br>
     </div></div>
  );
}

export default Register;
