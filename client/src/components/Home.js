import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const Home = () => {
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
        console.log(result);
        setData(result.posts);
      });
  }, []);
  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (result._id == item._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((e) => console.log(e));
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (result._id == item._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((e) => console.log(e));
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((e) => console.log(e));
  };

  const deletePost = (postId) => {
    fetch(`/delete/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Link
                to={
                  item.postedBy._id === state._id
                    ? "/profile"
                    : `/profile/${item.postedBy._id}`
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <img
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    alignItems: "center",
                    margin: "10px 10px 0 10px",
                  }}
                  src={item.postedBy.pic}
                />
                <div style={{ marginTop: 8 }}>{item.postedBy.name}</div>
              </Link>{" "}
              {item.postedBy._id === state._id ? (
                <i
                  className="material-icons"
                  style={{ float: "right", cursor: "pointer" }}
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              ) : null}
            </h5>
            <div className="card-image">
              <img src={item.photo} />
            </div>
            <div className="card-content">
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => unlikePost(item._id)}
                >
                  favorite
                </i>
              ) : (
                <i
                  className="material-icons"
                  style={{ cursor: "pointer" }}
                  onClick={() => likePost(item._id)}
                >
                  favorite_border
                </i>
              )}
              <p>
                Liked by <b>{item.likes.length}</b> people
              </p>
              <div>
                <span>
                  <strong>{item.postedBy.name}&nbsp;&nbsp;</strong>
                </span>
                <span>{item.body}</span>
              </div>
              <div>
                {item.comments.map((comment) => {
                  return (
                    <h6 key={comment._id}>
                      <span style={{ fontWeight: 500 }}>
                        {comment.postedBy.name}
                      </span>
                      &nbsp;&nbsp;
                      {comment.text}
                    </h6>
                  );
                })}
              </div>
              <div style={{ display: "flex" }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (e.target[0].value !== "") {
                      makeComment(e.target[0].value, item._id);
                      e.target[0].value = "";
                    }
                  }}
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <input type="text" placeholder="Leave comment.." />
                  <button
                    type="submit"
                    style={{
                      background: "white",
                      border: "none",
                      color: "#4AB5F9",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
