import React from "react";

const CreatePost = () => {
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
      <input type="text" placeholder="Enter title.." />
      <input type="text" placeholder="Enter description.." />
      <div className="file-field input-field">
        <div className="btn btn-small #64b5f6 blue lighten-1">
          <span>Upload Image</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn btn-large waves-effect waves-light #64b5f6 blue darken-2"
        style={{ marginTop: "60px" }}
      >
        Upload Post
        <i class="material-icons right">send</i>
      </button>
    </div>
  );
};

export default CreatePost;
