/** @format */

import React, { useState, useContext } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined, AlignLeftOutlined } from "@ant-design/icons";

import * as ROUTES from "../../constants/routes";
import ForgotPassword from "./ForgotPassword";
import UserContext from "../contexts/UserContext";

const Login = ({ history }) => {
    const [loginState, setLoginState] = useState({ error: null, loading: null });
    const { error, loading } = loginState;
    const [authToken, setAuthToken] = useContext(UserContext);

	const onFinish = async (values) => {
		// const { email } = values;
		try {
			// Have loading symbol turned on
			setLoginState({ loading: true });
			// Get user information + token
			const res = await fetchData(values);
			console.log(res)
			// Update state with form values, token, loading=false
			setLoginState({ error: null, loading: false });
			// Check if res has jwt
			if (res.token) {
				// 	// Update auth context with jwt
				setAuthToken(res);
				// 	// Switch to home page
				history.push(`${ROUTES.HOME}${ROUTES.DASHBOARD}`);
			} else {
				setLoginState({ error: res.info.message, loading: false });
			}
		} catch (e) {
			console.log(e.message);
		}
	};

    async function fetchData(values) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_ROOT}/users/sign_in`, {
							method: "POST",
							mode: "cors",
							credentials: "include",
							body: JSON.stringify(values),
							headers: { "Content-Type": "application/json" },
						});
            const message = await response.json();
            const token = response.headers.get("authorization");

					return { info: { ...message }, token };
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className=" col-4 contain">
            <h1>
                Welcome to CTD's School
                <span className="span-txt">
                    This website is your main hub for class materials for Code the
                    Dream’s classes.
                </span>
            </h1>

			<div className='form'>
				<h2>Sign In</h2>
				{
					authToken ? (
						<div>
							You are signed in
						</div>
					) : (
						<div className='col-10 mx-auto'>
							<Form
								name='normal_login'
								className='login-form'
								initialValues={{
									remember: true,
									email: "user2@gmail.com",
									password: "123456"
								}}
								onFinish={onFinish}
							>
								<Form.Item
									name='email'
									rules={[
										{
											required: true,
											type: 'email',
											message: 'Enter a valid email address'
										}
									]}
									help={error ? error.error : null}
									hasFeedback
									validateStatus={loading ? 'validating' : null}
								>
									<Input 
										prefix={<UserOutlined 
										className='site-form-item-icon' />} 
										placeholder='email' 
										// defaultValue="user1@gmail.com"
									/>
								</Form.Item>
								<Form.Item
									name='password'
									rules={[
										{
											required: true,
											message: 'Enter your password'
										}
									]}
									hasFeedback
									validateStatus={loading ? 'validating' : null}
								>
									<Input 
										prefix={<LockOutlined className='site-form-item-icon' />} 
										type='password' 
										placeholder='password'
										// defaultValue="123456"
									/>
								</Form.Item>
								<Form.Item>
									<div className='login-form-forgot'>
										<ForgotPassword />
									</div>
								</Form.Item>
								<Form.Item>
									<Button type='primary' htmlType='submit' className='login-form-button button-hover' id='validating'>
										Login
									</Button>
								</Form.Item>
							</Form>
							
							<div align="center" style={{ color: "red" }}>
								{loginState.error ? loginState.error : null}
							</div>
						</div>
					)
				}
			</div>
		</div>
	);
};
export default Login;