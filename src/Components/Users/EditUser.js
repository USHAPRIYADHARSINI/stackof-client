import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useContext } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import CountrySelect from "./CountrySelect";
import {  useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list';
import AuthContext from "../AuthContext";
const swal = require('sweetalert2');

export default function EditUser() {
  const [open, setOpen] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [jobErr, setJobErr] = useState(false);
  const [locationErr, setLocationErr] = useState(false);
  const [location, setLocation] = useState('')
  const [name, setName]= useState('');
  const [pp, setPp]= useState('');
  const [job, setJob]= useState('');
  
  const options = useMemo(() => countryList().getData(), [])
  const changeHandler = (location) => {
    setLocation(location)
    console.log(location)
  }

  const navigate = useNavigate();
  const userdet = localStorage.getItem("UserDetails")
  const [userDetail, setUserDetail] = useState({
    name: userdet.name,
    job: userdet.job,
    location: userdet.location,
    pp:userdet.pp
  })

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
    setJob('')
    setPp('')
    setLocation('')
    };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    // setOpen(false);
    setNameErr(false);
    setJobErr(false);
    setLocationErr(false);
    handleAllClear();
  };

  const { EditUser, user } = useContext(AuthContext);

  const handleEdit = async (e) => {
    e.preventDefault();
    // console.log(location)

    const newUserEdit = {
      name: name,
      location: location, 
      job:job,
      pp:pp,
      email:user.email
    }

    console.log(newUserEdit)

    if (name == "") {
      setNameErr(true);
    }

    if (location == "") {
      setLocationErr(true);
    }
    if (job == "") {
      setJobErr(true);
    }

   if(name.length > 0 && location !== null && job.length > 0){
    EditUser(newUserEdit, handleClose);
  }else{
      alert("Kindly fill all the required fields")  
  }
  };

  return (
    <div>
        <Button variant="filled" onClick={handleClickOpen}>
        Edit user details
      </Button>
      <Dialog sx={{ padding: 1 }} open={open} onClose={handleClose}>
        <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
        />
        <DialogTitle>Edit user profile</DialogTitle>
        <div className="dialog">
          <form noValidate autoComplete="off" onSubmit={handleEdit}>
            <TextField
              onChange={(e)=> setUserDetail(e.target.value)}
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
              value={userDetail.name}
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
            <Select id="loc" options={options} onChange={changeHandler} name="location" value={location} error={locationErr}/>

            <Button variant="filled" onClick={()=>handleClickClose}>
              Cancel
            </Button>
            <Button variant="filled" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
