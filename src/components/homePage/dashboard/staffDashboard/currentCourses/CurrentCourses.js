import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Space, Input, Spin } from "antd";
import styled from "styled-components";
import TextEditor from '../../../textEditor/TextEditor';
import UserContext from '../../../../contexts/UserContext';
import MultiPurposeModal from "../../../staff/multiPurposeModal/MultiPurposeModal";

const CurrentCourses = () => {

	const TextBox = styled.div`
		width: 200px;
		height: 92.34px;
		margin: 25px;
		padding: 25px;
		text-align: center;
	`;

	const [courses, setCourses] = useState();
	const [courseName, setCourseName] = useState("");
	const [courseDescription, setCourseDescription] = useState("");
	const [authToken] = useContext(UserContext);


	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_ROOT}/courses`)
			.then(response => response.json())
			.then(setCourses)
			.catch(console.error)
	}, []);

	// const handleOk = () => {
	// 	setIsModalVisible(false);
	// };

	//Modal Form
	const handleOk = (event) => {
		event.preventDefault();
		fetch(`${process.env.REACT_APP_API_ROOT}/courses`, {
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
			.then(() => {
				// console.log(data);
				window.location.reload();
			})
			.catch(console.error);
	};

	// console.log(courseDescription);

	return (
		<>
			<Space direction="vertical">
				<Card
					type="inner"
					hoverable
					className="cards-border"
					style={{ paddingTop: 10 }}
				>
					<MultiPurposeModal
						// title="Current Courses"
						handleOk={handleOk}
						addTitle={"Add Course"}
					>
						<label>Course Name: </label>
						<Input
							type="text"
							name="courseName"
							value={courseName}
							onChange={(event) => {
								event.preventDefault();
								setCourseName(event.target.value);
							}}
						/>
						<br /><br />
						<label>Course Description: </label>

						<TextEditor
							text={courseDescription}
							setText={setCourseDescription}
						/>

						<br />
						{/* <Button type="primary" htmlType="submit" >
								Create Course
							</Button> */}
					</MultiPurposeModal>

					<br></br>

					<Row gutter={[16, 16]}>
						{
							courses ? (
								courses.map((course) => (
									<Card
										type="inner"
										hoverable
										className="cards-border"
										style={{ margin: 3 }}
										key={course.id}
									>
										<Col span={12}>
											<TextBox>
												<h3>
													<strong>{course.course_name}</strong>
												</h3>
												<div dangerouslySetInnerHTML={{ __html: course.description }} ></div>
											</TextBox>
										</Col>
									</Card>
								)
								)) : (
									<Spin />
								)
						}
					</Row>
				</Card>
			</Space>
		</>
	);
};
export default CurrentCourses;
