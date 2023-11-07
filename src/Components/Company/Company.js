import React, { useEffect, useState } from "react";
import { Divider, IconButton, TextField } from "@mui/material";
import "./Company.css";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Company() {
  const [allCompany, setAllCompany] = useState([]);
  var content = null;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_LOCAL_URL}/company`)
      .then((data) => data.json())
      .then((data) => setAllCompany(data))
      //   .then((data) => console.log(data))
      .catch((error) => console.log(error));
    // console.log(allCompany);
  }, []);


  if (allCompany) {
    content = allCompany.map((company, index) => (
      <div key={index} className="companycard">
        <img src={company.logo} className="logo" />
        <div className="companycontainer">
          <p className="companyname">{company.name}</p>
          <p className="companylocation">{company.location}</p>
          <p className="obj">{company.objective}</p>
          <div>
            {company.field ? <p className="field">{company.field}</p> : null}
          </div>
          <Divider />
        </div>
      </div>
    ));
  }

  return (
    <div className="companypage">
      <div>
        <h1 className="heading">Companies</h1>
        <p className="classp">
          Learn about what it's like to work at companies
        </p>
      </div>
      <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
      <p>{content.length}</p>
      <Divider />
      <div className="allcompany">{content}</div>
    </div>
  );
}

export default Company;
