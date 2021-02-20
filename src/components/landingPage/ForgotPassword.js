import React, { useState } from 'react';
import { Spin, Button, Modal, Form, Input, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ForgotPasswordForm = ({ visible, message, email, onSubmit, onCancel }) => {
	const [form] = Form.useForm();

	const onOk = () => {
		form
		.validateFields()
		.then((values) => {
			form.resetFields();
			onSubmit(values);
		})
		.catch((info) => {
		});
	}

	return (
		<Modal
			visible={visible}
			title="Reset your password"
			onCancel={onCancel}
			footer={[
				<Button key="back" onClick={onCancel}>
					Cancel
				</Button>,
				<Button key="submit" type="primary" disabled={email} onClick={onOk}>
					Submit
				</Button>
			]}
		>
			{ 
				message ? (
					message.error 
				) : email ? (
					<Row type="flex" align="center">
						<Spin indicator={antIcon} />
					</Row>
				) : (
					<>
						<Row type="flex" align="center" >
							<strong>Enter your user account's verified email address and we will send you a password reset link.</strong>
						</Row>

						<Form
							form={form}
							layout="vertical"
							name="form_in_modal"
							initialValues={{
							modifier: 'public',
							}}
						>
							<Form.Item
								name="email"
								style={{ paddingTop: "10px" }}
								rules={[
									{
									type: 'email',
									message: 'The input is not valid E-mail!',
									},
									{
									required: true,
									message: 'Please input your email',
									}
								]}
							>
								<Input placeholder="johndoe@email.com" />
							</Form.Item>
						</Form>
					</>
				)
			}
		</Modal>
	);
};

const ForgotPassword = () => {
	const [state, setState] = useState({ visible: false, email: null, message: null });
	const { visible, email, message } = state;

	const onSubmit = async (email) => {
		try {
			setState({ email, visible: true })
			const res = await fetch("https://reqres.in/api/login", {
				method: "POST",
				body: JSON.stringify(email),
				headers: { "Content-Type": "application/json" }
			});

			const message = await res.json();

			setState({ email, visible: true, message });
		} catch (e) {
			setState({ email, visible: true, message: e.message });
		}
	};

	return (
		<div>
			<Button
				type="link"
				onClick={() => {
					setState({ visible: true });
				}}
			>
				Forgot Password
			</Button>
			<ForgotPasswordForm
				message={message}
				email={email}
				visible={visible}
				onSubmit={onSubmit}
				onCancel={() => {
					setState({ visible: false, message });
				}}
			/>
		</div>
	);
};


export default ForgotPassword;