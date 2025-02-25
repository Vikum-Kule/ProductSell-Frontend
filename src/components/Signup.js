import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Stack,
  Typography,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { pink } from "@mui/material/colors";
import Validation from "../Validation/Validation";
import { userRegister } from "../services/Auth";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  paper: {
    padding: "20px",
    width: "60vh",
    margin: "20vh auto",
  },
  header: {
    marginTop: "0px",
  },
  headerTxt: {
    marginTop: "0px",
  },
});

function Signup() {
  const history = useHistory();
  const [showError, setShowError] = useState("");

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // setErrors(Validation(values));
    // if (!errors || errors !== {} || errors.length !== 0) {
    //   let result = await userRegister(values);
    //   console.log("result--", result);
    //   if (result === "done") {
    //     history.push("/login");
    //   } else {
    //     setShowError(result);
    //   }
    // }
  };

  const resetError = () => {
    setErrors({});
  };

  const classes = useStyles();
  return (
    <Grid>
      <Paper elevation={10} className={classes.paper}>
        <Grid align="center" className={classes.header}>
          <h2>NORTEL (PVT) LTD</h2>
          <Avatar sx={{ bgcolor: pink[500] }}>
            <PersonAddIcon />
          </Avatar>
          <h3 className={classes.headerTxt}>Sign Up</h3>
        </Grid>
        {showError && (
          <Typography
            align="left"
            variant="caption"
            style={{ color: "red", fontSize: 16, fontWeight: "bold" }}
          >
            {showError}
          </Typography>
        )}
        <Stack direction="column" spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            required
            value={values.firstName}
            onChange={handleChange}
            onClick={resetError}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            required
            value={values.lastName}
            onChange={handleChange}
            onClick={resetError}
          />
          <TextField
            select
            label="User Role"
            name="role"
            fullWidth
            required
            value={values.role}
            onChange={handleChange}
            onClick={resetError}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </TextField>
          <TextField
            label="Phone Number"
            name="phone"
            type="tel"
            fullWidth
            required
            value={values.phone}
            onChange={handleChange}
            onClick={resetError}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            value={values.email}
            onChange={handleChange}
            onClick={resetError}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            value={values.password}
            onChange={handleChange}
            onClick={resetError}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            required
            value={values.confirmPassword}
            onChange={handleChange}
            onClick={resetError}
          />
          <Button variant="contained" fullWidth onClick={handleFormSubmit}>
            Sign Up
          </Button>
        </Stack>
        <Typography align="center" sx={{ m: 2 }}>
          Already have an account? <a href="/">Sign in</a>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Signup;
