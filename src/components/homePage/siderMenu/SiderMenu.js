/** @format */

import React, { useState, useContext } from "react";
import { Row, Col, Avatar, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";

import UserContext from "../../contexts/UserContext";
import StudentSiderMenu from "./student/StudentSiderMenu";
import StaffSiderMenu from "./staff/StaffSiderMenu";

const { Sider } = Layout;

const SiderMenu = ({ match, keys, setSelectedKey, selectedKey }) => {
	const [collapsed, setCollapsed] = useState(false);
	const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);

	const onCollapse = (collapsed) => {
		setCollapsed(collapsed);
	};

	const displaySider = () => {
		if (userInfo.role === "student") {
			return (
				<StudentSiderMenu
					match={match}
					keys={keys}
					setSelectedKey={setSelectedKey}
					selectedKey={selectedKey}
				/>
			);
		} else if (userInfo.role === "staff") {
			return (
				<StaffSiderMenu
					match={match}
					keys={keys}
					setSelectedKey={setSelectedKey}
					selectedKey={selectedKey}
				/>
			);
		} else if (userInfo.role === "admin") {
			return null;
		} else {
			return null;
		}
	};

	const displayName = () => {
		if (userInfo.role === 'student') {
			return `${userInfo.student.first_name} ${userInfo.student.last_name}`
		} else if (userInfo.role === 'staff') {
			return `${userInfo.staff.first_name} ${userInfo.staff.last_name}`
		} else if (userInfo.role === 'admin') {
			return null;
		} else {
			return null;
		}
	}

	return (
		<Sider
			style={{ backgroundColor: "#12284C" }}
			collapsible
			collapsed={collapsed}
			onCollapse={onCollapse}
			breakpoint="md"
			collapsedWidth="0"
		>
		<Row type="flex">
			<Col span={24} align="center">
				<div className="username" style={{ paddingTop: "30px" }}>
					<Col span={24} align="center">
						<Avatar
							// src={userInfo.length ? userInfo[0].Picture[0].thumbnails.large.url : null} //needs a loop to go through users?
							size={{
								xs: 32,
								sm: 40,
								md: 40,
								lg: 64,
								xl: 80,
								xxl: 80,
							}}
							icon={<UserOutlined />}
						/>
					</Col>
				</div>
			</Col>
			<Col span={24} align="center">
				<div className="username" style={{ paddingBottom: "30px" }}>
					{userInfo ? displayName() : null}
				</div>
			</Col>
		</Row>
		{
			displaySider()
		}
		</Sider>
	)
}

export default SiderMenu;
