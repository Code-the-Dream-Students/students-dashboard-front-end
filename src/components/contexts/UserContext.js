import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import _ from "lodash";

const Context = React.createContext();

export const UserStore = ({ children }) => {
	let history = useHistory();
	const [cookies, setCookie] = useCookies(['auth_token']);
	const [authToken, setAuthToken,] = useState(cookies['auth_token']);
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		if (authToken && _.isEmpty(cookies)) {
			setCookie('auth_token', authToken.token, { path: '/' });
			setUserInfo(authToken.info);
		}
	}, [authToken])

	useEffect(() => {
		if (!_.isEmpty(cookies)) {
			const getData = async () => {
				const response = await fetch('https://forked-student-dashboard.herokuapp.com/user', {
					method: 'GET',
					mode: 'cors',
					credentials: 'include',
					headers: { 'Content-Type': 'application/json', 'Authorization': authToken }
				});
				const data = await response.json();

				setUserInfo(data);
			};
			getData();
		}
	}, [authToken]);

	return (
		<Context.Provider
			value={[authToken, setAuthToken, userInfo, setUserInfo]}
		>
			{children}
		</Context.Provider>
	)
}

export default Context;
