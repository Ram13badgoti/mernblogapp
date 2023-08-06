import React, { useContext,useState} from "react";
import {Box,TextField,Button, Typography,styled,FormControl} from '@mui/material'
import { Link } from 'react-router-dom';
import { Context } from "../../context/Context.js";
import axios from "axios";
const Component = styled(Box)`
    width: 400px;
    margin: auto;

    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '30px 0 0'
});

const Wrapper = styled(FormControl)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    // background: #FB641B;
    // color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;





export default function Login() {
    
    
    const { user,dispatch, isFetching } = useContext(Context);
    const [username,setUsername] = useState({
        username:""
    });
    const [password,setPassword] = useState({
        username:""
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
console.log(username,password);
      dispatch({ type: "LOGIN_START" });
      try {
     
        const res = await axios.post("/auth/login",{
          username: username,
          password: password,
        });
        

        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        res.data && window.location.replace("/");
      } catch (err) {
        console.log(username.length)

        if(username.length===undefined)
        window.alert("Please! Enter username")
    else if(password.length===undefined){
        window.alert("Please! enter password")
    }else{
        window.alert("NO data")
    }

        dispatch({ type: "LOGIN_FAILURE" });
        
      }
      

      
    
    };
     console.log(user)
  
    
       return (

 <Component style={{marginTop:"20px"}}>
 <Box>
     <Image src='https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png' alt="blog" />
   
             <Wrapper onSubmit={handleSubmit}>
               

               
                 <TextField variant="standard"  name='username' onChange={(e)=>{
                    setUsername(e.target.value);
                 }}   label='Enter Username'  required/>
                 <TextField variant="standard" name='password'  onChange={(e)=>{
                    setPassword(e.target.value);
                 }}    label='Enter Password' required />

               

                 <LoginButton variant="contained"  type='submit' onClick={handleSubmit}  disabled={isFetching} >Login</LoginButton>
                 <Text style={{ textAlign: 'center' }}>OR</Text>
                 <SignupButton style={{ marginBottom: 30 }}>
                 <Link to="/register" style={{  textDecoration: "none",color:"inherit"}} >
                 Create an account
        </Link>
        </SignupButton>
        
             </Wrapper> 
 </Box>
</Component>

    )
}
