import React, { useContext, useEffect, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useNavigate } from "react-router-dom";
import { CopyBlock } from "react-code-blocks";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import AuthContext from "../AuthContext";
import { Avatar, TextField } from "@mui/material";
import parse from 'html-react-parser';
// import Markdown from 'https://esm.sh/react-markdown@9'
// import ReactMarkdown from "react-markdown";
const swal = require("sweetalert2");

function OneQuestion({ questionId }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);
  var content = null;
  var quesContent = null;
  const [ansDet, setAnsDet] = useState("");

  const { user, authTokens } = useContext(AuthContext);

  // const handleChange = (event) => {
  //   setLanguage(event.target.value);
  // };

  const navigate = useNavigate();

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

  const quillModule = {
    toolbar: toolbarOptions,
  }

  useEffect(() => {
    console.log(questionId,user.id, "hi");
    console.log(user)

    fetch(`${process.env.REACT_APP_LOCAL_URL}/question/${questionId}/views/${user.id}`,{
      method: 'PUT',
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.msg === "success") {
          setQuestion(data.question);
          console.log("done")
        }
      })
      .catch((error) => console.log(error));

    // fetch(`${process.env.REACT_APP_LOCAL_URL}/question/${questionId}/get`)
    //   .then((data) => data.json())
    //   .then((data) => {
    //     if (data.msg === "success") {
    //       setQuestion(data.question);
    //     }
    //   })
    //   .catch((error) => console.log(error));

    fetch(`${process.env.REACT_APP_LOCAL_URL}/answer/${questionId}/get`)
      .then((data) => data.json())
      .then((data) => {
        if (data.msg === "success") {
          setAnswer(data.answers);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  if (question) {
    quesContent = (
      <div className="ques">
        <h2>{question.title}</h2>
        <div className="col">
          <p className="items"> votes {question.vote}</p>
          {/* install react-code-blocks to view code */}
          <p className="items">views {question.view} </p>
          <p className="items">created at {new Date(question.time).toLocaleString() } </p>
        </div>
        <div className="wid">
          <p className="items">{ question.question ? parse(question.question) : null} </p>
          {/* <SyntaxHighlighter language={question.language} style={docco}>
            {question.code}
          </SyntaxHighlighter> */}
          <div className="tagsline"> {question.tags? question.tags.map((m, index)=>(
            <p className="items tag" key={index}>{m}</p>
          ))
          : null}
          </div>
        </div>
      </div>
    );
  }

  if (answer.length > 0) {
    console.log(answer.length);
    content = answer.map((m, index) => {
      <div>{m.userName}</div>;
    });
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

  const updateQuesAns = async (ansId) => {
    try{
      const data = await fetch(`${process.env.REACT_APP_LOCAL_URL}/question/${questionId}/addanswer/${ansId}`,
    {
      method: "PATCH",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const jsondata = data.json();
    if(jsondata.msg === "success"){
      console.log(jsondata.question)
      setQuestion(jsondata.question)
    }
  }catch(error){
    console.log(error,"error")
  }

  }

  const postAnswer = async (e) => {
    e.preventDefault()
    const newAnswer = {
      answer: ansDet,
      user: user
    };
    console.log(newAnswer, "hi");
    const jsondata = await fetch(
      `${process.env.REACT_APP_LOCAL_URL}/answer/${questionId}/addanswer`,
      {
        method: "POST",
        body: JSON.stringify(newAnswer),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await jsondata.json();
    if (data.status === 200) {
      console.log(data.ans);
      updateQuesAns(data.ans._id)                           
      swal.fire({
        title: data.msg,
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setAnswer(data.ans)
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
    e.target.reset();
    setAnsDet("")
  };

  const delAns = async (answerid) => {
    const jsondata = await fetch(
      `${process.env.REACT_APP_LOCAL_URL}/answer/${answerid}/delete`,
      {
        method: "DELETE",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await jsondata.json();
    if (data.status === 200) {
      swal.fire({
        title: data.msg,
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate(`/question/${questionId}id`);
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

  const addvote = async () => {
    const jsondata = await fetch(
      `${process.env.REACT_APP_LOCAL_URL}/question/${question.id}/votes/${user.id}`,
      {
        method: "PUT",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await jsondata.json();
    if(data.msg === "success"){
      console.log("done", data.question)
      setQuestion(data.question)
    }
  }

  return (
    <div className="oneques">
      <div className="anslen">
        <div className="arrows">
        <ArrowDropUpIcon className="hovering"/>
        <h2>{answer.length > 0 ? answer.length : "0"} </h2>
        <ArrowDropDownIcon className="hovering"/>
        </div>
        <div className="likecomp">{question? question.votes.length : null}
        <ThumbUpIcon onClick = {()=>addvote()} className="like hovering" fontSize="small"/>
        </div>
      </div>
      <div className="answerp">
        <div className="top">
          <div>{quesContent}</div>
          <button className="button ht" onClick={() => addQuestionbutton()}>
            Ask Question
          </button>
        </div>
        <div className="allanswer">
          {answer.length > 0 ? (
            answer.map((ans, index) => (
              <div key={index} className="anscard">
                <div className="row1">
                  <p className="para">{parse(ans.answer)}</p>
                </div>
                {/* <div className="row2">
                  <SyntaxHighlighter language={ans.language} style={docco}>
                    {ans.code}
                  </SyntaxHighlighter>
                </div> */}
                <div className="row3">
                  <p className="itm bold para">{ans.user.userName}</p>
                  <p className="itm para">{new Date(ans.time).toLocaleString()}</p>
                  <p className="itm para">{ans.vote} vote</p>
                </div>
                {ans.user.userId === user.id ? (
                  <div>
                    {/* <button onClick={()=> editAns(ans.answerid)}>edit</button> */}
                    <button className="button" onClick={() => delAns(ans.answerid)}>delete </button>
                  </div>
                ) : null}
              </div>
            ))
          ) : (null
          )}
        </div>
        {authTokens ? (
          <form className="comans" onSubmit={(e) => postAnswer(e)}>
            <h3 className="anstop">Post your answer</h3>
              <InputLabel id="demo-simple-select-label" size="small">
                Explain your answer in words*
              </InputLabel>
            <div>
              <ReactQuill
                modules={quillModule}
                // className= "react-quill"
                theme="snow"
                name="ansdet"
                value={ansDet}
                onChange={setAnsDet}
              />
            </div>
            <button className="button" type="submit" >
              Post Answer
            </button>
          </form>
        ) : (
          <p>Login or signup to post your answer</p>
        )}
      </div>
    </div>
  );
}

export default OneQuestion;
