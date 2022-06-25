import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {loginUser} from "../../../actions/user_action";
import {useNavigate} from 'react-router-dom';
import Auth from "../../../hoc/auth";

function LoginPage(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // define state
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        // page가 refresh 되는 것을 방지
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    console.log(response.payload)
                    window.localStorage.setItem('userId', response.payload.userId);
                    navigate('/');
                } else {
                    alert('Error')
                }
            })
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                  onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type='email' value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Auth(LoginPage, false);