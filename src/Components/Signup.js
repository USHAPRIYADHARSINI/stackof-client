import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useContext } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import CountrySelect from "./CountrySelect";
import AuthContext from "./AuthContext";
import {  useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list';
const swal = require('sweetalert2');

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [jobErr, setJobErr] = useState(false);
  const [locationErr, setLocationErr] = useState(false);
  const [location, setLocation] = useState('')
  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [pp, setPp]= useState('');
  const [job, setJob]= useState('');
  
  const options = useMemo(() => countryList().getData(), [])
  const changeHandler = (location) => {
    setLocation(location)
    console.log(location)
  }

  const navigate = useNavigate();

  // const handleChange = (e, value) => {
  //   const { name, value } = e.target;
    // console.log(name,value)
    // console.log (e.target, value)
    // setNewUser((prev) => {
    //   return { ...prev, [name]: value };
    // });
  // };

  const handleAllClear = () => {
    setName('')
    setEmail('')
    setJob('')
    setPassword('')
    setPp('')
    setLocation('')
    };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNameErr(false);
    setEmailErr(false);
    setPasswordErr(false);
    setJobErr(false);
    setLocationErr(false);
    handleAllClear();
  };

  const { registerUser } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    // console.log(location)

    const newUser = {
      name: name, 
      email: email, 
      password: password, 
      location: location, 
      job:job,
      pp:pp
    }
    console.log(newUser)

    if (newUser.name == "") {
      setNameErr(true);
    }
    if (newUser.email == "") {
      setEmailErr(true);
    }
    if (newUser.password == "") {
      setPasswordErr(true);
    }
    if (newUser.location == "") {
      setLocationErr(true);
    }
    if (newUser.job == "") {
      setJobErr(true);
    }

   if(newUser.name.length > 0 &&
    newUser.email.length > 0 &&
    newUser.password.length > 0 &&
    newUser.location !== null &&
    newUser.job.length > 0){
    registerUser(newUser, handleClose);
  }else{
      alert("Kindly fill all the required fields")  
  }
  };

  return (
    <div>
      <Button variant="filled" onClick={handleClickOpen}>
        Signup
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ padding: 1 }}>
        <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
        />
        <DialogTitle>Enter details for new user signup</DialogTitle>
        <div className="dialog">
          <form noValidate autoComplete="off" onSubmit={handleSignup}>
            <TextField
              onChange={(e)=> setName(e.target.value)}
              margin="dense"
              id="name"
              label="Name"
              type="text"
              name="name"
              fullWidth
              variant="standard"
              required
              color="secondary"
              error={nameErr}
            />
            <TextField
              onChange={(e)=> setEmail(e.target.value)}
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              name="email"
              fullWidth
              variant="standard"
              required
              color="secondary"
              error={emailErr}
            />
            <TextField
              onChange={(e)=> setPassword(e.target.value)}
              margin="dense"
              id="password"
              label="Password"
              type="password"
              name="password"
              fullWidth
              variant="standard"
              required
              color="secondary"
              error={passwordErr}
            />
            <TextField
              onChange={(e)=> setPp(e.target.value)}
              margin="dense"
              id="pp"
              label="Profile picture"
              type="url"
              name="pp"
              fullWidth
              variant="standard"
              color="secondary"
            />
            <TextField
              onChange={(e)=> setJob(e.target.value)}
              margin="dense"
              id="job"
              label="Job description"
              type="string"
              name="job"
              fullWidth
              variant="standard"
              required
              color="secondary"
              error={jobErr}
              // value={job}
            />

            <label htmlFor="loc"style={{color: "gray", fontFamily: "sans-serif", fontSize: "small"}} required>Location *</label>
            <p>{location.label}</p>
            <Select id="loc" options={options} onChange={changeHandler} name="location" value={location}/>

            <Button variant="filled" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="filled" type="submit">
              Signup
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
