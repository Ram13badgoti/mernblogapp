
import Topbar from './components/topbar/Topbar';
import Home from './pages/Home/Home.jsx';
import Login from './pages/login/Login';
import Setting from './pages/setting/Setting';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Register from "./pages/register/Register"
import About from "./pages/About/About"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {

  const {user}=useContext(Context);
 
// console.log(user)

  return (
    <Router>
  
    <Topbar></Topbar>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login'   element={user ?  <Login /> : <Login />} />
    <Route path='/about'   element={user ?  <About /> : <Login />} />

   
  <Route path='/write'  element={ user ? <Write /> : <Register />} /> 

   <Route path='/setting' element={user ? <Setting /> : <Register />} />

    <Route path='/post/:postId' element={<Single/>} />
    <Route path='/register' element={<Register/>} />
  

    </Routes>
 
   </Router>
  
  );
}

export default App;
