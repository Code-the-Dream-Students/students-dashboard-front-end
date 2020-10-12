import React from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.css';

const Login = () => {
	const onFinish = (values) => {
		console.log('Received values of form: ', values);
	};

	return (
		<div className='col-4 contain'>
			<h1>Welcome!</h1>
			<div className='col-10 mx-auto'>
				<Form
					name='normal_login'
					className='login-form'
					initialValues={{
						remember : true
					}}
					onFinish={onFinish}
				>
					<Form.Item
						name='username'
						rules={[
							{
								required : true,
								message  : 'Please input your Username!'
							}
						]}
					>
						<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='username' />
					</Form.Item>
					<Form.Item
						name='password'
						rules={[
							{
								required : true,
								message  : 'Please input your Password!'
							}
						]}
					>
						<Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='password' />
					</Form.Item>
					<Form.Item>
						<a className='login-form-forgot' href='/'>
							Forgot password
						</a>
					</Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit' className='login-form-button button-hover'>
							Login
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};
export default Login;

//ReactDOM.render(<Login />, mountNode); MF:normally on the index page but not sure where this would go
