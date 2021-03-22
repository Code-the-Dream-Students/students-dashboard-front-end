import React, { useEffect, useState, useReducer } from 'react';
import { Select, DatePicker, Form, Row, Col, Input, Button } from 'antd';
import 'react-quill/dist/quill.snow.css';
import _ from "lodash";

import TextEditor from '../../../textEditor/TextEditor';
import MultiPurposeModal from '../../multiPurposeModal/MultiPurposeModal';
import CustomizeAssignment from './CustomizeAssignment';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const INITIAL_STATE = {};

const ACTIONS_ASSIGNMENT_INFO = {
	SET_COURSE: 'course',
	SET_UNIT: 'unit',
	SET_LESSON: 'lesson',
	SET_DATE: 'date',
	SET_DESCRIPTION: 'description',
	SET_INSTRUCTIONS: 'instructions',
	SET_RESOURCES: 'resources',
	SET_SUBMISSION: 'submission',
	SET_DONE: 'done',
	SET_ALL: 'all',
};

const reducerAssignmentsInfo = (state, action) => {
	switch (action.type) {
		case ACTIONS_ASSIGNMENT_INFO.SET_COURSE:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_UNIT:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_LESSON:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_DATE:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_DESCRIPTION:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_INSTRUCTIONS:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_RESOURCES:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_SUBMISSION:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_DONE:
			return { ...state, [action.payload.field]: action.payload.value };
		case ACTIONS_ASSIGNMENT_INFO.SET_ALL:
			return { ...action.payload.value };
		default:
			throw new Error();
	}
};

// const layout = {
// 	labelCol: {
// 		span: 8,
// 	},
// 	wrapperCol: {
// 		span: 16,
// 	},
// };


const CreateAssignments = ({ form }) => {
	const [assignments, dispatchAssignments] = useReducer(reducerAssignmentsInfo, INITIAL_STATE);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [info, setInfo] = useState();
	const [description, setDescription] = useState("");
	const [, setCourse] = useState();
	const [units, setUnits] = useState();
	const [lessons, setLessons] = useState();
	const [dueDate, setDueDate] = useState();

	useEffect(() => {
		const getData = async () => {
			const res = await fetch(process.env.REACT_APP_GET_COURSES);
			const data = await res.json();
			setInfo(data);
		}
		getData();
	}, [])


	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCourseChange = (course) => {
		const unitOptions = info[course].units;
		setCourse(course);
		dispatchAssignments({
			type: 'course',
			payload: { field: 'course', value: info[course] },
		})
		setUnits(unitOptions)

		if (lessons) {
			form.resetFields(['unit', 'week']);
			setLessons(null);
		}
	}

	const handleUnitChange = (unit) => {
		dispatchAssignments({
			type: 'unit',
			payload: { field: 'unit', value: units[unit] },
		})
		setLessons(units[unit].weeks);
	}

	const handleLessonChange = (lesson) => {
		dispatchAssignments({
			type: 'lesson',
			payload: { field: 'lesson', value: lessons[lesson] }
		})
		setDueDate(lessons[lesson])
	}

	const onDateChange = (date, dateString) => {
		dispatchAssignments({
			type: 'date',
			payload: { field: 'date', value: { date, dateString } }
		})
	}

	const onFinish = (values) => {
		console.log('Success:', values);
		console.log(assignments)
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			<h2 style={{ textAlign: 'center' }}><strong>Class information</strong></h2>
			<Form
				// {...layout}
				// layout="inline"
				form={form}
				name="basic"
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Row>
					<Col span={5}>
						<Form.Item name="course" initialValue="Choose Course" wrapperCol={{ span: 24 }}>
							<Select style={{ width: 150 }} onChange={handleCourseChange} loading={info ? false : true}>
								{
									info ? info.map((course, index) => {
										return (
											<Option key={course.course_name} value={index}>{course.course_name}</Option>
										)
									})
										: null
								}
							</Select>
						</Form.Item>
					</Col>
					<Col span={5}>
						<Form.Item name="unit" initialValue="Choose Unit" wrapperCol={{ span: 24 }}>
							<Select style={{ width: 150 }} onChange={handleUnitChange} disabled={units ? false : true}>
								{
									units ? units.map((unit, index) => {
										return (
											<Option key={unit.unit_name} value={index}>{unit.unit_name}</Option>
										)
									}) : null
								}
							</Select>
						</Form.Item>
					</Col>
					<Col span={5}>
						<Form.Item name="week" initialValue="Choose Week" wrapperCol={{ span: 24 }}>
							<Select style={{ width: 150 }} onChange={handleLessonChange} disabled={lessons ? false : true}>
								{
									lessons ? lessons.map((week, index) => {
										return (
											<Option key={`${index}.${week.lesson.lesson_name}`} value={index}>{week.lesson.lesson_name}</Option>
										)
									}) : null
								}
							</Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item name="date" wrapperCol={{ span: 24 }}>
							<RangePicker onChange={onDateChange} disabled={dueDate ? false : true} />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Form.Item name="description" label="Assignment Description">
							<TextEditor setText={setDescription} text={description} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item name="link" label="Link to Assignment">
							<Input />
						</Form.Item>
					</Col>
				</Row>
				{/* <Row>
					<Col span={24}>
						<Button type="primary" onClick={showModal}>Customize Assignments Template</Button>
					</Col>
				</Row> */}
			</Form>
			<MultiPurposeModal
				handleOk={onFinish}
				addTitle={'Customize assignment'}
			>
				<CustomizeAssignment />
			</MultiPurposeModal>
		</>
	)
}

export default CreateAssignments;