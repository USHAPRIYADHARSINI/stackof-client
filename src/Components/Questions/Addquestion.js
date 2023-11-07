import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useState, useContext } from "react";
import "./addquestion.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; //react quill css
import { TagsInput } from "react-tag-input-component";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
const swal = require("sweetalert2");

function Addquestion() {
  const [selected, setSelected] = useState([""]);
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // const [language, setLanguage] = useState("");

  // const handleChange = (event) => {
  //   setLanguage(event.target.value);
  // };

    var toolbarOptions = [
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

  const questionobj = {
    question: question,
    // language: language,
    title: title,
    tags: selected,
    user: user,
  };

  const handleAllClear = () => {
    setSelected([""]);
    setQuestion("");
    setTitle("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(questionobj);
    console.log(user)

    if(questionobj.question && questionobj.title && questionobj.tags ){
      console.log(questionobj)
      await fetch(`${process.env.REACT_APP_LOCAL_URL}/question/create`, {
        method: "POST",
        body: JSON.stringify(questionobj),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.msg == "Question created") {
            // alert(data.msg);
            swal.fire({
              title: data.msg,
              icon: "success",
              toast: true,
              timer: 6000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false,
          })
            e.target.reset(); // to reset the form values to empty string
            // handleAllClear();
            navigate("/question");
          }else {
            console.log("there was a server issue");
            swal.fire({
                title: "Username or passowrd does not exists",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
        })
    }else{
      console.log("error occured in posting question")
      swal.fire({
        title: "Kindly check if all the necessary fields are filled",
        icon: "error",
        toast: true,
        timer: 6000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
    })
    }
  };

  return (
    <div className="allcontainer">
      <h2>Ask a public question</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="title">
          <h4 className="h">Title</h4>
          <p className="para">
            Be specific and imagine you're asking a question to another person.
          </p>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            margin="dense"
            id="question"
            type="string"
            fullWidth
            variant="outlined"
            required
            color="secondary"
            size="small"
            name="question"
            value={title}
          />
          {/* <p>{console.log("ques",questionobj)}</p> */}
        </div>
        <div className="title">
          <h4 className="h">What are the details of your problem?</h4>
          <p className="para">
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </p>
          <ReactQuill
            modules={quillModule}
            className="react-quill"
            theme="snow"
            name="quesdet"
            value={question}
            onChange={setQuestion}
          />
          {/* <button className="button">Next</button> */}
        </div>
        {/* <div className="title">
          <h4 className="h">Details</h4>
          <p className="para">
            Add the code if needed to explain your problem.
          </p>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label="language"
              onChange={handleChange}
            >
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="C++">C++</MenuItem>
              <MenuItem value="JAVA">JAVA</MenuItem>
              <MenuItem value="JS">JAVASCRIPT</MenuItem>
              <MenuItem value="PY">PYTHON</MenuItem>
              <MenuItem value="NJS">NODEJS</MenuItem>
              <MenuItem value="RUBY">RUBY</MenuItem>
              <MenuItem value="SQL">SQL</MenuItem>
              <MenuItem value="HTML">HTML</MenuItem>
              <MenuItem value="DJANGO">DJANGO</MenuItem>
            </Select>
          </FormControl>
          <TextField
            onChange={(e) => setCode(e.target.value)}
            margin="dense"
            id="code"
            type="string"
            fullWidth
            variant="outlined"
            required
            color="secondary"
            size="small"
            name="code"
            value={code}
          />
          {/* <p>{console.log("ques",questionobj)}</p> */}
        {/* </div> */} 

        <div className="title">
          <h4 className="h">Tags</h4>
          <p className="para">
            Add up to 5 tags to describe what your question is about. 
          </p>
          <TagsInput
            name="tags"
            placeHolder="Enter a new tag"
            value={selected}
            onChange={setSelected}
          />
          <p className="para">press enter or add coma to add new tag</p>
          {/* <button className="button">Next</button> */}
        </div>
        <button type="submit" className=" b">
          Post Question
        </button>
        <button className=" b" onClick={() => navigate("/question")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Addquestion;
