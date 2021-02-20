import React, { useState, useContext } from 'react';
import { Tabs, Input, Row, Col, Button, Modal, Table, Dropdown, Menu, Checkbox, Form, Popconfirm, Typography, InputNumber } from 'antd';
import { PlusOutlined, FolderAddOutlined, DownOutlined } from '@ant-design/icons';
import Confirm from "./Confirm";
import Move from "./Move";
import Edit from "./Edit";
import StyledDiv from './styles'
import UserContext from "../contexts/UserContext";

//table headings
const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		editable: true,
	},
	{
		title: 'ID',
		dataIndex: 'id',
		defaultSortOrder: 'ascend',
		sorter: (a, b) => a.id - b.id,
	},
	{
		title: 'Email',
		dataIndex: 'email',
	},
	{
		title: 'Course',
		dataIndex: 'course',
	},
	{
		title: 'Actions',
		render: () => (
			<Dropdown overlay={menu} trigger={['click']}>
				<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
					Actions <DownOutlined />
				</a>
			</Dropdown>
		),
	},
];

 //for dropdown in action
const menu = (
	<Menu>
	<Menu.Item key="0"> <Edit /> </Menu.Item> 
		{/* may not need the edit */}
	<Menu.Item key="1"> <Move /></Menu.Item>
	<Menu.Item key="2"><Confirm /></Menu.Item> 
	</Menu>
);

const StudentTable = () => {
	 //table 
	const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Check here to configure the default column
	const [loading, setLoading] = useState(false);
	//datasource from userContext
	const [ /* authToken, setAuthToken,  */userInfo/* , setUserInfo */] = useContext(UserContext);

	const data = [];
	for (let i = 0; i < 46; i++) {
		data.push({
			key: i,
			name: `${userInfo.student.first_name} ${userInfo.student.last_name}`,
			id: `${userInfo.id}`,
			email: `${userInfo.email} ${i}`,
			course: userInfo.student.student_course.course.course_name,
		});
	};

	const start = () => {
		setLoading(true);
		// ajax request after empty completing
		setTimeout(() => {
			setSelectedRowKeys([]);
			setLoading(false)
		}, 1000);
	};

	const rowSelection = {
		// selectedRowKeys,
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		},
	};

	const hasSelected = selectedRowKeys.length > 0;
	console.log(rowSelection);

	return(
		<div>
			<div style={{ marginBottom: 16 }}>
				<Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
					Reload
				</Button>
				<span style={{ marginLeft: 8 }}>
					{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
				</span>
			</div>
			<Table rowSelection={rowSelection} columns={columns} dataSource={data} />
		</div>
	);
};
	


export default StudentTable;