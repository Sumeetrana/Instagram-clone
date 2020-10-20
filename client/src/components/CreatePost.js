import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          picUrl: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            M.toast({ html: data.error, classes: "#e53935 red darken-1" });
          } else {
            M.toast({
              html: "Post created successfully",
              classes: "#66bb6a green lighten-1",
            });
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const uploadPhoto = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dwhrleiox");
    fetch("https://api.cloudinary.com/v1_1/dwhrleiox/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((e) => console.log(e));
  };

  return (
    <div
      className="card input-filed"
      style={{
        margin: "30px auto",
        maxWidth: "600px",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h3>Upload a post</h3>
      <input
        type="text"
        placeholder="Enter title.."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter description.."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn btn-small #64b5f6 blue lighten-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn btn-large waves-effect waves-light #64b5f6 blue darken-2"
        style={{ marginTop: "60px" }}
        onClick={uploadPhoto}
      >
        Upload Post
        <i className="material-icons right">send</i>
      </button>
    </div>
  );
};

export default CreatePost;
