
import { useState } from 'react';
import {Box,TextField,Button, Typography,styled} from '@mui/material'
import { Link } from 'react-router-dom';
import axios from 'axios';
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

const Wrapper = styled(Box)`
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





export default function Register() {
   
    const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  
    return (

 <Component style={{marginTop:"20px"}}>
 <Box>
     <Image src='https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png' alt="blog" />
   
             <Wrapper>
                 <TextField variant="standard"  onChange={(e)=>{
                    setEmail(e.target.value)
                 }}name='email' type={"email"} label='Enter Email' />
                 <TextField variant="standard"  name='username'   onChange={(e) => setUsername(e.target.value)} label='Enter Username' />
                 <TextField variant="standard"  name='password' onChange={(e)=>{
                    setPassword(e.target.value)
                 }} label='Enter Password' />

                 <SignupButton   type="submit" onClick={handleSubmit} >Signup</SignupButton>
                 <Text style={{ textAlign: 'center' }}>OR</Text>
                 <LoginButton variant="contained">
                 <Link className="link" to="/login" style={{  textDecoration: "none",color:"inherit"}}>
                 Already have an account
        </Link>
        </LoginButton>
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
             </Wrapper>
     
 </Box>
</Component>

    )
}
