import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider, InputBase, alpha } from "@mui/material";
import "./Question.css";
import "./Addquestion";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Question() {
  const [ques, setQues] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);
  const [search, setSearch] = useState("");
  const [searchdata, setSearchdata] = useState([]);
  const navigate = useNavigate();

  const fetchQues = () => {
    fetch(`${process.env.REACT_APP_LOCAL_URL}/question/alltag`)
      .then((data) => data.json())
      .then((data) => {
        setQues(data);
        setAllQuestion(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchQues();
    if (allQuestion.length > 0) console.log(allQuestion);
  }, []);

  useEffect(() => {
    async function dataset() {
      // const data = await fetchData();
      console.log(allQuestion, ques);
      try {
        console.log("success", search.toLowerCase());
        // const ser = search.toLocaleLowerCase().split(" ")
        console.log(search);
        const filteredSearch = ques.filter((m) => {
          if (m.tag === "" || search === "") return m;
          else {
            return m.tag.toLowerCase().includes(search.toLowerCase());
          }
        });

        if (filteredSearch.length === 0) {
          console.log(filteredSearch);
          setAllQuestion(filteredSearch);
          //  console.log(allQuestion)
        } else {
          console.log(filteredSearch);
          setAllQuestion(filteredSearch);
          //  console.log(allQuestion)
        }
      } catch (error) {
        console.log("Error in fetching");
      }
      console.log(allQuestion);
    }
    dataset();
  }, [search, setSearch]);

  return (
    <div className="containerq">
      <div className="questioncont">
        <div className="questions">
          <h1 className="heading">All Questions by tag</h1>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Search>
          <button className="button" onClick={() => navigate("/addquestion")}>
            Ask Question
          </button>
        </div>
        <h3 className="heading2">
          {allQuestion.length > 0 ? allQuestion.length : "0"} questions
        </h3>
        <Divider />
        <div className="allquestion">
          {allQuestion.length > 0 ? (
            allQuestion.map((question, index) => (
              <div key={index} className="quescard">
                <div className="col1">
                  <p className="items bold">{question.vote} votes</p>
                  <p className="items">{question.answer} answers</p>
                  <p className="items">{question.view} views</p>
                </div>
                <div className="col2">
                  <p>{question.question}</p>
                  <div className="col3">
                    <p className="items tag">{question.tag}</p>
                    <div>
                      <p className="items blue">{question.userName}</p>
                    </div>
                    <p className="items time">{question.time}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No such items found</p>
          )}
        </div>
      </div>
      <div className="box">hello</div>
    </div>
  );
}

export default Question;
