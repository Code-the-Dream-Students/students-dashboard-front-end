import React, { useState, useContext } from 'react';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UserContext from "../contexts/UserContext";

const { confirm } = Modal;



const Confirms = () => {
	const [remove, setRemove] = useState(false);
	const [deleteRow, setDeleteRow]=useState(true);
	const [ authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);

	function showConfirm() {
	//MF:maybe use the key in students component to help with the delete function
		confirm({
			title: 'Delete Student(s)',
			icon: <ExclamationCircleOutlined />,
			content: 'Are you sure you want to remove this student from the class?',
			okText: 'Remove',
			closable: 'true',

			onOk() {
				function handleDelete(props) {
					const source = [deleteRow(true)];
					deleteRow.filter((item) =>  { return item.props !== props}); {/*MF: need to remove one line from the table*/}
				
					setRemove(source);	
					console.log("true");
				};

				handleDelete(); 
				
				console.log('Ok');
			},
			onCancel() {
				setRemove(false);
				console.log('Cancel');
			}
		});
	};

	return (
		// <Space>
		<Button danger onClick={showConfirm}>Delete</Button>
		// </Space>
	)

};

export default Confirms