import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./Users.css";
import { Divider } from "@mui/material";

function GetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  var content = null;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_LOCAL_URL}/users`)
      .then((data) => data.json())
      .then((data) => setAllUsers(data))
      //   .then((data) => console.log(data))
      .catch((error) => console.log(error));
    // console.log(allUsers);
  }, []);

  if (allUsers) {
    content = allUsers.map((user, index) => (
      <div key={index} className="card">
        <img src={user.pp} className="img" />
        <div className="container">
          <p className="name">{user.name}</p>
          <p className="location">
            {/* {user.location.label ? user.location.label : user.location} */}
          </p>
        </div>
      </div>
    ));
  }

  return (
    <div className="users">
      <h1 className="heading">Users</h1>
      <Divider />
      <div className="content">{content}</div>
    </div>
  );
}

export default GetAllUsers;
