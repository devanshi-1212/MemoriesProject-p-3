import {GoogleLogin} from 'react-google-login';
import { useDispatch } from 'react-redux';

const clientId="1069109333761-6luhijjhgb098cmi0ebcrlffvh1v8p7n.apps.googleusercontent.com";

function Login() {

    const onSuccess = async (res) => {
        console.log("login success! current user: ", res.profileObj);
    };

    const onFailure=(res)=>{
        console.log("login failed! res: ", res);
    };

    return(
        <div id="signInButton">
            <GoogleLogin 
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;