import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
const Profile = () => {
  const [pics, setPics] = useState([]);
  const [data, setData] = useState([]);

  const { state, dispatch } = useContext(UserContext);

  const { userid } = useParams();
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setData((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setData((prevState) => {
          const newFollowers = prevState.user.followers.filter(
            (follower) => follower !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollowers,
            },
          };
        });
        setShowFollow(true);
      });
  };
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
          <h4>{data.user && data.user.name}</h4>
          {showFollow ? (
            <button
              type="submit"
              className="btn waves-effect waves-light"
              onClick={() => followUser()}
            >
              Follow
            </button>
          ) : (
            <button
              type="submit"
              className="btn waves-effect waves-light black-text #eeeeee grey lighten-3"
              onClick={() => unfollowUser()}
            >
              Unfollow
            </button>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "120%",
            }}
          >
            <h6>
              <b>{data.posts && data.posts.length}</b> posts
            </h6>
            <h6>
              <b>{data.user && data.user.followers.length}</b> followers
            </h6>
            <h6>
              <b>{data.user && data.user.following.length}</b> following
            </h6>
          </div>
        </div>
      </div>
      <hr />
      <div className="gallery">
        {data.posts &&
          data.posts.map((item) => {
            return <img key={item._id} className="item" src={item.photo} />;
          })}
      </div>
    </div>
  );
};

export default Profile;
