import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context.js";
import "./Topbar.css";

export default function Topbar() {
  const PF = "https://mernblogappbackend.onrender.com/images/";
  const { user, dispatch } = useContext(Context);
  // console.log(user);
  const handleLOGOUT = (e) => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link
              to="/write"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              WRITE
            </Link>
          </li>

          <li className="topListItem" onClick={handleLOGOUT}>
            {/* <Link to="/login" style={{  textDecoration: "none",color:"inherit"}}>LOGOUT</Link> */}
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/setting"
          >
            {user.profilePic !==
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" ? (
              <img className="topImg" src={PF + user.profilePic} alt="" />
            ) : (
              <img
                src="https://i.pinimg.com/474x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
                alt=""
                className="topImg"
              />
            )}
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/login"
              >
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/register"
              >
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
