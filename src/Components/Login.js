import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import AuthContext from './AuthContext';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [emailErr,setEmailErr] = useState(false)
  const [passwordErr,setPasswordErr] = useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { loginUser } = useContext(AuthContext);

  const handleLogin = async(e) => {
    
    e.preventDefault()

    setEmailErr(false)
    setPasswordErr(false)

    if(email == ""){
      setEmailErr(true)
    }
    if(password == ""){
      setPasswordErr(true)
    }
    
    email.length > 0 && loginUser(email, password, handleClose);

  };

  return (
    <div>
      <Button variant="filled" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{padding: 1}} >
      <Typography
            variant='h6'
            color="textSecondary"
            component="h2"
            gutterBottom
          />
        <DialogTitle>Login</DialogTitle>
        <div className='dialog'>
        <form noValidate autoComplete='off' onSubmit={handleLogin} >
          <TextField
            onChange={(e)=>setEmail(e.target.value)}
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            required
            color="secondary"
            error={emailErr}
          />
          <TextField
            onChange={(e)=>setPassword(e.target.value)}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            required
            color="secondary"
            error={passwordErr}
          />
          <Button variant="filled" onClick={handleClose}>Cancel</Button>
          <Button variant="filled" type='submit'>Login</Button>
        </form>
        </div>
      </Dialog>
    </div>
  );
}