import {createContext, useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
const swal = require('sweetalert2');

const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("Authorization")
            ? JSON.parse(localStorage.getItem("Authorization"))
            : null
    );

    const [user, setUser] = useState(() => 
    localStorage.getItem("UserDetails")
        ? localStorage.getItem("UserDetails")
        : null
);

//     const getUser = async (authTokens) => {
//         console.log(authTokens)
//         const userdecode = await jwt_decode(JSON.parse(localStorage.getItem("Authorization")))
//         console.log(userdecode)
        
//        await fetch(`${process.env.REACT_APP_LOCAL_URL}/users/${userdecode.id}`)
//         .then((jsondata)=> jsondata.json())
//         .then((data)=> setUser(data))
//         .catch((error)=> console.log(error));
// }
    


    const [loading, setLoading] = useState(true);
    // const [logindata, setlogindata]= useState(null)

    const navigate = useNavigate();



    const loginUser = async (email, password, handleClose ) => {
        const data = await fetch(`${process.env.REACT_APP_LOCAL_URL}/users/login`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        // const data = await response.json()
        // console.log(data);
        // .then((data)=>data.json())
        const logindata = await data.json()
        // .then((data)=> setlogindata(data))

        if(data.status === 200){
            console.log("Authorization",JSON.stringify(logindata.token))
            // setUserid(jwt_decode(logindata.token))
            // getUser(authTokens)
            console.log(logindata)
            localStorage.setItem("Authorization",JSON.stringify(logindata.token))
            localStorage.setItem("UserDetails", JSON.stringify(logindata.userDetail) )          
            setAuthTokens(logindata.token)
            setUser(logindata.userDetail) 
            console.log("user",user, "userDetails", localStorage.getItem("UserDetails"), "token", authTokens);
            handleClose()
            navigate("/question")
            swal.fire({ 
                title: "Login Successful",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })

        } else {    
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
    }

    const registerUser = async (newUser, handleClose) => {
        console.log(process.env.REACT_APP_LOCAL_URL)
        const response = await fetch(`${process.env.REACT_APP_LOCAL_URL}/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newUser)
        })
        if(response.status === 200){
            handleClose()
            navigate("/")
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("Authorization")
        localStorage.removeItem("UserDetails")
        navigate("/")
        swal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    const EditUser = async (newUserEdit, handleClose) =>{
        const response = await fetch(`${process.env.REACT_APP_LOCAL_URL}/users/edituser`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newUserEdit)
        })
        if(response.status === 200){
            handleClose()
            console.log("Authorization",JSON.stringify(response.token))
            setAuthTokens(response.token)
            setUser(jwt_decode(response.token))
            localStorage.setItem("Authorization",JSON.stringify(response.token))
            console.log("Data Edited");
            console.log(response.token)
            navigate("/")
            swal.fire({
                title: "User Successfully Edited",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        EditUser
    }



    useEffect(() => {
        const istoken = localStorage.getItem("Authorization")
        if(istoken){
            setAuthTokens(JSON.parse(localStorage.getItem("Authorization")))
            setUser(JSON.parse(localStorage.getItem("UserDetails")))
        }
        console.log(authTokens, "no token")
        setLoading(false)
    }, [setUser, setAuthTokens, loading])


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}