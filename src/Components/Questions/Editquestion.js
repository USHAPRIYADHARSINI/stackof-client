import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; //react quill css
import { TagsInput } from "react-tag-input-component";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
const swal = require("sweetalert2");

function Editquestion({ questionId }) {
  const [question, setQuestion] = useState('')
  const [language, setLanguage] = useState("");
  const [selected, setSelected] = useState([""])

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(()=>{
    const data = fetch(`${process.env.REACT_APP_LOCAL_URL}/question/${questionId}/get`)
    const jsondata = data.json()
    if(jsondata.status === 200){
      setQuestion(jsondata.question)
    }
  },[])

  const handleSubmit= async () => {
    console.log(question)
    const data = await fetch(`${process.env.REACT_APP_LOCAL_URL}/question/${questionId}/edit`,{
      method: "PATCH",
      body: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const jsondata = await data.json()
    if(jsondata.status === 200){
      swal.fire({
        title: jsondata.msg,
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate("/question")
    }else{
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
  }
  return (
    <div>{question? 
      <div className="allcontainer">
      <h2>Edit your question</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="title">
          <h4 className="h">Title</h4>
          <p className="para">
            Be specific and imagine you're asking a question to another person.
          </p>
          <TextField
            onChange={(e) => setQuestion(e.target.value)}
            margin="dense"
            id="question"
            type="string"
            fullWidth
            variant="outlined"
            required
            color="secondary"
            size="small"
            name="question"
            value={question.question}
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
            className="react-quill"
            theme="snow"
            name="quesdet"
            value={question.quesDet}
            onChange={setQuestion}
            // modules={toolbarOptions}
          />
          {/* <button className="button">Next</button> */}
        </div>
        <div className="title">
          <h4 className="h">Details</h4>
          <p className="para">
            Add the code if needed to explain your problem.
          </p>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={question.language}
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
            onChange={(e) => setQuestion(e.target.value)}
            margin="dense"
            id="code"
            type="string"
            fullWidth
            variant="outlined"
            required
            color="secondary"
            size="small"
            name="code"
            value={question.code}
          />
          {/* <p>{console.log("ques",questionobj)}</p> */}
        </div>

        <div className="title">
          <h4 className="h">Tags</h4>
          <p className="para">
            Add up to 5 tags to describe what your question is about. Start
            typing to see suggestions.
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
          Submit
        </button>
        <button className=" b" onClick={() => navigate("/question")}>
          Cancel
        </button>
      </form>
    </div>
    :null}</div>
  )
}

export default Editquestion