import React, { useState, useEffect } from "react";
import { Card, Row, Col, Space, Typography, Modal, Form, Input, Button } from "antd";
import styled from "styled-components";
import { PlusCircleTwoTone } from "@ant-design/icons";
import TextEditor from '../../../textEditor/TextEditor';
import { useCookies } from "react-cookie";


//Form Constants
// const layout = {
// 	labelCol: { span: 6 },
// 	wrapperCol: { span: 16 },
// };

// const validateMessages = {
// 	required: "${label} is required!",
// };

const CurrentCourses = () => {

	const TextBox = styled.div`
		width: 200px;
		height: 92.34px;
		margin: 25px;
		padding: 25px;
		text-align: center;
	`;

	const [ isModalVisible, setIsModalVisible ] = useState(false);
	const [ courses, setCourses ] = useState();
	const [ courseName, setCourseName ] = useState("");
	const [ courseDescription, setCourseDescription ] = useState("");
	const [ cookies, setCookie ] = useCookies(['auth_token']);
	const [ authToken, setAuthToken ] = useState(cookies['auth_token']);


	useEffect(() => {
		fetch(process.env.REACT_APP_GET_STAFF_ASSIGNMENTS)
		.then(response => response.json())
		.then(setCourses)
		.catch(console.error)
	}, []);

	const showModal = () => {
		setIsModalVisible(true);
	};

	
	const handleCancel = () => {
		setIsModalVisible(false);
	};
	
	// const handleOk = () => {
	// 	setIsModalVisible(false);
	// };

	//Modal Form
	const handleOk = (event) => {
		event.preventDefault();
		fetch(process.env.REACT_APP_GET_STAFF_ASSIGNMENTS, {
			method: "POST",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Authorization": authToken
			},
			body: JSON.stringify({
				course_name: courseName,
				description: courseDescription
			})
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			// window.location.reload();
		})
		.catch(console.error);

		console.log(courseName);
		console.log(courseDescription);
	};

	console.log(courseDescription);



	return (
		<>
			<Space direction="vertical">
				<Card
					type="inner"
					hoverable
					className="cards-border"
					style={{ paddingTop: 10 }}
				>
					<Typography.Title level={4} className="left">
						Current Courses
						<PlusCircleTwoTone
							style={{ paddingLeft: 420 }}
							onClick={showModal}
						/>
						<Modal
							title="Create Course"
							visible={isModalVisible}
							onOk={ handleOk }
							onCancel={handleCancel}
							width={ 1000 }
						>
							<form /* onSubmit={ handleSubmit } */>
								<label>Course Name: </label>
								<Input 
									type="text"
									name="courseName"
									value={ courseName }
									onChange={ (event) => {
										event.preventDefault();
										setCourseName(event.target.value); 
									}}
								/>
								<br/>
								<br/>
								<label>Course Description: </label>
								
								<TextEditor 
									text={ courseDescription }
									setText={ setCourseDescription }
								/>

								<br/>
								{/* <Button type="primary" htmlType="submit" >
									Create Course
								</Button> */}
								{/* <input type="submit" value="Submit Form" /> */}
							</form>
						</Modal>
					</Typography.Title>
					<br></br>

					<Row gutter={[16, 16]}>
						{
							courses && courses.map((course) => (
								<Card
									type="inner"
									hoverable
									className="cards-border"
									style={{ margin: 3 }}
									key={ course.id }
								>
									<Col span={12}>
										<TextBox>
											<h3>
												<strong>{ course.course_name }</strong>
											</h3>
											<div dangerouslySetInnerHTML={{ __html: course.description }} ></div>
											{/* { course.description } */}
										</TextBox>
									</Col>
								</Card>		
							))
						}
					</Row>
				</Card>
			</Space>
		</>
	);
};
export default CurrentCourses;
