import React from "react";
import "./about.css";
import { Link } from "react-router-dom";
export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  // console.log(post.categories[0]);
  return (
    <div className="post">
      <div className="inPost">
        {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
        <div className="postInfo">
          <div className="postCats">
            {post.categories.map((item,index) => {
              return (
                            <Link className="link" key={index} to={`/?cat=${item}`}>
             <span  key ={index} className="postCat">{item}</span>
            </Link>
              )
            })}
          </div>

          <Link
            to={`/post/${post._id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              textTransform: "capitalize",
            }}
          >
            <span className="postTitle">{post.title} </span>
          </Link>

          <hr />
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc"> {post.desc} </p>
      </div>
    </div>
  );
}
