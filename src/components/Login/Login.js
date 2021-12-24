import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import firebase from "firebase/app";
import firebaseConfig from "./firbase.config";
// import { Button } from "react-bootstrap";
import Button from "@mui/material/Button";
import {
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const Login = () => {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [newUser, setNewUser] = useState(false);

  const [users, setUsers] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: "",
    password: "",
    error: "",
    success: false,
  });
  //   if (firebase.apps.length === 0) {
  //     firebase.initializeApp(firebaseConfig);
  //   }
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const provider = new GoogleAuthProvider(db);

  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
        };
        setUsers(signedInUser);
        console.log(signedInUser);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error.message);
      });
  };
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then((result) => {
        const signedInUser = {
          isSignIn: false,
          displayName: "",
          email: "",
        };
        setUsers(signedInUser);
      })
      .catch((error) => {
        console.log(error.message);
        // An error happened.
      });
  };

  const handleEmailChange = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasValid = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasValid;
    }
    if (isFieldValid) {
      const newUserInfo = { ...users };
      newUserInfo[e.target.name] = e.target.value;
      setUsers(newUserInfo);
    }
  };

  const handleFormSubmit = () => {
    if (newUser && users.email && users.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, users.email, users.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...users };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUsers(newUserInfo);
          console.log(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...users };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUsers(newUserInfo);
        });
    }
  };

  if (!newUser && users.email && users.password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, users.email && users.password)
      .then((res) => {
        const newUserInfo = { ...users };
        newUserInfo.error = "";
        newUserInfo.success = true;
        setUsers(newUserInfo);
      })
      .catch((error) => {
        const newUserInfo = { ...users };
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUsers(newUserInfo);
      });
  }

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <div className="text-center mt-5">
      <div>
        <h2>This is login page</h2>
        <h3>{users.name}</h3>
        <p>{users.email}</p>
        <br />
        <form onSubmit={handleFormSubmit}>
          <Checkbox
            onChange={() => setNewUser(!newUser)}
            {...label}
            
            color="secondary"
          />
          <label htmlFor="">New user</label>
          <br />
          {newUser && (
            <TextField
              className="mt-3"
              sx={{ m: 1, width: "40ch" }}
              type="text"
              name="name"
              id="outlined-basic"
              placeholder="type Your name "
              label="Name"
              variant="outlined"
            />
          )}
          <br />
          <TextField
            onBlur={handleEmailChange}
            className="mt-3"
            sx={{ m: 1, width: "40ch" }}
            type="text"
            name="email"
            id="outlined-basic"
            placeholder="enter email"
            label="Email"
            variant="outlined"
          />
          <br />
          <FormControl
            onBlur={handleEmailChange}
            sx={{ m: 1, width: "40ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              name="password"
              placeholder="enter password"
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <br />
          <Button
            sx={{ m: 1, width: "45ch" }}
            variant="contained"
            type="submit"
            value="submit"
          >
            {newUser ? 'Sign up' : 'Log in'}
          </Button>
          <br />
        </form>
        or
        <br />
        {users.isSignIn ? (
          <Button
            onClick={handleSignOut}
            sx={{ m: 1, width: "45ch" }}
            variant="contained"
          >
            google Sign out{" "}
          </Button>
        ) : (
          <Button
            onClick={handleSignIn}
            sx={{ m: 1, width: "45ch" }}
            variant="contained"
            color="secondary"
            className=""
          >
            google Sign in
          </Button>
        )}

        
      </div>
      {users.success && <p>User {newUser ?'created' : 'Logged in' } successfully</p>}
    </div>
  );
};

export default Login;
