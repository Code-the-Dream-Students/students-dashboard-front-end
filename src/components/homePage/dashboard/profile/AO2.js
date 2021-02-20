import React, {useState, useRef, /* useEffect, */ useContext} from 'react';
import { Card, Row, Col, Space, Descriptions, Typography, Button, Input, Form, Tooltip} from 'antd';
// import { MailOutlined } from '@ant-design/icons';
import LoadPic from './LoadPic';
import UserContext from "../../../contexts/UserContext";
import { Preview } from 'styled-icons/material-twotone';

const { Text, Paragraph } = Typography;

const AO2 = () => {
	const [editableStr, setEditableStr] = useState();                                     
	const [size, setSize]= useState("large");
	const [isInEditMode, setIsInEditMode] = useState(false); 
	const [ authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
	const [inputValue, setInputValue] = useState({firstname: userInfo.student.first_name, lastname: userInfo.student.last_name}); {/* need current state to show in input. needs to work for both inputs*/}
	const textInput = useRef(); //MF:how to use to update the updatefield component


	//Mf: maybe have the inputValue a variable to equal the userinfo
	const color = "volcano"; {/*tooltip color*/}

	// one way to edit using edit button needs functionality
	const editButton = () => {
		setIsInEditMode(true);
		console.log('change');
	};

	// input box is displayed to apply or not apply edits
	const editField = () => {
		setIsInEditMode(true)? setIsInEditMode(true) : setIsInEditMode(false)
		console.log("edit this field")
	};

	// MF:This is not working why? update the state here
	const updateField = (e) => {
		e.preventDefault();
		const text = textInput.current.value;
	//    setUserInfo();
		// setInputValue(textInput.inputValue);
		//inputValue(textInput.current); MF: fix this logic. says is not a function 
		console.log(inputValue);
	};
	//  useEffect(() =>{

	//      updateField() ? textInput.current.focus() : editField()
	// },[]);

	const showEdit = () => {
		return (
			<div>
				<form onSubmit={updateField} >			
					<input 
						type="text"
						value={inputValue.firstname}
						onChange={e => console.log(e.target.value)}
						ref={textInput}
					/>
					<Button onClick={()=>{editField()}}>x</Button> 
					<button onClick={()=>textInput.current.focus()}>ok</button> {/*MF: this is doing the job of the close button*/}
				</form>
			</div>
		) 
	};

	//other way to edit by input (made changes now my doubleclick is not working log is showing but no function call why)
	const showDefault = () => {
		return (
			<div onDoubleClick={editField}>
				{userInfo.student.first_name}
				{/* {inputValue} */}
			</div>   
		);
	};

	console.log(showDefault(), "Test")	
	
	return (
		<>
			{/*test*/}
			{/* { isInEditMode ?
			showEdit() : showDefault()} */}
			{/* <Paragraph editable={{ onChange: setEditableStr }}>{editableStr}</Paragraph> */}
			<Card>
				<Typography.Title level={4}>Profile</Typography.Title>
				<Row>
					<Space size={size}>
						<Col>
							<LoadPic />
						</Col>
						{/* need a left border vertical here */}
						<Col>
							{/* id feeds in from the database need an api call */}
							<Text strong>ID:{userInfo.id}</Text> 
							<Descriptions
								extra={<Button type="primary" onClick= {editButton}>Edit</Button>}
							>
								<Descriptions.Item label = "Last Name"> {userInfo.student.last_name}</Descriptions.Item>
								{/* <Input label="First Name" bordered={false}/> */}
								<Descriptions.Item label = "First Name">  {/*<Tooltip title="Double Click to Edit" color={color}>*/}
									{ 
										isInEditMode ? showEdit() : showDefault()
									}  {/*</Tooltip>*/}
								</Descriptions.Item>

								<br />
								<Descriptions.Item label = "Class">{userInfo.student.student_course.course.course_name}</Descriptions.Item>
								<Descriptions.Item label = "Email">{userInfo.email}</Descriptions.Item>
							
							</Descriptions>					
						</Col>
					</Space>
				</Row>		
			</Card>
		</>
	);
};

{/* <Paragraph editable={{ onChange: setEditableStr }}>Smith{editableStr}</Paragraph> */}

export default AO2; 

