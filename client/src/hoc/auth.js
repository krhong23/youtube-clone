import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {authUser} from "../actions/user_action";
import {useNavigate} from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(authUser())
                .then(response => {
                    console.log(response)

                    if (!response.payload.isAuth) {
                        // 로그인하지 않은 상태
                        if (option) {
                            navigate('/login')
                        }
                    } else {
                        // 로그인한 상태
                        if (adminRoute && !response.payload.isAdmin) {
                            navigate('/')
                        } else {
                            if (option === false)
                                navigate('/')
                        }
                    }
                })
        }, [])
        // return (<SpecificComponent/>)
    }

    return AuthenticationCheck;
}