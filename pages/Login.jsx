import axios from 'axios'
import useNavigate from 'react-router-dom'
export default Login = () => {
    const [data, setData] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const naviage = useNavigate()
    const fetchingData = async () => {
        let { data } = axios.get(
          "https://lobster-app-ddwng.ondigitalocean.app/user/login"
        ).then(()=>{
            setData(data)
            
        }).catch((e)=>{
          console.log("error are there :",e.message)
        })
      };
  cosnt userAuthenticate = async()=>{
    
    if(data.password === password && data.email){
       navigate('home')
    }
  }

      return (
        <>
        <input type="text" value={email} placeholder="enter email" onchange={(e)=>{setEmail(e.target.value)}} />
        <input type="text" value={password} placeholder="enter password" onchange={(e)=>{setPassword(e.target.value)}} />
         <button onclick={()=>{userAuthenticate}}>Login</button> 
        <>
      )

};
