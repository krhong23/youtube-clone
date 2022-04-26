import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../../../actions/user_action";

function RegisterPage(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // define state
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        // page가 refresh 되는 것을 방지
        event.preventDefault();
        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀버호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    navigate('/');
                } else {
                    alert('Failed to sign up')
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
                <label>Name</label>
                <input type='text' value={Name} onChange={onNameHandler}/>
                <label>Password</label>
                <input type='password' value={Password} onChange={onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <br/>
                <button>
                    Register
                </button>
            </form>
        </div>
    );

}

export default RegisterPage;