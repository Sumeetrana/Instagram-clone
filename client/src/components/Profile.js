import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const Profile = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);
  useEffect(() => {
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.posts);
        console.log(state);
        setData(result.posts);
      });
  }, []);
  return (
    <div style={{ maxWidth: "950px", margin: "10px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "18px 0",
        }}
      >
        <div>
          <img
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
              objectFit: "cover",
            }}
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          />
        </div>
        <div style={{ textAlign: "left" }}>
          <h4>Katy pery</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "120%",
            }}
          >
            <h6>
              <b>{data.length}</b> posts
            </h6>
            <h6>
              <b>{state ? state.followers.length : "0"}</b> followers
            </h6>
            <h6>
              <b>{state ? state.following.length : "0"}</b> following
            </h6>
          </div>
        </div>
      </div>
      <hr />
      <div className="gallery">
        {data.map((item) => {
          return <img key={item._id} className="item" src={item.photo} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
