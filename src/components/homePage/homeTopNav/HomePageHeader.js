/** @format */

import React, {useContext} from "react";
import { Layout, Row, Col, Dropdown, Menu } from "antd";
import { UserCircle } from "@styled-icons/boxicons-solid/UserCircle";
import { SettingOutlined, BellOutlined } from "@ant-design/icons";

import { HeaderPage, Logo, TopNav } from "../styles/styles";
import logo from "../../../graphics/logo.png";
import { useCookies } from 'react-cookie';
import UserContext from "../../contexts/UserContext";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const { Header } = Layout;

const HomePageHeader = ({match}) => {
	const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);
	const [authToken, setAuthToken] = useContext(UserContext);

	const logout = async () => {
		await removeCookie('auth_token');
		window.location.reload();

		// setAuthToken(null);
	  // history.push(`${ROUTES.LANDING}`);
	}
	
	const menu = (
		<Menu>
			<Menu.Item>
				<Link to={`${match.path}${ROUTES.PROFILE}`}>
					Account
				</Link>
			</Menu.Item>
			<Menu.Item>
				<a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
					Settings
				</a>
			</Menu.Item>
			<Menu.Item>
				<Link to="#" onClick={logout}>Logout</Link>
			</Menu.Item>	
		</Menu>
	);

	return (
		<HeaderPage>
			<Header
				className="site-layout-background"
				style={{
					padding: "0",
					backgroundColor: "white",
					width: "100%",
				}}
			>
				<Row type="flex">
					<Col span={12}>
						<Logo>
							<img
								src={logo}
								className="ctd-logo"
								alt="Code the Dream Logo"
							></img>
						</Logo>
					</Col>
					<Col span={12} align="right">
						<TopNav className="top-nav">
							<BellOutlined />
							<SettingOutlined />
							<Dropdown overlay={menu}>
								<a className="ant-dropdown-link" trigger={['click']} onClick={e => e.preventDefault()}>
									<UserCircle  style={{ width: "25px" }} />
								</a>
							</Dropdown>
						</TopNav>
					</Col>
				</Row>
			</Header>
		</HeaderPage>
	);
};

export default HomePageHeader;
