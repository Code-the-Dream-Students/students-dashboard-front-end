import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
	DashboardOutlined,
	// NotificationOutlined,
	BookOutlined,
	CalendarOutlined,
	// TeamOutlined,
	// UserOutlined,
	// DisconnectOutlined,
	FundProjectionScreenOutlined,
	SlackOutlined,
	YoutubeOutlined,
	RocketOutlined,
} from "@ant-design/icons";

import * as ROUTES from "../../../../constants/routes";

const { SubMenu } = Menu;

const StudentSiderMenu = ({ match, keys, setSelectedKey, selectedKey }) => {
	return (
		<Menu
			theme="dark"
			style={{ backgroundColor: "#12284C" }}
			defaultSelectedKeys={selectedKey}
			mode="inline"
			selectedKeys={selectedKey}
			onClick={({ key }) => { console.log(key); setSelectedKey(key) }}
		>
			<Menu.Item key={keys['Dashboard']} icon={<DashboardOutlined />}>
				<Link to={`${match.path}${ROUTES.DASHBOARD}`}>
					Dashboard
				</Link>
			</Menu.Item>

			{/* <Menu.Item key={keys['News']} icon={<NotificationOutlined />}>
				News
			</Menu.Item> */}

			<Menu.Item key={keys['Assignments']} icon={<BookOutlined />}>
				<Link to={`${match.path}${ROUTES.ASSIGNMENTS}`}>
					Assignments
				</Link>
			</Menu.Item>

			<Menu.Item key={keys['Calendar']} icon={<CalendarOutlined />}>
				<Link to={`${match.path}${ROUTES.CALENDAR}`}>Calendar</Link>
			</Menu.Item>

			{/* <Menu.Item key={keys['Mentors']} icon={<UserOutlined />}>
				Mentors
			</Menu.Item> */}

			{/* <Menu.Item key={keys['Classmates']} icon={<TeamOutlined />}>
				Classmates
			</Menu.Item> */}

			{/* <Menu.Item key={keys['CTD']} icon={<DisconnectOutlined />}>
				CTD
			</Menu.Item> */}

			{/* <SubMenu
				key="sub1"
				icon={<FundProjectionScreenOutlined />}
				title="Resources"
			>
				<Menu.Item key={keys['Slack_Channel']} icon={<SlackOutlined />}>
					Slack Channel
				</Menu.Item>
				
				<Menu.Item key={keys['Treehouse']} icon={<YoutubeOutlined />}>
					Treehouse
				</Menu.Item>
			</SubMenu>
			
			<Menu.Item key={keys['Projects']} icon={<RocketOutlined />}>
				Students Projects
			</Menu.Item> */}

		</Menu>
	)
}

export default StudentSiderMenu;