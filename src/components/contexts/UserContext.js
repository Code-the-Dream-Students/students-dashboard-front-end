import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import _ from "lodash";

const Context = React.createContext();

export const UserStore = ({ children }) => {
	const [cookies, setCookie] = useCookies(['auth_token']);
	const [authToken, setAuthToken,] = useState(cookies['auth_token']);
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		if (authToken && _.isEmpty(cookies)) {
			setCookie('auth_token', authToken.token);
			setUserInfo(authToken.info);
		}
	}, [authToken])

	useEffect(() => {
		if (!_.isEmpty(cookies)) {
			try {
				const getData = async () => {
					const response = await fetch(`${process.env.REACT_APP_CURRENT_USER}`, {
						method: 'GET',
						mode: 'cors',
						credentials: 'include',
						headers: { 'Content-Type': 'application/json', 'Authorization': authToken }
					});
					const data = await response.json();
	
					setUserInfo(data);
				};
				getData();
			} catch (err) {
				console.error();
			}
		}
	}, [authToken]);

	console.log(userInfo)

	return (
		<Context.Provider
			value={[authToken, setAuthToken, userInfo, setUserInfo]}
		>
			{children}
		</Context.Provider>
	)
}

export default Context;
