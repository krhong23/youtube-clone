import React, {useEffect} from 'react';
import {authUser} from "../actions/user_action";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function (CompoesedClass, reload, adminRoute = null) {

    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(authUser())
                .then(async response => {

                    if (await !response.payload.isAuth) {
                        // 로그인하지 않은 상태
                        if (reload) {
                            navigate('/login')
                        }
                    } else {
                        // 로그인한 상태
                        if (adminRoute && !response.payload.isAdmin) {
                            navigate('/')
                        } else {
                            if (reload === false)
                                navigate('/')
                        }
                    }
                })
        }, [dispatch])
        return (<CompoesedClass {...props} user={user}/>)
    }

    return AuthenticationCheck;
}