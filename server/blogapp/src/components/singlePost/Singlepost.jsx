import { useEffect, useState } from "react";
import "./singelPost.css";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
export default function Singlepost() {
  const PF = "https://mernblogappbackend.onrender.com/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  // console.log(path);
  // console.log(updateMode);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      // console.log(res.data);
      setPost(res.data);

      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error, "while deleting post");
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });

      setUpdateMode(false);
      window.location.reload();
    } catch (err) {}
  };

 
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "10px",
            fontSize: "15px",
          }}
        >
          {post.categories &&
            post.categories.map((tag, index) => (
              <Link className="link" key={index} to={`/?cat=${tag}`}>
                <span key={index} className="tagCat">
                  {tag}
                </span>
              </Link>
            ))}
        </div>

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link
              to={`/?user=${post.username}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post.desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
