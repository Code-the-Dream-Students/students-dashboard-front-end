import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Row, Col, Spin, Typography, Table } from 'antd';

import * as ROUTES from '../../../../../constants/routes';
import { TabsContent, HeaderStyle, AddAssignmentStyle, DropDownStyle } from '../styles';
import CreateModal from './createModal/CreateModal';
import MultiPurposeModal from '../../multiPurposeModal/MultiPurposeModal';
import CreateActions from './createActions/CreateActions';

// Search
const { Search } = Input;

// Table
const columns = [
	{
		title: 'ID',
		render: (record) => record.lesson.assignment.id,
		sorter: (a, b) => a.id - b.id
	},
	{
		title: 'Assignment Description',
		render: (record) => record.lesson.assignment.description,
	},
	{
		title: 'Assignment Link',
		render: (record) => record.lesson.assignment.link,
	},
	{
		title: 'Course Name',
		render: (record) => record.course_name,
		sorter: (a, b) => a.course_name.toLowerCase().localeCompare(b.course_name.toLowerCase()),
		width: '10%'
	},
	{
		title: 'Unit Name',
		render: (record) => record.unit_name,
		sorter: (a, b) => a.course_name.toLowerCase().localeCompare(b.course_name.toLowerCase()),
	},
	{
		title: 'Lesson Name',
		render: (record) => record.lesson.lesson_name,
	},
];

const Assignments = ({ history, assignments }) => {
	const [selectedAssignments, setSelectedAssignments] = useState([]);
	// const [assignments, setAssignments] = useState([]);
	const [data, setData] = useState([]);
	const [temporarySearch, setTemporarySearch] = useState("");
	const [, setCurrentAssignments] = useState([]);

	//true when new student added
	const [assignmentAdded, setAssignmentAdded] = useState(false);
	//true when existing student was edit
	const [changedAssignmentInfo, setChangedAssignmentInfo] = useState(false);

	const onSearch = (event) => {
		const name = event.toLowerCase();
		console.log(name);
		setTemporarySearch(event);
		// setCurrentStudents(students.filter((student) => {
		// 	const firstName = student.first_name.toLowerCase();
		// 	const lastName = student.last_name.toLowerCase();
		// 	const fullName = `${firstName} ${lastName}`;
		// 	return firstName.includes(name) || lastName.includes(name) || fullName.includes(name);
		// }));
	};

	useEffect(() => {
		getAssignments();
		// getCourses();
	}, [assignmentAdded, changedAssignmentInfo])

	const getAssignments = async () => {
		try {
			// const res = await fetch(`https://forked-student-dashboard.herokuapp.com/courses`, {
			//   method: 'GET',
			//   mode: 'cors',
			//   credentials: 'include',
			//   headers: { 'Content-Type': 'application/json' }
			// })
			// const data = await res.json();
			// console.log(data);
			// const weeks = data.reduce((acc, curr) => {
			//   return [...acc, ...curr.weeks];
			// }, [])
			// console.log(weeks)
			// setData(weeks);
			// setAssignments(data);
			// setCurrentAssignments(data);
			setAssignmentAdded(false);
			setChangedAssignmentInfo(false);
		} catch (e) {
			console.log(e.message)
		}
	}

	// const getCourses = async () => {
	//   try {
	//     const res = await fetch('https://forked-student-dashboard.herokuapp.com/courses', {
	//       method: 'GET',
	//       mode: 'cors',
	//       credentials: 'include',
	//       headers: { 'Content-Type': 'application/json' }
	//     })
	//     const data = await res.json();
	//     console.log(data);
	//     setCourses(data)
	//   } catch (e) {
	//     console.log(e.message);
	//   }
	// }


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

	// currentStudents.map(student => (
	// 	data.push({
	// 		key: student.student_id,
	// 		id: student.student_id,
	// 		name: student.first_name + ' ' + student.last_name,
	// 		email: student.user.email,
	// 		course: student.student_course.course.course_name,
	// 	})
	// 	// students.map( student => (
	// 	//   data.push({
	// 	//     key: student.student_id,
	// 	//     id: student.student_id,
	// 	//     name: student.first_name + ' ' + student.last_name,
	// 	//     email: student.user.email,
	// 	//     course: student.student_course.course.course_name,
	// 	//   })
	// ))

	const onSelectChange = (selectedRowKey, selectedRows) => {
		console.log('selectedStudents changed: ', selectedRows);
		setSelectedAssignments(selectedRows);
		// setStudent(students.)
	};

	const rowSelection = {
		selectedAssignments,
		onChange: onSelectChange,
	};

	return (
		<>
			{
				assignments.length ? (
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
															setCurrentAssignments(assignments);
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
								<AddAssignmentStyle>
									<p>Create Assignment</p>
									<CreateModal
										history={history}
										assignments={assignments}
										setAssignmentAdded={setAssignmentAdded}
									/>
								</AddAssignmentStyle>

								<DropDownStyle>
									{/* <CreateActions
					students={students}
					selectedStudents={selectedStudents}
					courses={courses}
					setChangedStudentInfo={setChangedStudentInfo}
				  /> */}
								</DropDownStyle>
							</Col>
						</Row>

						<Row>
							<Col span={24}>
								<Table
									style={{ margin: '20px 10px', overflow: 'hidden' }}
									rowSelection={rowSelection}
									columns={columns}
									dataSource={assignments}
								// scroll={{ y: 1000, x: 800 }}
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
}

export default Assignments;