import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Avatar, TextField, Button, Stack, Typography, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LockIcon from '@mui/icons-material/Lock';
import { pink } from '@mui/material/colors';
// import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    paper:{
      padding:"20px",
      height:"50vh",
      width:"40vh",
      margin:"20vh auto"
  
    },
    header:{
        marginTop:"0px"
    },
    headerTxt:{
        marginTop:"0px"
    }, 
    forgotpss:{
        marginTop:"30px"
    }

})

function Login(props) {
    const classes = useStyles()
    return (
        <Grid>
            <Paper elevation={10} className={classes.paper}>
            <Grid align="center" className={classes.header} >    
                <Avatar sx={{ bgcolor: pink[500] }}>
                    <LockIcon />
                </Avatar>
                <h2 className={classes.headerTxt}>Sign in</h2>
            </Grid>
            <Stack direction={"column"} spacing={4}>
                <Grid container direction={"column"} spacing={1}>
                    <Grid item>
                        <TextField 
                            id="email"
                            type="email" 
                            label="Email" 
                            variant="standard"
                            fullWidth
                            required
                            className={classes.inputContainer}
                        />
                    </Grid>
                    <Grid item>    
                        <TextField
                            id="filled-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            fullWidth
                            required
                            className={classes.inputContainer}
                        />
                    </Grid>
                </Grid>
                <Button 
                className={classes.btnSignin}
                variant="contained"
                fullWidth
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
            </Paper>
        </Grid>
    )
}

Login.propTypes = {

}

export default Login

