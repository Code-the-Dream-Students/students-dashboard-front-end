import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Spin, Typography, Table, Form } from 'antd';

import { TabsContent } from '../styles';
import MultiPurposeModal from '../../multiPurposeModal/MultiPurposeModal';
import CreateAssignments from './CreateAssignments';
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

const Assignments = ({ assignments }) => {
	const [selectedAssignments, setSelectedAssignments] = useState([]);
	const [assignmentAdded, setAssignmentAdded] = useState(false);
	const [changedAssignmentInfo, setChangedAssignmentInfo] = useState(false);

	const [form] = Form.useForm();

	useEffect(() => {
		getAssignments();
		// getCourses();
	}, [assignmentAdded, changedAssignmentInfo])

	const getAssignments = async () => {
		try {
			setAssignmentAdded(false);
			setChangedAssignmentInfo(false);
		} catch (e) {
			console.log(e.message)
		}
	}

	const onSelectChange = (selectedRowKey, selectedRows) => {
		console.log('selectedStudents changed: ', selectedRows);
		setSelectedAssignments(selectedRows);
		// setStudent(students.)
	};

	const rowSelection = {
		selectedAssignments,
		onChange: onSelectChange,
	};

	const onFormSubmit = async () => {
		await form.submit();
		form.resetFields();
		// window.location.reload();
	}

	return (
		<>
			{
				assignments.length ? (
					<TabsContent>
						<MultiPurposeModal
							handleOk={onFormSubmit}
							addTitle={'Create an assignment'}
							assignments={assignments}
							setAssignmentAdded={setAssignmentAdded}
						>
							<CreateAssignments form={form} />
						</MultiPurposeModal>
						<Table
							style={{ margin: '20px 10px', overflow: 'hidden' }}
							rowSelection={rowSelection}
							columns={columns}
							dataSource={assignments}
						/>

					</TabsContent >
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