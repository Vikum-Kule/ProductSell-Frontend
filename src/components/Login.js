import React ,{useState}from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Avatar, TextField, Button, Stack, Typography, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LockIcon from '@mui/icons-material/Lock';
import { pink } from '@mui/material/colors';
import Validation from './Validation';
import {userLogin} from '../services/Auth';
// import { Link } from 'react-router-dom';




const useStyles = makeStyles({
    paper:{
      padding:"20px",
    //   height:"{{ xs: 1, sm: 1, md: 3 }}",
      width:"40vh",
      margin:"20vh auto"
  
    },
    header:{
        marginTop:"0px"
    },
    headerTxt:{
        marginTop:"0px"
    }, 

})

function Login(props) {

    const [showError, setShowError] = useState("");

    const [values, setValues] = useState({
        email:"",
        password:"",
    });

    const [errors, setErrors]= useState({});

    const handleChange=(event)=>{
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }

    const hanldeFormSubmit = async(event)=>{
        event.preventDefault();
        setErrors(Validation(values));
        // if(!errors || errors !== {} || errors.length !== 0){ 
        //     let result = await userLogin(values.email, values.password);
        //     console.log(result);
        // }
    }

    const resetError = (event)=>{
        setErrors({});
    }



    const classes = useStyles()
    return (
        <Grid>
            <Paper elevation={10} className={classes.paper}>
            <Grid align="center" className={classes.header} container spacing={{ xs: 0, sm: 1, md: 1 }} >
                <Grid item xs={12}>
                <h2>Product Sell </h2> 
                </Grid>
                <Grid item xs={12}>   
                <Avatar sx={{ bgcolor: pink[500] }}>
                    <LockIcon />
                </Avatar>
                </Grid>
                <Grid item xs={12}>
                <h3 className={classes.headerTxt}>Sign in</h3>
                </Grid>
                <Grid item>
                {showError ? (
                    <Grid container>
                    <Typography
                        align="left"
                        variant="caption"
                        style={{
                        color: "red",
                        fontSize: 16,
                        fontWeight: "bold",
                        paddingLeft: 40,
                        }}
                    >
                        {showError}
                    </Typography>
                    </Grid>
                ) : null}
                </Grid>
                <Grid item xs={12}>
                <Stack direction={"column"} spacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid container direction={"column"} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
                    <Grid item>
                        <TextField 
                            error={errors.email}
                            id="email"
                            type="email" 
                            label="Email" 
                            variant="standard"
                            fullWidth
                            required
                            name="email" 
                            value={values.email}
                            onChange={handleChange}
                            className={classes.inputContainer}
                            helperText={errors.email}
                            onClick={resetError}
                        />
                    </Grid>
                    <Grid item>    
                        <TextField
                            error={errors.password}
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            fullWidth
                            required
                            name="password" 
                            value={values.password}
                            onChange={handleChange}
                            className={classes.inputContainer}
                            helperText={errors.password}
                            onClick={resetError}
                        />
                    </Grid>
                </Grid>
                <Button 
                className={classes.btnSignin}
                variant="contained"
                fullWidth
                onClick={hanldeFormSubmit}
                >
                    Sign in
                </Button>
                
            </Stack>
            <Typography align="center" sx={{ m: 2 }} className={classes.forgotpss}>
                <Link 
                href="#"
                underline="hover"
                >
                Forgot password?
                </Link>
            </Typography>
            </Grid>
            </Grid>
            </Paper>
        </Grid>
    )
}

Login.propTypes = {

}

export default Login;

