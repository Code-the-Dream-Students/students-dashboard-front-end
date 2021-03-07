import React, { useEffect, useState, useContext } from 'react';
import Airtable from 'airtable';
import { Card, Row, /* Col, */ Typography, Button, Form, Input, message } from 'antd';
import { StyledDivSummary } from "./styles";
import { StyledPass } from './styles';
import UserContext from '../../../contexts/UserContext';

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};

const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

//MF:should there be a delay to check and then a condition if successful then the message displays?
const success = () => {
	message.success('Your password has been changed');
};

const base = new Airtable({ apiKey: process.env.REACT_APP_USER_INFO_API_KEY }).base('appm5NPkqO7P8ePUK');
//MF: fetch call only handled in context?
// const [password, SetPassword]=useState();

// fetch(process.env.REACT_APP_USER_INFO_API_KEY)
//   .then(response=>response.json())
// .then((data)=>{
//   SetPassword: [] //MF: comes from User Context?
// });
// SetPassword: ()
// console.log(response)


// useEffect(()=>{
//   checkOldPass()
// },[])

const ChangePass = () => {
	// const checkOldPass =()=>{
	// const [userInfo, dispatchUser] = useContext(UserContext);
	const [userInfo, setUserInfo] = useContext(UserContext);
	const updateUser = (values) => {
		const { id, ...rest } = values;
		base('User_Info_Table').update([
			{
				"id": id,
				"fields": {
					...rest
				}
			}
		], function (err, records) {
			if (err) {
				console.error(err);
				return;
			}
			records.forEach(function (record) {
				console.log(record.get('Password'));
			});
		});
		// dispatchUser({type: "all", payload: { field: "all", value: values}});
	};
	//   };

	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {
		// checkOldPass()
	}, [])//MF: need to clear inputs after submit

	return (

		<Card>
			<Typography.Title level={4}>Change Password</Typography.Title>
			<Row>
				<StyledPass>
					<Form
						{...layout}
						name="basic"
						// initialValues={{
						//     remember: true,
						// }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="new-password"
					>
						<Form.Item
							label="Old Password"
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your current password!',
								},
							]}
						>
							{/* <StyledPass> */}
							<Input.Password />
							{/* </StyledPass> */}
						</Form.Item>

						<Form.Item
							label="New Password"
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your new password!',
								},
							]}
							hasFeedback
						>
							<Input.Password
								// value={userInfo}
								// onChange={e=> dispatchUser(e.target.value)}
								onClick={e => e.target.setSelectionRange(0, e.target.value.length)}//MF: may not be needed bc it is established 
							/>
						</Form.Item>

						<Form.Item
							label="Repeat Password" style={{ width: 400 }}
							name="password"
							dependencies={['password']}
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Please confirm your password!',
								},
								({ getFieldValue }) => ({
									validator(rule, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}

										return Promise.reject('The two passwords that you entered do not match!');
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>
					</Form>
				</StyledPass>
			</Row>
			<StyledDivSummary>
				<Button type="primary" disabled>Cancel</Button>
				<Button type="primary" htmlType="submit" onClick={success}>Change Password</Button>
			</StyledDivSummary>
		</Card>
	)
};

export default ChangePass

