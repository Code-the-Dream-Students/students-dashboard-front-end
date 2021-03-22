import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect } from "react-router-dom";

import * as ROUTES from '../../constants/routes';
import UserContext from '../contexts/UserContext';

const GithubAuth = ({ history }) => {
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

        return data;
    };

    useEffect(() => {
        const navigate = async () => {
            if (token === 'false') {
                history.push('/');
            } else {
                const data = await getData(token);
                setAuthToken({ info: data, token });

                history.push('/home/dashboard');
            }
        }
        navigate();

    }, [])

    return (
        <></>
    )
}

export default GithubAuth;