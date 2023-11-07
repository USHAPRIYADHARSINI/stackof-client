import "./App.css";
import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import React, {useState} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Addquestion from "./Components/Questions/Addquestion";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Question from "./Components/Questions/Question";
import Editquestion from "./Components/Questions/Editquestion";
import GetAllUsers from "./Components/Users/GetAllUsers";
import Company from "./Components/Company/Company";
import Tag from './Components/Questions/Tag';
import { AuthProvider } from "./Components/AuthContext";
// import EditUser from "./Components/Users/EditUser";
import OneQuestion from "./Components/Questions/OneQuestion";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c2c2c2",
    },
    secondary: {
      main: "#2196f3",
    },
  },
});

function App() {

const [questionId, setQuestionId] = useState('')

  return (
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <div className="App">
        <Topbar />
        <div className="side">
          <Sidebar />
          <div className="routing">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/question" element={<Question setQuestionId={setQuestionId} />} />
              <Route path={`/question/${questionId}id`} element={<OneQuestion questionId={questionId}/>} />
              <Route path="/company" element={<Company />} />
              <Route path={`/question/${questionId}id/edit`} element={<Editquestion questionId={questionId}/>} />
              <Route path="/addquestion" element={<Addquestion />} />
              <Route path="/users" element={<GetAllUsers/>} />
              <Route path="/tag" element={<Tag/>} />
            </Routes>
          </div>
        </div>
      </div>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
