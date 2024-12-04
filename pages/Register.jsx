import { useState } from "react/cjs/react.production.min";
import axios from 'axios'
import useNavigate from 'react-router-dom'
export default Register = () => {
  const [data, setData] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [referralID, setReferralID] = useState("");
  const [countaryID, setCountryID] = useState("");
   const naviagate = useNavigate()
  const userCreate = async()=>{
   let {data} = axios.post(" https://lobster-app-ddwng.ondigitalocean.app/user/register",{
    header:{
        "ContenType"application/json"
    },
    withCredentials:true
   

   }).then(()=>{
    setData(data)
      console.log("register succesfully 👍")
      navigate("login")
   }).catch((e)=>{
       console.log("error for registring the user ")
   })
  }
  return <>
  <input type="text" onchange={(e)=>{setUsername(e.target.value)}} placeholder="enter username"/>
  <input type="text" onchange={(e)=>{setEmail(e.target.value)}} placeholder="enter username"/>
  <input type="text" onchange={(e)=>{setPassword(e.target.value)}} placeholder="enter password"/>
  <input type="text" onchange={(e)=>{setMobileNumber(e.target.value)}} placeholder="enter mobile number"/>
  <input type="text" onchange={(e)=>{setCountryID(e.target.value)}} placeholder="enter countaryID "/>
  <input type="text" onchange={(e)=>{setReferralID(e.target.value)}} placeholder="enter referralID "/>
  <input type="button" onclick={()=>{userCreate()}} onchange={(e)=>{setUsername(e.target.value)}} placeholder="enter username"/>

  </>;
};
