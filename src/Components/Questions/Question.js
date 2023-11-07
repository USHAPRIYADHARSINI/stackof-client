import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar, Divider } from "@mui/material";
import "./Question.css";
import "./Addquestion";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AuthContext from "../AuthContext";
const swal = require("sweetalert2");

function Question({ setQuestionId }) {
  const [allQuestion, setAllQuestion] = useState([]);
  // var [user, setUser] = useState([]);
  var content = null;
  const navigate = useNavigate();
  // const [handle, setHandle] = useState(false)

  // useEffect (() => {
  //   setHandle(true)
  // },[user, authTokens])

  const { authTokens, user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_LOCAL_URL}/question`)
      .then((data) => data.json())
      .then((data) => setAllQuestion(data))
      //   .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  const delQues = async (questionid) => {
    const data = await fetch(
      `${process.env.REACT_APP_LOCAL_URL}/question/${questionid}/delete`,
      {
        method: "DELETE",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsondata = await data.json();
    if (jsondata.status === 200) {
      swal.fire({
        title: jsondata.msg,
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate("/question");
    } else {
      swal.fire({
        title: data.msg,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const handleQId = (id) => {
    setQuestionId(id);
    if(user.id){
    navigate(`/question/${id}id`);
    }else {
      swal.fire({
        title: "Please login to view in detail",
        icon: "error",
        toast: true,
        timer: 6000,
        position: "center",
        timerProgressBar: true,
        showConfirmButton: true,
      });
    }

  };

  const noans = async (quesid) => {
    try {
      const data = await fetch(
        `${process.env.REACT_APP_LOCAL_URL}/answer/${quesid}/get`
      );
      const jsondata = data.json();
      if (jsondata.msg === "success") {
        return data.answers.length;
      }
    } catch (error) {
      console.log("Error in fetching answers", error);
    }
  };

  if (allQuestion) {
    content = allQuestion.map((question, index) => (
      <div key={index} className="quescard">
        <div className="col1">
          <p className="items bold">{question.votes.length} votes</p>
          <p className="items">{question.answers.length}answers</p>
          <p className="items">{question.views.length} views</p>
        </div>
        <div className="col2">
          <div className="flex">
          <p
            onClick={
              () => handleQId(question.id)

              // fetch(`${process.env.REACT_APP_LOCAL_URL}/question/${question.id}`)
              // .then((data) => data.json())
              // .then((data)=>{
              //     <div className="col1">
              //         <p className="items bold">{data.vote} votes</p>
              //         {/* <p className="items">{data.answer} answers</p> */}
              //         <p className="items">{data.view} views</p>
              //     </div>
              // })
              // .catch((error)=>console.log(error))
              // fetch(`${process.env.REACT_APP_LOCAL_URL}/answer/${question.id}`)
              // .then((data) => data.json())
              // .then((data)=>data.map((data, index) => {
              //     <div className="col1" key={index}>
              //         <p className="items">{data.answer}</p>
              //         {/* <p className="items">{data.answer} answers</p> */}
              //         <p className="items">{data.code} </p>
              //         <p className="items">{data.time} views</p>
              //     </div>
              // }))
              // .catch((error)=>console.log(error))
            }
            style={{ cursor: "pointer" }}
          >
            {question.title}
          </p>
          {user?.id === question.user.id ? (
            <div>
                <DeleteOutlineIcon className="bd" fontSize="small" onClick={() => delQues(question.id)}/>
              
                <EditIcon className="be" fontSize="small"
                onClick={() => navigate(`/question/${question.id}id/edit`)}/>
            </div>
          ) : null}
          </div>
          <div className="col3">
            {/* {question.tag.map((t,i)=>{
              <p className="items tag" key={i}>{t}</p>
            })} */}
            {console.log("question",question, "user", user)}
            <div className="userin">
            {question.user?.pp ? (
                <img
                  className="pps"
                  src={question.user.pp}
                  alt="profile picture"
                  aria-label="profile picture"
                />
              ) : (
                <Avatar />
              )}
              {question.user?.name ? (
                <p className="user blue">{user.name}</p>
              ) : (
                // <p>{user.email.split("@")[0]}</p>
                null
              )}

              <p className="user time">
                {new Date(question.time).toLocaleString()}
              </p>
              
            </div>
            {console.log(user)}
          </div>
          
        </div>
      </div>
    ));
  }

  const addQuestionbutton = () => {
    if (authTokens !== null) {
      console.log("authtoken");
      navigate("/addquestion");
    } else {
      navigate("/");
      swal.fire({
        title: "Login or Signup to continue",
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="containerq">
      <div className="questioncont">
        <div className="questions">
          <h1 className="heading">All Questions</h1>
          <button className="button" onClick={() => addQuestionbutton()}>
            Ask Question
          </button>
        </div>
        <h3 className="heading2">{allQuestion.length} questions</h3>
        <Divider />
        <div className="allquestion">{content}</div>
      </div>
    </div>
  );
}

export default Question;

