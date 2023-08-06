import { useState, useEffect } from "react";
import "./sideBar.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
export default function Sidebar() {
  const PF = "http://localhost:5000/images/";
  const [cats, setCats] = useState([]);

  const withoutDuplicates = cats.map((item) => item.name);
  const dCats = [...new Set(withoutDuplicates)];

  const { user } = useContext(Context);

  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("/categories");

      setCats(res.data);
    };
    getCat();
  }, [user]);
// console.log(user.profilePic+" ");
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        {user ? (
          <img
            src={
              user.profilePic !==
              ""
                ? PF + user.profilePic
                : "https://i.pinimg.com/474x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
            }
            alt=""
          />
        ) : (
          <img
            src="https://i.pinimg.com/474x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
            alt=""
          />
        )}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
          necessitatibus nostrum illum reprehenderit.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {dCats &&
            dCats.map((c, index) => (
              <Link
                key={index}
                to={`/?cat=${c}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  marginRight: "5px",
                }}
              >
                <li key={index} className="sidebarListItem">
                  {c}
                </li>
              </Link>
            ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
