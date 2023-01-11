import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: tags,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  useEffect(() => {
    const handleTags = async () => {
      try {
       await axios.post("/categories", {
          name: tag,
        });
      } catch (err) {}
    };

    handleTags();
  }, [tag]);

  const selectedTags = (tags) => console.log(tags);

  const addTags = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTags([...tags, e.target.value]);

      // highlight-next-line
      selectedTags([...tags, e.target.value]);
      setTag(e.target.value);
      e.target.value = "";
    }
  };

  return (
    <div className="write">
      {file ? (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      ) : (
        <img
          className="writeImg"
          src="https://images.pexels.com/photos/9553447/pexels-photo-9553447.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="tagInfo">
          <div className="tagCats">
            {/* <Link className="link" to="/posts?cat=Music"> */}
            <ul>
              <input
                className="tagInput"
                type="text"
                onKeyUp={(event) => addTags(event)}
                placeholder="Add tags"
              />

              {/* </Link> */}

              {/* <div className="postCat" > */}

              {tags.map((tag, index) => (
                <Link className="link" key={index} to="/write">
                  <span key={index} className="tagCat">
                    {tag}
                  </span>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
