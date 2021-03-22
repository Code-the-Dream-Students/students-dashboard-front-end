import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

import * as ROUTES from '../../constants/routes';
import UserContext from '../contexts/UserContext';

const GithubAuth = ({ history }) => {
    const [t, setT] = useState();
    // const [cookies, setCookie] = useCookies();
    const [authToken, setAuthToken, , setUserInfo] = useContext(UserContext);
    const search = new URLSearchParams(useLocation().search);
    const token = search.get('val');

    const getData = async (token) => {
        const response = await fetch('https://forked-student-dashboard.herokuapp.com/user', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Authorization': token }
        });
        const data = await response.json();
        console.log(data)
        return data;
    };

    useEffect(() => {
        const navigate = async () => {
            if (token === 'false') {
                // history.push('/');
            } else {
                const data = await getData(token);
                setAuthToken({ info: data, token });
                // setCookie('auth_token', token);
                // setT(true);
                // if (authToken) setT(token);
                history.push('/home/dashboard');
            }
        }
        navigate();

    }, [])

    // const login = () => {
    //     setAuthToken({ token });
    //     // setCookie('auth_token', token);
    //     return <Redirect to="/home/dashboard" />
    // }

    console.log(authToken)

    return (
        // authToken ? <Redirect to="/home/dashboard" /> : <Redirect to="/" />
        <></>
    )
}

export default GithubAuth;