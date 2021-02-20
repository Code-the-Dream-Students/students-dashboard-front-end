import React, { useState, useEffect } from "react";
import moment from "moment";
import {
	Button,
	Modal,
	Form,     
	Input,
	Cascader,
	DatePicker,
	Radio,
	message,
} from "antd";

const CreateForm = ({ visible, onCreate, onCancel }) => {
	const [form] = Form.useForm();
	function onCheckedAssignmentChange(e) {
		console.log("checked = ", e.target.value);
		setAssignmentOptions(e.target.value);
	}
	const plainOptions = ["Yes", "No", "Working on it"];
  //Fetching data from airtable
	const getMentorsData = async () => {
		const response = await fetch(
			"https://api.airtable.com/v0/appm5NPkqO7P8ePUK/Mentors?api_key=keyclOytaXo7NHQ8M"
		);
		const mentorsData = await response.json();
		return mentorsData;
	};
	const [mentors, setMentors] = useState(null);
	const [mentorOptions, setMentorOptions] = useState(null);
	const [selectedMentor, setSelectedMentor] = useState(null);
	const [selectedMentorValue, setSelectedMentorValue] = useState(null);
	const [sessionDate, setSessionDate] = useState(null);
	const [comment, setComment] = useState("");
	const [assignementOptions, setAssignmentOptions] = useState(null);
	const getOptions = (filterByDay) => {
		console.log(filterByDay);
		let options = [];
		let unique_mentors = [
			...new Map(mentors.records.map((o) => [o.fields.Key, o])).values(),
		];
		unique_mentors.forEach((mentor) => {
			let object = {};
			object.value = mentor.fields.Key;
			object.label = mentor.fields.Name;
			object.children = [];
			let key = mentor.fields.Key;

			let dates_for_each_mentor = mentors.records.filter(
				(x) => x.fields.Key === key
			);

			dates_for_each_mentor.forEach((element) => {
				if (element.fields.Dates !== filterByDay) return;

				let new_date = {
					value: element.fields.Dates,
					label: element.fields.Dates,
					children: []
				};

				let times_foreach_date = mentors.records.filter(
					(x) => x.fields.Key === key && x.fields.Dates === element.fields.Dates
				);

				times_foreach_date.forEach((time) => {
					new_date.children.push({
						value: time.fields.Times,
						label: time.fields.Times
					});
				});
				object.children.push(new_date);
			});
			if (object.children.length === 0) object.disabled = true;
			options.push(object);
		});
		console.log(options);
		return options;
	};

	useEffect(() => {
		getMentorsData().then((data) => setMentors(data));
	}, []);

	const filterMentors = (date, dateString) => {
		//setMentorOptions(getOptions(null));
		setSelectedMentorValue(null);
		if (date) {
			setSessionDate(moment(date).format("YYYY-MM-DD"));
			let filterByDay = date.format("dddd");
			setMentorOptions(getOptions(filterByDay));
			console.log("options", mentorOptions);
		}
	};

	const resetFields = () => {
		form.resetFields();
		setAssignmentOptions(null);
		setSessionDate(null);
		setSelectedMentorValue(null);
		setMentorOptions(null);
	};

	const postNewSession = () => {
		console.log(moment(sessionDate).format("YYYY-MM-DD"));
		fetch("https://api.airtable.com/v0/appm5NPkqO7P8ePUK/Registered_Mentor_Sessions", {
			body: JSON.stringify({
				records: [
					{
						fields: {
							// Name: status
							Name: selectedMentor.Name,
							Comments: comment,
							Status: assignementOptions,
							Date: moment(sessionDate).format("YYYY-MM-DD"),
							Time: selectedMentor.Time,
						}
					}
				]
			}),
			headers: {
				Authorization: "Bearer keyclOytaXo7NHQ8M",
				"Content-Type": "application/json",
			},
			method: "POST",
		})
		.then(() => {
			message.success("Session has been scheduled successfully");
			resetFields();
		})
		.catch((e) => {
			console.log(e);
			message.error("Unable to schedule session - see console");
		});
	};

	const changeMentor = (e) => {
		setSelectedMentorValue(e);
		let selected = mentorOptions.find((mentor) => mentor.value === e[0]);
		
		if (!selected) return false;
		setSelectedMentor({
			Name: selected.label,
			Time: e[2],
		});

		console.log("mentor", selectedMentor);
	};

	return (
		<Modal
			visible={visible}
			title="Mentor Session"
			okText="Submit"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={() => {
				postNewSession();
				//submit form
				// form
				//   .validateFields()
				//   .then((values) => {
				//     form.resetFields();
				//     onCreate(values);
				//   })
				//   .catch((info) => {
				//     console.log("Validate Failed:", info);
				//   });
			}}
		>
			<Form
				form={form}
				layout="vertical"
				name="form_in_modal"
				initialValues={{
					modifier: "public",
				}}
			>
				<Form.Item label="Date">
				<DatePicker
					allowClear={false}
					onChange={filterMentors}
					value={sessionDate ? moment(sessionDate) : ""}
				/>
				</Form.Item>
				<Form.Item label="Mentor">
				{
					mentors && (
						<Cascader
							value={selectedMentorValue}
							options={sessionDate ? mentorOptions : null}
							onChange={changeMentor}
						/>
					)
				}
				</Form.Item>
				{/* 
						<Form.Item label="Type">
							<Select>
								<Select.Option value="regularsession">Mentor Session</Select.Option>
								<Select.Option value="1on1">1 on 1</Select.Option>
							</Select>
						</Form.Item> */}
				<Form.Item label="Have you started the assignment? ">
					<Radio.Group onChange={onCheckedAssignmentChange}>
						<Radio value={"Yes"}>Yes</Radio>
						<Radio value={"No"}>No</Radio>
						<Radio value={"Working on it"}>Working on it</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					name="description"
					label="Any questions or topics would you like to discuss at the session?"
				>
					<Input.TextArea
						id="comments"
						allowClear
						onChange={(e) => setComment(e.target.value)}
						value={comment}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

const MentorForm = () => {
	const [visible, setVisible] = useState(false);
	const onCreate = (values) => {
		console.log("Received values of form: ", values);
		setVisible(false);
	};

	return (
		<div>
			<Button
				type="primary"
				onClick={() => {
					setVisible(true);
				}}
			>
				Here
			</Button>
			<CreateForm
				visible={visible}
				onCreate={onCreate}
				onCancel={() => {
					setVisible(false);
				}}
			/>
		</div>
	);
};
export default MentorForm;