/** @format */

import React, { useContext } from "react";
import { PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { StyledHeadDiv } from "./styles.js";
import * as ROUTES from "../../../constants/routes";
import UserContext from "../../contexts/UserContext";

const Breadcrumbs = ({ page, match, keys, setSelectedKey }) => {
	const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);

	return (
		<PageHeader
			className="white-gray"
			style={{ backgroundColor: "#fff", margin: "15px" }}
			title={userInfo && userInfo.role ? `Welcome ${userInfo.role.charAt(0).toUpperCase() + userInfo.role.slice(1)}!` : null}
		>
			<Breadcrumb style={{ margin: "0" }}>
				<Breadcrumb.Item>
				{
					page === "Dashboard" ? (
						"Home"
					) : (
						<Link
							to={`${match.path}${ROUTES.DASHBOARD}`}
							onClick={() => setSelectedKey(keys[0])}
						>
							Home
						</Link>
					)
				}
				</Breadcrumb.Item>
				<Breadcrumb.Item>
					{page === "Dashboard" ? null : page}
				</Breadcrumb.Item>
			</Breadcrumb>
		</PageHeader>
	)
}

export default Breadcrumbs;
