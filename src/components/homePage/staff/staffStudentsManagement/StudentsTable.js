import React, { useState, useEffect } from "react";
import {
	Table,
	Input,
	Button,
	Row,
	Col,
	Spin,
	Typography,
} from "antd";
import styled from "styled-components";
import ModalStudent from "./AddStudentModal";
import ActionButton from "./ActionButton";

// import { VariableSizeGrid as Grid } from 'react-window';
// import ResizeObserver from 'rc-resize-observer';
// import classNames from 'classnames';

const TabsContent = styled.div`
	margin: "0 20px";
`;

const HeaderStyle = styled.div`
	padding: 20px;
`;

const AddStudentStyle = styled.div`
	display: flex; 
	justify-content: flex-end; 
	align-items: center;
	padding: 0 10px;
	p{
		margin: 10px; 
		padding: 10px;
	}

	@media (max-width: 576px) {
		justify-content: flex-start; 
		${'' /* justify-content: center;  */}
	}
`;

const DropDownStyle = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 10px; 

	@media (max-width: 576px) {
		justify-content: flex-start; 
		${'' /* justify-content: center;  */}
		margin-left: 20px;
	}
`;

// Search
const { Search } = Input;

const StudentsTable = () => {
	const [selectedStudents, setSelectedStudents] = useState([]);
	const [students, setStudents] = useState([]);
	const [courses, setCourses] = useState([]);
	const [temporarySearch, setTemporarySearch] = useState("");
	const [currentStudents, setCurrentStudents] = useState([]);
	// const [student, setStudent] = useState({});

	//true when new student added
	const [studentAdded, setStudentAdded] = useState(false);
	//true when existing student was edit
	const [changedStudentInfo, setChangedStudentInfo] = useState(false);

	console.log(studentAdded);

	const onSearch = (event) => {
		const name = event.toLowerCase();
		console.log(name);
		setTemporarySearch(event);
		setCurrentStudents(students.filter((student) => {
			const firstName = student.first_name.toLowerCase();
			const lastName = student.last_name.toLowerCase();
			const fullName = `${firstName} ${lastName}`;
			return firstName.includes(name) || lastName.includes(name) || fullName.includes(name);
		}));
	};

	useEffect(() => {
		getStudents();
		getCourses();
	}, [studentAdded, changedStudentInfo])

	const getStudents = () => {
		fetch(`${process.env.REACT_APP_GET_STUDENTS}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setStudents(data);
				setCurrentStudents(data);
				setStudentAdded(false);
				setChangedStudentInfo(false);
			})
			.catch(err => console.error(err));
	}

	const getCourses = () => {
		fetch(`${process.env.REACT_APP_GET_COURSES}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setCourses(data)
			})
			.catch(err => console.error(err));
	}

	// Table
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
		},
		{
			title: 'ID',
			dataIndex: 'id',
			width: '10%',
			sorter: {
				compare: (a, b) => a.id - b.id,
			},
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Course',
			dataIndex: 'course',
		},
	];
	// Dropdawn menu
	// const menu = (
	//   <Menu>
	//     {courses.map( course => (
	//         <Menu.Item key={course.id} >
	//           <Checkbox onChange={onChange}>{course.course_name}</Checkbox>
	//         </Menu.Item>
	//     ))
	//     }
	//   </Menu>
	// );

	// function onChange(e) {
	//   console.log(`checked = ${e.target.checked}`);
	// }

	const data = [];

	currentStudents.map(student => (
		data.push({
			key: student.student_id,
			id: student.student_id,
			name: student.first_name + ' ' + student.last_name,
			email: student.user.email,
			course: student.student_course.course.course_name,
		})
		// students.map( student => (
		//   data.push({
		//     key: student.student_id,
		//     id: student.student_id,
		//     name: student.first_name + ' ' + student.last_name,
		//     email: student.user.email,
		//     course: student.student_course.course.course_name,
		//   })
	))

	const onSelectChange = selectedRowKey => {
		console.log('selectedStudents changed: ', selectedRowKey);
		setSelectedStudents(selectedRowKey);
		// setStudent(students.)
	};

	const rowSelection = {
		selectedStudents,
		onChange: onSelectChange,
	};

	return (
		<>
			{
				students.length ? (
					<TabsContent>
						<Row>
							<Col
								xs={24}
								sm={12}
								md={12}
								lg={12}
							>
								<HeaderStyle>
									<Typography.Title level={5}>
										CTD Students's List
									</Typography.Title>
									{/* <h3 style={{fontWeight: 'bold'}}>CTD Students's  List</h3> */}
									<Search
										placeholder="Search"
										allowClear
										onSearch={onSearch}
										enterButton
										style={{ width: 200 }}
									/>
									{
										temporarySearch && (
											<div>
												<br />
												<p>
													{temporarySearch}&nbsp;
													<Button
														type="danger"
														shape="circle"
														onClick={() => {
															setTemporarySearch("")
															setCurrentStudents(students);
														}}
													>
														x
													</Button>
												</p>
											</div>
										)
									}
								</HeaderStyle>
							</Col>
							<Col
								xs={24}
								sm={12}
								md={12}
								lg={12}
							>
								<AddStudentStyle>
									<p>Add Student</p>
									<ModalStudent
										courses={courses}
										setStudentAdded={setStudentAdded}
									/>
								</AddStudentStyle>

								<DropDownStyle>
									<ActionButton
										students={students}
										selectedStudents={selectedStudents}
										courses={courses}
										setChangedStudentInfo={setChangedStudentInfo}
									/>
								</DropDownStyle>
							</Col>
						</Row>

						<Row>
							<Col span={24}>
								<Table
									pagination={{ pageSize: 10 }}
									style={{ margin: '20px 10px' }}
									rowSelection={rowSelection}
									columns={columns}
									dataSource={data}
									// scroll={{ x: 1000 }}
									scroll={{ y: 1000, x: 800 }}
								// scroll={{ y: 1000}}
								/>
							</Col>
						</Row>
					</TabsContent>
				) : (
						<Row>
							<Col span={12} offset={12}>
								<Spin size="large" />
							</Col>
						</Row>
					)
			}
		</>
	);
};

export default StudentsTable;
