import React, {useState, useEffect} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import {signin, signup} from '../../actions/auth';

import LoginButton from '../My-OAuth/login';
import LogoutButton from '../My-OAuth/logout';
import {gapi} from 'gapi-script';
import Logout from '../My-OAuth/logout';

const clientId="1069109333761-6luhijjhgb098cmi0ebcrlffvh1v8p7n.apps.googleusercontent.com";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes=useStyles();
    const [showPassword, setShowPassword]=useState(false);
    const [isSignup, setIsSignup]=useState(false);
    const [formData, setFormData]=useState(initialState);
    const dispatch=useDispatch();
    const history=useNavigate();

    const handleShowPassword=()=>setShowPassword((prevShowPassword) => !prevShowPassword );

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);

        if(isSignup){
            dispatch(signup(formData, history));
        }

        else{
            dispatch(signin(formData, history));
        }
    };

    const handleChange=(e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    const switchMode=()=>{
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        console.log(res);

        const result = res?.profileObj;
        const token=res?.tokenId;

        try{
            dispatch({type: 'AUTH', data: {result, token}});
            history('/');
        }

        catch(error){
            console.log(error);
        }
    };

    const googleFailure=(error)=>{
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try again later.");
    };

    // useEffect(()=>{
    //     function start(){
    //         gapi.client.init({
    //             clientId: clientId,
    //             scope:""
    //         })
    //     };

    //     gapi.load('client:auth2', start);
    // });

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <> 
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                    )}

                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>

                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? "Sign Up" : "Sign In" }
                </Button>

                <GoogleLogin
                    clientId={clientId}
                    render={(renderProps) => (
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                        Google Sign In
                    </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />

                {/* <LoginButton />
                <LogoutButton /> */}

                <Grid container justify="flex-end" >
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignup ? "Already have an account? Sign In." : "Don't have an account? Sign Up." }
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
};

export default Auth;